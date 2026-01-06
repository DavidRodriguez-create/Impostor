# Scripts de Optimización

## 🎨 auto-optimize-images.js

Script automático que estandariza nombres de avatares, detecta y optimiza imágenes que exceden el límite de caché de PWA (2MB).

### ¿Qué hace?

**Paso 1: Estandarización de nombres**
- Busca avatares en `public/avatars/` que no sigan el formato `avatar-N.ext`
- Los renombra automáticamente al siguiente número disponible
- Ejemplos:
  - `my-cool-avatar.png` → `avatar-13.png`
  - `player_icon.png` → `avatar-14.png`
  - `IMG_1234.jpg` → `avatar-15.jpg`

**Paso 2: Optimización de tamaño**
1. **Escanea** todas las imágenes en `public/` (PNG, JPG, JPEG, WebP)
2. **Detecta** imágenes que exceden 2MB (límite de PWA)
3. **Optimiza automáticamente**:
   - Redimensiona a máximo 512x512px
   - Convierte RGBA a RGB (menor tamaño)
   - Comprime con calidad 85%
   - Reduce tamaño típicamente en 80-85%

### Uso

```bash
# Verificar manualmente si hay imágenes grandes o nombres no estándar
npm run check:images

# Se ejecuta automáticamente antes de cada build
npm run build
```

### Características

- ✅ Renombra avatares automáticamente a formato estándar
- ✅ Ejecuta automáticamente en `prebuild`
- ✅ Crea backups antes de optimizar
- ✅ Muestra resumen de reducción de tamaño
- ✅ Compatible con Node.js 16+ (usa Python + PIL)
- ✅ Limpia archivos temporales automáticamente

### Formato Estándar de Avatares

**Formato esperado**: `avatar-{número}.{extensión}`
- ✅ `avatar-1.png`
- ✅ `avatar-2.jpg`
- ✅ `avatar-15.webp`
- ❌ `my-avatar.png` (será renombrado)
- ❌ `player.jpg` (será renombrado)

### Resultados Típicos

**Antes**: ~2.4 MB por avatar
**Después**: ~400 KB por avatar
**Reducción**: 80-85%

### Límite de PWA

Las PWAs tienen un límite de 2MB por archivo para el caché offline. Este script asegura que todas las imágenes cumplan este requisito.
