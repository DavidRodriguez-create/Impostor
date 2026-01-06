# 🎭 Impostor Game

A mobile-first social deduction game built as a PWA (Progressive Web App).

## 🌐 Live Demo

**▶️ Play now: [https://davidrodriguez-create.github.io/Impostor/](https://davidrodriguez-create.github.io/Impostor/)**

- 📱 Mobile-optimized
- 🌎 Available in 4 languages (ES/EN/FR/ZH)
- 📦 Installable as PWA

## 🎮 Features

- **Theme System**: 8 thematic categories with secret words (Places, Food, Animals, Objects, Activities, Professions, Colors & Shapes, Emotions)
- **Advanced Multilanguage**: Complete support for 4 languages (Español, English, Français, 中文) with real-time switching
- **Word Translation**: Shared key mapping system - game words translate automatically when changing language
- **Global Language Selector**: Change language on any screen, not just at the start
- **Game Setup**: Configure players (up to 100), impostor count (no limit, just < player count), and time with touch-optimized controls
- **Vertical Controls**: Native mobile-style vertical swipe pickers for number inputs
- **Role Assignment**: Each player secretly views their role with improved bidirectional swipe system
- **Timer**: Infinite mode or configurable time limit (1-60 minutes via swipe picker)
- **Gradual Revelation**: Discover impostors one by one
- **Validations**: Unique player names, impostor count must be less than player count
- **Cross-platform**: Works in web browser and as installable app (PWA)
- **Native Packaging**: Android/iOS support via Capacitor

## 🚀 Tech Stack

- **Vite 4.5** - Ultra-fast build tool
- **Vanilla JavaScript ES6** - No frameworks, maximum performance
- **Modular Architecture** - Separated into data/, utils/, screens/
- **Advanced i18n System** - Complete ES/EN/FR/ZH translation with word mapping via shared keys
- **Dynamic Translation** - Game words translate in real-time using keys (beach → Playa/Beach/Plage/海滩)
- **PWA** - Installable and works offline (vite-plugin-pwa)
- **Capacitor 5.5** - Native mobile packaging

## 📦 Installation

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 📱 Native Packaging

### Android

```bash
# Sync with Capacitor
npm run cap:sync

# Open in Android Studio
npm run cap:android

# Then from Android Studio, build and generate APK/AAB
```

### iOS

```bash
# Sync with Capacitor
npm run cap:sync

# Open in Xcode
npm run cap:ios

# Then from Xcode, build and generate IPA
```

## 🎯 How to Play

1. **Start**: Select language (ES/EN/FR/ZH) from dropdown - you can change language anytime!
2. **Themes**: Choose one or more word categories (minimum 1)
3. **Setup**: 
   - Add players with unique names (up to 100 players)
   - Use vertical swipe to configure impostor count (1 to 999, but must be < player count)
   - Configure time mode (Infinite or Timer with vertical swipe 1-60 minutes)
4. **Reveal**: Each player swipes up to see their role and secret word, can hide by swiping down
   - Words translate automatically if you change language during the game
5. **Game**: Start the timer (or infinite mode) and discuss to discover impostors
6. **Final Reveal**: Reveal impostors one by one when ready

## 🗂️ Project Structure

```
impostor/
├── public/
│   ├── avatars/          # Player avatars (11 variations)
│   ├── icon-192.png      # PWA icon 192x192
│   ├── icon-512.png      # PWA icon 512x512
│   └── favicon.ico       # Favicon
├── src/
│   ├── data/
│   │   ├── themes.js         # 8 bilingual thematic categories (ES/EN)
│   │   └── translations.js   # Complete translation system
│   ├── utils/
│   │   ├── languageManager.js  # Language switching management
│   │   ├── playerUtils.js      # Player utilities
│   │   ├── roleUtils.js        # Role assignment logic
│   │   └── timerUtils.js       # Timer utilities
│   ├── screens/
│   │   ├── startScreen.js    # Start screen with language selector
│   │   ├── themeScreen.js    # Theme selection (multi-select)
│   │   ├── setupScreen.js    # Setup with vertical swipe pickers
│   │   ├── revealScreen.js   # Bidirectional swipe reveal
│   │   └── gameScreen.js     # Game screen with timer
│   ├── game.js           # State management (GameState class)
│   ├── main.js           # Entry point & routing
│   └── styles.css        # Global styles (797+ lines)
├── index.html            # HTML with all screens
├── vite.config.js        # Vite + PWA configuration
├── capacitor.config.ts   # Capacitor configuration
└── package.json
```

## 🎨 Customization

### Add New Languages
1. Edit `src/data/translations.js` and add new language:
   ```javascript
   export const TRANSLATIONS = {
     es: { ... },
     en: { ... },
     fr: { /* new translations */ }
   };
   ```
2. Edit `src/data/themes.js` and add translated themes:
   ```javascript
   export const WORD_THEMES = {
     es: { ... },
     en: { ... },
     fr: { /* new themes */ }
   };
   ```
3. Add option in `index.html`:
   ```html
   <option value="fr">🌐 Français (FR)</option>
   ```

### Modify Themes and Words
- Edit `src/data/themes.js`
- Each category has 20 words per language
- Maintain structure `{ es: {...}, en: {...} }`

### Change Colors
- Edit CSS variables in `src/styles.css`:
  ```css
  :root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --danger-color: #d63031;
  }
  ```

### Add Avatars
- Add files to `public/avatars/` (avatar-12.png, avatar-13.png, etc.)
- Update count in `src/utils/playerUtils.js`

## 📄 License

MIT License - Free to use and modify

---

🎮 Made with ❤️ for game lovers
