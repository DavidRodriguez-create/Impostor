#!/usr/bin/env node
import { readdirSync, statSync, mkdirSync, existsSync, renameSync, rmSync, copyFileSync, writeFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// PWA max file size limit (2MB by default in workbox)
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const publicDir = join(__dirname, '../public');
const avatarsDir = join(publicDir, 'avatars');

function standardizeAvatarNames() {
  if (!existsSync(avatarsDir)) {
    return [];
  }
  
  const files = readdirSync(avatarsDir).filter(file => 
    ['.png', '.jpg', '.jpeg', '.webp'].includes(extname(file).toLowerCase())
  );
  
  const renamed = [];
  const avatarPattern = /^avatar-(\d+)\.(png|jpg|jpeg|webp)$/i;
  const usedNumbers = new Set();
  
  // First pass: collect already used numbers
  files.forEach(file => {
    const match = file.match(avatarPattern);
    if (match) {
      usedNumbers.add(parseInt(match[1]));
    }
  });
  
  // Second pass: rename non-standard files
  files.forEach(file => {
    const match = file.match(avatarPattern);
    if (!match) {
      // Find next available number
      let num = 1;
      while (usedNumbers.has(num)) {
        num++;
      }
      usedNumbers.add(num);
      
      const ext = extname(file);
      const oldPath = join(avatarsDir, file);
      const newName = `avatar-${num}${ext}`;
      const newPath = join(avatarsDir, newName);
      
      renameSync(oldPath, newPath);
      renamed.push({ old: file, new: newName });
    }
  });
  
  return renamed;
}

function getAllImages(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(extname(file).toLowerCase())) {
      fileList.push({
        path: filePath,
        size: stat.size,
        name: file
      });
    }
  });
  
  return fileList;
}

function checkForOversizedImages() {
  console.log('🔍 Scanning public/ directory for oversized images...\n');
  
  const images = getAllImages(publicDir);
  const oversized = images.filter(img => img.size > MAX_FILE_SIZE_BYTES);
  
  if (oversized.length === 0) {
    console.log('✅ All images are within size limits!\n');
    console.log(`📊 Summary:`);
    console.log(`   Total images: ${images.length}`);
    console.log(`   Max size limit: ${MAX_FILE_SIZE_MB} MB`);
    console.log(`   Largest image: ${(Math.max(...images.map(i => i.size)) / 1024 / 1024).toFixed(2)} MB\n`);
    return false;
  }
  
  console.log(`⚠️  Found ${oversized.length} oversized images:\n`);
  oversized.forEach(img => {
    const sizeMB = (img.size / 1024 / 1024).toFixed(2);
    console.log(`   ❌ ${img.name}: ${sizeMB} MB (exceeds ${MAX_FILE_SIZE_MB} MB)`);
  });
  
  return oversized;
}

function optimizeImages(oversizedImages) {
  console.log('\n🎨 Starting automatic optimization...\n');
  
  try {
    // Check if Python is available
    try {
      execSync('python --version', { stdio: 'ignore' });
    } catch {
      console.error('❌ Python not found. Please install Python to use image optimization.');
      process.exit(1);
    }
    
    // Create temporary backup directory
    const backupDir = join(__dirname, '../.image-backup');
    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true });
    }
    
    // Backup oversized images
    console.log('💾 Creating backups...');
    oversizedImages.forEach(img => {
      const backupPath = join(backupDir, img.name);
      copyFileSync(img.path, backupPath);
    });
    
    // Run Python optimization script
    console.log('🔧 Running optimization...\n');
    const pythonScript = join(__dirname, 'optimize-images-inline.py');
    
    // Create inline Python script
    const scriptContent = `#!/usr/bin/env python3
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    os.system("pip install Pillow --quiet")
    from PIL import Image

def optimize_image(img_path):
    print(f"  Optimizing {Path(img_path).name}...")
    
    original_size = os.path.getsize(img_path)
    
    with Image.open(img_path) as img:
        # Convert RGBA to RGB if needed
        if img.mode == 'RGBA':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        
        # Resize if too large (512x512 is good for avatars/icons)
        max_size = 512
        if img.size[0] > max_size or img.size[1] > max_size:
            img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        
        # Save optimized
        img.save(img_path, 'PNG', optimize=True, quality=85)
    
    new_size = os.path.getsize(img_path)
    reduction = ((original_size - new_size) / original_size) * 100
    
    print(f"    {original_size / 1024 / 1024:.2f} MB → {new_size / 1024:.2f} KB ({reduction:.1f}% smaller)")
    return new_size

# Get image paths from command line arguments
image_paths = sys.argv[1:]

for img_path in image_paths:
    if os.path.exists(img_path):
        optimize_image(img_path)
`;
    
    // Write temporary Python script
    writeFileSync(pythonScript, scriptContent);
    
    // Run optimization for each image
    const imagePaths = oversizedImages.map(img => img.path).join(' ');
    execSync(`python "${pythonScript}" ${imagePaths}`, { stdio: 'inherit' });
    
    // Clean up temporary script
    rmSync(pythonScript);
    
    // Verify optimization
    console.log('\n✅ Optimization complete!\n');
    
    const results = oversizedImages.map(img => {
      const newSize = statSync(img.path).size;
      const oldSizeMB = (img.size / 1024 / 1024).toFixed(2);
      const newSizeMB = (newSize / 1024 / 1024).toFixed(2);
      const reduction = ((img.size - newSize) / img.size * 100).toFixed(1);
      
      return {
        name: img.name,
        oldSize: oldSizeMB,
        newSize: newSizeMB,
        reduction,
        success: newSize < MAX_FILE_SIZE_BYTES
      };
    });
    
    console.log('📊 Results:');
    results.forEach(r => {
      const status = r.success ? '✅' : '⚠️';
      console.log(`   ${status} ${r.name}: ${r.oldSize} MB → ${r.newSize} MB (-${r.reduction}%)`);
    });
    
    const allSuccess = results.every(r => r.success);
    
    if (allSuccess) {
      console.log('\n✨ All images now meet PWA caching requirements!');
      // Clean up backup
      rmSync(backupDir, { recursive: true, force: true });
    } else {
      console.log('\n⚠️  Some images still exceed limit. Manual optimization may be needed.');
      console.log(`   Backups saved in: ${backupDir}`);
    }
    
    return allSuccess;
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

// Main execution
console.log('🔧 Step 1: Standardizing avatar names...\n');
const renamed = standardizeAvatarNames();

if (renamed.length > 0) {
  console.log(`📝 Renamed ${renamed.length} file(s) to standard format:\n`);
  renamed.forEach(r => {
    console.log(`   ${r.old} → ${r.new}`);
  });
  console.log('');
} else {
  console.log('✅ All avatar names follow standard format (avatar-N.ext)\n');
}

console.log('🔧 Step 2: Checking image sizes...\n');
const oversized = checkForOversizedImages();

if (oversized && oversized.length > 0) {
  console.log('\n❓ Automatically optimize these images? (y/n)');
  
  // For automated scripts, auto-proceed
  if (process.env.CI || process.argv.includes('--auto')) {
    console.log('   Running in automated mode...');
    optimizeImages(oversized);
  } else {
    // In interactive mode, would need user input
    // For now, auto-run
    optimizeImages(oversized);
  }
} else {
  process.exit(0);
}
