# 🎭 Impostor Game - Implementation Complete

## 🌐 Live Demo

**▶️ [https://davidrodriguez-create.github.io/Impostor/](https://davidrodriguez-create.github.io/Impostor/)**

✅ Deployed on GitHub Pages with automatic CI/CD

---

## ✅ What's Been Built

A fully functional **Impostor Game** PWA with advanced mobile-first features:

### 🎮 Game Features
- **Start Screen**: Language selector dropdown (ES/EN/FR/ZH) with real-time switching
- **Global Language Selector**: Dropdown available on all 5 screens, change language anytime during gameplay
- **Theme Selection**: 8 word categories with multi-select capability
  - Lugares/Places/Lieux/地点, Comida/Food/Nourriture/食物, Animales/Animals/Animaux/动物, Objetos/Objects/Objets/物品
  - Actividades/Activities/Activités/活动, Profesiones/Professions/Professions/职业, Colores & Formas/Colors & Shapes/Couleurs et Formes/颜色和形状, Emociones/Emotions/Émotions/情绪
  - 20 words per category per language (640 total words across 4 languages)
- **Word Mapping System**: Words use shared keys (beach, dog, red, etc.) for cross-language translation
  - Enables real-time word translation when switching languages during reveal phase
- **Setup Screen**: 
  - Add/remove players (3-100) with unique name validation
  - Random avatar assignment (11 variations)
  - Vertical swipe picker for impostor count (no max limit, only < player count)
  - Timer mode toggle (Infinite/Timed)
  - Vertical swipe picker for minutes (1-60)
  - Enhanced input box styling with hover/focus states
- **Role Reveal**: 
  - Bidirectional swipe mechanic (up to reveal, down to hide) with fixed tracking
  - Smooth position tracking without reference drift
  - Snap points at 150px threshold
  - Role-specific content (IMPOSTOR badge or secret word)
  - Words translate automatically when language changes during reveal
- **Game Timer**: 
  - Countdown display or infinite mode
  - Sequential impostor revelation system
  - Play again and back to start options
- **Internationalization**: 
  - Complete UI translation system (ES/EN/FR/ZH)
  - Word mapping system with shared keys for cross-language translation
  - Global language selector on all screens (not just start)
  - localStorage persistence for language preference
  - Real-time UI and word updates on language change
  - Easily extensible - just add new language object with same keys

### 📱 Platform Support
- ✅ **Web Browser**: Works on any modern browser
- ✅ **PWA**: Installable on mobile/desktop
- ✅ **Native Apps**: Ready for Android/iOS packaging via Capacitor

### 🏗️ Technical Stack
- **Vite 4.5**: Lightning-fast build tool and dev server
- **Vanilla JavaScript ES6**: Module-based architecture, no framework overhead
- **Modular Architecture**: Separated concerns (data/, utils/, screens/)
- **PWA Plugin (vite-plugin-pwa 0.16)**: Service worker, offline support, manifest
- **Capacitor 5.5**: Native mobile packaging for Android/iOS
- **i18n System**: Custom translation system with localStorage persistence
- **Mobile-First CSS**: Touch-optimized controls, vertical scroll only, responsive design
- **Custom Swipe Gestures**: Native-like vertical number pickers and bidirectional reveal

## 📂 Project Structure

```
impostor/
├── .github/
│   └── copilot-instructions.md    # AI agent guidance (COMPLETE)
├── public/
│   ├── avatars/                   # Player avatars (11 PNG files)
│   ├── icon-192.png               # PWA icon 192x192
│   ├── icon-512.png               # PWA icon 512x512
│   └── favicon.ico                # Browser icon
├── src/
│   ├── data/
│   │   ├── themes.js              # 8 bilingual word categories (649 lines)
│   │   └── translations.js        # Complete UI translations (ES/EN)
│   ├── utils/
│   │   ├── languageManager.js     # Language switching & UI updates
│   │   ├── playerUtils.js         # Player creation & avatar assignment
│   │   ├── roleUtils.js           # Role assignment logic
│   │   └── timerUtils.js          # Timer formatting utilities
│   ├── screens/
│   │   ├── startScreen.js         # Welcome + language selector
│   │   ├── themeScreen.js         # Multi-select word categories
│   │   ├── setupScreen.js         # Player config + swipe pickers (223 lines)
│   │   ├── revealScreen.js        # Bidirectional swipe reveal (161 lines)
│   │   └── gameScreen.js          # Timer display + impostor reveals
│   ├── game.js                    # GameState class (state management)
│   ├── main.js                    # Entry point & screen routing
│   └── styles.css                 # Global styles (830+ lines)
├── index.html                     # Single-page HTML (156 lines, 5 screens)
├── vite.config.js                 # Vite + PWA configuration
├── capacitor.config.ts            # Native app configuration
├── package.json                   # Dependencies & scripts
├── README.md                      # Project overview
├── QUICKSTART.md                  # Development guide
├── IMPLEMENTATION.md              # This file
└── .gitignore                     # Git ignore rules
```

## 🚀 Current Status

**✨ Development Ready**: Start with `npm run dev`

### Fully Implemented Features:
1. ✅ Five-screen game flow (Start → Theme → Setup → Reveal → Game)
2. ✅ Complete internationalization system (ES/EN/FR/ZH with extensible architecture)
3. ✅ Word mapping system with shared keys for cross-language translation
4. ✅ Global language selector on all 5 screens (change anytime during gameplay)
5. ✅ 8 themed word categories with 640 total words (20 per category × 8 categories × 4 languages)
6. ✅ Multi-select theme system (minimum 1 required)
7. ✅ Vertical swipe pickers for number inputs (native mobile feel)
8. ✅ Bidirectional swipe reveal with fixed tracking (no reference drift)
9. ✅ Real-time word translation when changing language in reveal screen
10. ✅ Unique player name validation (case-insensitive)
11. ✅ Flexible impostor count (no max, just < player count)
12. ✅ Timer logic with infinite and timed modes
13. ✅ Sequential impostor revelation system
14. ✅ PWA manifest with offline capability
15. ✅ Capacitor setup for native mobile apps
16. ✅ Responsive mobile-first design with vertical-only scroll
17. ✅ Avatar system with 11 variations
18. ✅ Enhanced UI with hover/focus states
19. ✅ localStorage language persistence

## 🎯 How to Test

### In Browser (Desktop):
1. Run: `npm run dev`
2. Open: http://localhost:5173/
3. **Test language switching**: Change dropdown, verify UI updates
4. **Select themes**: Pick multiple categories (minimum 1)
5. **Add players**: Test unique name validation (3-10 players)
6. **Test swipe pickers**: Use mouse to drag vertically on number selectors
7. **Configure game**: Set impostor count and timer mode
8. **Role reveal**: Click and drag up/down on reveal card
9. **Play game**: Test timer countdown and impostor reveals
10. **Navigation**: Test back buttons and play again

### On Mobile Device:
1. Get computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On phone browser: `http://YOUR_IP:5173/`
3. **Test touch gestures**: 
   - Vertical swipe on number pickers
   - Bidirectional swipe on role reveal
   - Theme multi-select buttons
4. **Test responsiveness**: Portrait and landscape orientations
5. **Install as PWA**: Chrome menu → "Install App"
6. **Test offline**: Turn off WiFi, verify app still works

### Production Build:
```bash
npm run build       # Creates dist/ folder
npm run preview     # Test production build at http://localhost:4173/
```

## 📦 Deployment Options

### 1. GitHub Pages (✅ CURRENT)

**Already deployed at**: https://davidrodriguez-create.github.io/Impostor/

**Automatic CI/CD:**
- Workflow: `.github/workflows/deploy.yml`
- Trigger: Push to `main` branch
- Build: `npm install && npm run build`
- Deploy: `gh-pages` branch
- Time: ~1-2 minutes

**To update:**
```bash
git add .
git commit -m "Update app"
git push origin main
# GitHub Actions does the rest automatically
```

### 2. Other Web Hosting Services
- Upload `dist/` folder to:
  - Vercel (recommended)
  - Netlify
  - GitHub Pages
  - Firebase Hosting

### 2. Native Apps
```bash
# Build web first
npm run build

# Sync with native projects
npm run cap:sync

# Open in platform IDE
npm run cap:android   # Android Studio
npm run cap:ios       # Xcode (macOS only)
```

## 🎨 Customization Guide

### Add New Languages
1. **Update translations** (`src/data/translations.js`):
   ```javascript
   export const TRANSLATIONS = {
     es: { /* existing */ },
     en: { /* existing */ },
     pt: { gameTitle: "Impostor", /* ... */ }
   };
   ```

2. **Update word themes** (`src/data/themes.js`):
   ```javascript
   export const WORD_THEMES = {
     es: { /* existing */ },
     en: { /* existing */ },
     pt: { locations: { name: "Lugares", words: [...] }, /* ... */ }
   };
   ```

3. **Add dropdown option** (`index.html`):
   ```html
   <select id="language-select">
     <option value="es">🌐 Español (ES)</option>
     <option value="en">🌐 English (EN)</option>
     <option value="pt">🌐 Português (PT)</option>
   </select>
   ```

### Add More Word Themes
Edit `src/data/themes.js`, add new category to ALL languages using **SAME keys**:
```javascript
export const WORD_THEMES = {
  es: {
    // ... existing categories
    movies: {
      name: "🎬 Películas",
      words: {
        matrix: "Matrix",
        avatar: "Avatar",
        titanic: "Titanic",
        /* ... 17 more with unique keys, 20 total */
      }
    }
  },
  en: {
    // ... existing categories
    movies: {
      name: "🎬 Movies",
      words: {
        matrix: "Matrix",  // SAME key as Spanish
        avatar: "Avatar",
        titanic: "Titanic",
        /* ... 17 more with SAME keys as Spanish */
      }
    }
  },
  fr: {
    // ... existing categories
    movies: {
      name: "🎬 Films",
      words: {
        matrix: "Matrix",  // SAME key for translation
        avatar: "Avatar",
        titanic: "Titanic",
        /* ... 17 more with SAME keys */
      }
    }
  },
  zh: {
    // ... existing categories
    movies: {
      name: "🎬 电影",
      words: {
        matrix: "黑客帝国",  // SAME key, Chinese translation
        avatar: "阿凡达",
        titanic: "泰坦尼克号",
        /* ... 17 more with SAME keys */
      }
    }
  }
};
```

### Change Colors & Styling
Edit `src/styles.css`:
```css
:root {
  --primary-color: #6c5ce7;      /* Main theme */
  --secondary-color: #a29bfe;    /* Secondary elements */
  --danger-color: #d63031;       /* Impostor badge */
  --success-color: #00b894;      /* Success states */
  --bg-dark: #0f0f1a;            /* Dark background */
  --bg-light: #1a1a2e;           /* Light background */
  --text-primary: #ffffff;       /* Primary text */
  --text-muted: #999;            /* Muted text */
}
```

### Modify Game Rules
Edit `src/game.js` `GameState` class:
```javascript
constructor() {
  this.maxPlayers = 100;  // Change max player limit (currently 100)
  // ... modify other defaults
}

// Adjust impostor validation in setupScreen.js
// Current: impostorCount < players.length
// Impostor picker allows 1-999 but validation enforces < player count
```

### Add More Avatars
1. Add images to `public/avatars/` (avatar-12.png, avatar-13.png, etc.)
2. Update `src/utils/playerUtils.js`:
   ```javascript
   const avatarId = Math.floor(Math.random() * 20) + 1; // Change 11 to 20
   ```

## 🔧 Key Implementation Details

### Vertical Swipe Pickers (`setupScreen.js`)
- Custom touch/mouse event handlers
- 20px vertical movement sensitivity
- Smooth dragging with `transition: none` during interaction
- Number constraints enforced (impostor: 1-999, timer: 1-60)
- Visual feedback with `:active` state

### Bidirectional Role Reveal (`revealScreen.js`)
- State tracking with `currentTranslateY` variable
- Clamps movement between 0-300px
- Snap points: 150px (reveal threshold), 50px (hide threshold)
- Smooth transitions on release
- Prevents over-scrolling beyond boundaries

### Language System
- `translations.js`: Dictionary with nested keys
- `languageManager.js`: Updates all `[data-i18n]` elements
- Custom event `language-changed` for dynamic content updates
- localStorage persistence: `localStorage.getItem('gameLanguage')`
- Dropdown selector initializes on page load

### Theme Selection (`themeScreen.js`)
- Multi-select button toggles with active state
- Minimum 1 theme required to proceed
- Re-renders on language change
- Random word selection from selected themes

### Player Management (`setupScreen.js`)
- Unique name validation (case-insensitive)
- Maximum 10 players (configurable in `game.js`)
- Random avatar assignment on creation
- Remove functionality with confirmation

### Timer System (`gameScreen.js`)
- Two modes: infinite (∞) or countdown
- `setInterval` for 1-second updates
- Automatic button enable when timer ends
- Format: MM:SS display

### State Management (`game.js`)
- Single `GameState` class instance
- Centralized player array, roles, timer state
- Methods: `addPlayer()`, `assignRoles()`, `startGameTimer()`
- Exported for cross-module access

### Styling Approach
- CSS variables for consistent theming
- Mobile-first responsive design
- `overflow-x: hidden` on player list (vertical scroll only)
- Touch-optimized button sizes (48px minimum)
- Hover states for desktop compatibility

## 🚀 Deployment

### GitHub Pages (⚡ CURRENT)

**Already deployed at**: https://davidrodriguez-create.github.io/Impostor/

**Automatic CI/CD:**
- Workflow: `.github/workflows/deploy.yml`
- Trigger: Push to `main` branch
- Build: `npm install && npm run build`
- Deploy: `gh-pages` branch
- Time: ~1-2 minutes

**To update:**
```bash
git add .
git commit -m "Update app"
git push origin main
# GitHub Actions does the rest automatically
```

**Current configuration:**
- `vite.config.js`: `base: './'` (relative paths)
- `index.html`: All assets use relative paths (`./src/main.js`)
- Settings → Pages → Source: `gh-pages` branch

### Other Services

**Vercel/Netlify:**
```bash
npm run build
# Upload dist/ folder or connect GitHub repo
```

**Static hosting (Apache/Nginx):**
- Upload `dist/` content to server
- Configure HTTPS for PWA to work

## 💡 Future Enhancement Ideas

1. **Game Features**
   - ✅ ~~Multiple word categories~~ (DONE: 8 themes)
   - ✅ ~~Internationalization~~ (DONE: 4 languages - ES/EN/FR/ZH)
   - ✅ ~~GitHub Pages deployment~~ (DONE: Auto CI/CD)
   - Voting system for impostor elimination
   - Player statistics/history with localStorage
   - Sound effects and haptic feedback
   - Animation polish (entrance/exit transitions)
   - Game modes (speed round, blind mode, etc.)
   - Custom word list creation

2. **Technical Improvements**
   - Save game state to localStorage (resume games)
   - Add more languages (French, German, Portuguese, etc.)
   - Analytics integration (game sessions, popular themes)
   - Dark/light theme toggle
   - Accessibility improvements (screen reader support, high contrast mode)
   - Performance optimization (code splitting, lazy loading)
   - Progressive enhancement (fallbacks for older browsers)

3. **Social & Multiplayer**
   - Share game results (screenshot, social media)
   - QR code for quick join (host-client model)
   - Online real-time multiplayer with WebRTC
   - Leaderboards and achievements
   - Friend system and game history
   - Video/audio chat integration

4. **Mobile Native Features**
   - Push notifications for game invites
   - Vibration API for feedback
   - Screen wake lock during game
   - Splash screens for native apps
   - App icons and branding
   - Deep linking for game sharing

## 🐛 Known Limitations

1. **Node.js Version**: Requires Node 16+ (tested with v16.15.1 ✅)
2. **No Game Persistence**: Games don't save between sessions (can add localStorage)
3. **Limited Avatars**: Only 11 variations (easily expandable)
4. **No Online Play**: Currently local/pass-and-play only
5. **Basic Error Handling**: Some edge cases may not have user-friendly messages

## 📚 Documentation

- **README.md**: Complete project overview, installation, and customization guide
- **QUICKSTART.md**: Development workflow, testing checklist, troubleshooting
- **IMPLEMENTATION.md**: This file - detailed implementation reference
- **.github/copilot-instructions.md**: AI agent context and development patterns
- **Inline Code Comments**: Documentation in all modules explaining complex logic

## 🎉 Next Steps

### Immediate Actions:
1. ✅ **Feature Complete**: All core functionality implemented
2. 🧪 **Test Thoroughly**: Run through all game scenarios on desktop and mobile
3. 🎨 **Polish UI**: Fine-tune animations, spacing, and visual feedback (mostly done)
4. 📱 **Real Device Testing**: Test on actual iOS/Android devices
5. 🌍 **Add More Languages**: Extend ES/EN to other languages if needed

### Deployment:
1. **Web Deployment**:
   ```bash
   npm run build
   # Upload dist/ to Vercel, Netlify, or GitHub Pages
   ```

2. **Native App Publishing**:
   ```bash
   npm run build
   npm run cap:sync
   npm run cap:android  # For Play Store
   npm run cap:ios      # For App Store (requires macOS)
   ```

### Future Iterations:
- Gather user feedback
- Add social features (voting, online play)
- Implement game history and statistics
- Add sound effects and haptics
- Create marketing materials and app store listings

---

**The Impostor Game is production-ready!** 🚀

✨ **Highlights:**
- 5-screen polished game flow
- Full internationalization (ES/EN/FR/ZH)
- 8 themed word categories (640 words across 4 languages)
- Mobile-first with native-feeling gestures
- PWA-ready with offline support
- Capacitor-ready for iOS/Android

You can now:
- ✅ Play in browser (desktop/mobile)
- ✅ Install as PWA
- ✅ Package as native app
- ✅ Deploy to web hosting
- ✅ Customize and extend
- ✅ Add more languages easily

Enjoy your Impostor Game! 🎭
