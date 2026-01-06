# 🎭 Impostor Game

A mobile-first social deduction game built as a PWA (Progressive Web App).

## 🌐 Live Demo

**▶️ Play now: [https://davidrodriguez-create.github.io/Impostor/](https://davidrodriguez-create.github.io/Impostor/)**

- 📱 Mobile-optimized
- 🌎 Available in 4 languages (ES/EN/FR/ZH)
- 📦 Installable as PWA

## 🎮 Features

- **Theme System**: 8 thematic categories with secret words (Places, Food, Animals, Objects, Activities, Professions, Colors, Emotions)
- **Advanced Multilanguage**: Complete support for 4 languages (Español, English, Français, 中文) with real-time switching
- **Word Translation**: Shared key mapping system - game words translate automatically when changing language
- **Global Language Selector**: Change language on any screen, not just at the start
- **Voting System**: Players can vote for suspected impostors during gameplay
  - Vote for up to the number of impostors
  - See results: ✓ Correct (green) or ✗ Wrong (red)
  - Players already voted or revealed cannot be voted again
  - Multiple voting rounds allowed
- **Game Setup**: Configure players (up to 100), impostor count (no limit, just < player count), and time with touch-optimized controls
- **Vertical Controls**: Native mobile-style vertical swipe pickers for number inputs
- **Role Assignment**: Each player secretly views their role with improved bidirectional swipe system
- **Timer**: Infinite mode or configurable time limit (1-60 minutes via swipe picker)
- **Gradual Revelation**: Discover impostors one by one with button or through voting
- **Dynamic Messages**: Game state changes reflected in UI (Game Started → Game Continues → Game Over)
- **Mocking Reveals**: Button-revealed impostors show special message "😈 You didn't find me!" with purple styling
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
   - **Vote**: Click "Vote for Impostors" to select suspected players (up to impostor count)
   - See results: ✓ Correct guess (green) or ✗ Wrong guess (red)
   - Vote multiple times until all impostors are found
   - **Reveal Button**: Manually reveal remaining impostors (shows mocking message 😈)
6. **Game Over**: All impostors revealed - play again or return to setup

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
│   │   ├── themes.js         # 8 word categories with 4-language mapping (ES/EN/FR/ZH)
│   │   └── translations.js   # Complete UI translation system (4 languages)
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
│   │   └── gameScreen.js     # Game screen with timer and voting system
│   ├── game.js           # State management (GameState class with voting logic)
│   ├── main.js           # Entry point & routing
│   └── styles.css        # Global styles (1000+ lines)
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
     fr: { ... },
     zh: { ... },
     it: { /* new translations */ }
   };
   ```
2. Edit `src/data/themes.js` and add translated themes using **SAME keys**:
   ```javascript
   export const WORD_THEMES = {
     es: { places: { words: { beach: "Playa", ... } } },
     en: { places: { words: { beach: "Beach", ... } } },
     it: { places: { words: { beach: "Spiaggia", ... } } }
   };
   ```
3. Add option in `index.html` (5 language dropdowns):
   ```html
   <option value="it">🌐 Italiano (IT)</option>
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
- Add PNG files to `public/avatars/` with any name
- Run `npm run check:images` to automatically:
  - Rename files to standard format (`avatar-N.png`)
  - Optimize oversized images (> 2MB) for PWA caching
  - Reorder avatars sequentially (1, 2, 3... N)
- Avatar count is **detected automatically** - no code changes needed!
- ⚠️ **Important**: Always run `npm run check:images` after adding/removing avatars

## 📄 License

MIT License - Free to use and modify

---

🎮 Made with ❤️ for game lovers
