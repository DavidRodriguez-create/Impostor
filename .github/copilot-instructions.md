# AI Coding Agent Instructions

Welcome to the **Impostor Game** project! This is a mobile-first social deduction game built as a PWA (Progressive Web App) using Vite + Vanilla JavaScript with complete internationalization support.

## 🎯 Project Overview

A mobile-optimized game where players receive secret roles (regular player or impostor) based on themed word categories. Players must discover the impostors among them through social deduction.

**Tech Stack:**
- Vite 4.5 (build tool)
- Vanilla JavaScript ES6 (modular architecture, no frameworks)
- PWA (offline-capable, installable via vite-plugin-pwa)
- Capacitor 5.5 (for native Android/iOS packaging)
- Custom i18n system with word mapping (Spanish/English/French/Chinese, easily extensible)

## 🏗️ Architecture

### Core Components

1. **State Management** (`src/game.js`)
   - `GameState` class manages all game state
   - Handles player management, role assignment, timer logic
   - Central source of truth for game flow
   - Exported singleton instance

2. **Data Layer** (`src/data/`)
   - `themes.js` - 8 word categories with cross-language mapping system
     - Structure: `WORD_THEMES = { es: {...}, en: {...}, fr: {...}, zh: {...} }`
     - **Key-based mapping**: Words use shared keys (e.g., `beach`, `dog`, `red`) across all languages
     - Categories: Lugares/Places/Lieux/地点, Comida/Food/Nourriture/食物, Animales/Animals/Animaux/动物, Objetos/Objects/Objets/物品, Actividades/Activities/Activités/活动, Profesiones/Professions/Professions/职业, Colores/Colors/Couleurs/颜色, Emociones/Emotions/Émotions/情绪
     - 20 words per category per language (640 total words across 4 languages)
     - Functions: `selectRandomWord()` returns `{themeKey, wordKey, word}`, `getTranslatedWord(themeKey, wordKey)` fetches word in current language
   - `translations.js` - Complete UI translation system
     - Structure: `TRANSLATIONS = { es: {...}, en: {...}, fr: {...}, zh: {...} }`
     - Covers all screens, buttons, alerts, placeholders for 4 languages

3. **Utilities** (`src/utils/`)
   - `languageManager.js` - Language switching on all screens, UI updates, localStorage persistence
     - Manages multiple `.language-dropdown` selectors across all 5 screens
     - Syncs all dropdowns when language changes
   - `playerUtils.js` - Player creation and avatar assignment
   - `roleUtils.js` - Role assignment logic (impostors vs players)
   - `timerUtils.js` - Timer formatting utilities

4. **Screen System** (`src/screens/`)
   - `startScreen.js` - Welcome screen with language dropdown selector
   - `themeScreen.js` - Multi-select word theme categories (minimum 1 required) with global language selector
   - `setupScreen.js` (223 lines) - Player configuration with vertical swipe pickers and global language selector
   - `revealScreen.js` (208 lines) - Bidirectional swipe reveal mechanic with fixed tracking, global language selector, real-time word translation
   - `gameScreen.js` - Timer display, impostor reveal logic, and global language selector
   - Navigation via custom events and `showScreen()` function in `main.js`
   - **Global Language Access**: All screens (except start) have language dropdown in top-right corner

5. **UI/UX**
   - Mobile-first responsive design (797+ lines of CSS)
   - Custom vertical swipe pickers for number inputs (native mobile feel)
   - Bidirectional swipe gesture for role reveal
   - CSS variables for consistent theming
   - Touch-optimized button sizes (48px minimum)
   - Vertical scroll only (no horizontal scroll)

### Game Flow

```
Start (Language Selection) → Theme Selection → Setup → Role Assignment → 
Individual Reveals → Timer/Game → Reveal Impostors → End
```

## 🎮 Game Rules (Embedded Logic)

- **Players**: 3-100 (configurable max in `game.js`, currently set to 100)
- **Impostors**: 1-999 (picker range), but must be < total player count (validation)
- **Themes**: 8 categories, must select ≥1 before proceeding
- **Player Names**: Must be unique (case-insensitive validation)
- **Timer**: Infinite or timed (1-60 minutes via swipe picker)
- **Role Reveal**: Bidirectional swipe (up = reveal, down = hide) with fixed position tracking
- **Secret Words**: Random selection from chosen themes using key-based system, assigned to non-impostors
- **Word Translation**: Words translate automatically when language changes (uses shared keys: beach → Playa/Beach/Plage/海滩)
- **Impostor Discovery**: Sequential reveal after timer expires (or immediately if infinite mode)
- **Language**: ES/EN/FR/ZH with real-time switching on ANY screen, localStorage persistence

## 💻 Development Workflows

### Run Development Server
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview  # Preview build locally
```

### Native App Packaging (Capacitor)
```bash
npm run cap:sync      # Sync web build to native projects
npm run cap:android   # Open Android Studio
npm run cap:ios       # Open Xcode
```

## 📁 Key Files & Directories

- `index.html` - Single-page HTML with 5 screens (156 lines)
- `src/main.js` - Entry point, screen navigation, language initialization
- `src/game.js` - Game state class with exported singleton
  - Stores `gameWordKey` (not index) for word translation
  - `getCurrentWord()` uses `getTranslatedWord(themeKey, wordKey)` to get word in current language
- `src/data/themes.js` - Word themes with key-based mapping (640 total words)
  - **Key System**: `words: { beach: "Playa", dog: "Perro", ... }` (objects, not arrays)
  - Functions: `selectRandomWord(themeKeys)` returns `{themeKey, wordKey, word}`
  - `getTranslatedWord(themeKey, wordKey)` returns word in current language
- `src/data/translations.js` - Complete UI translation dictionary for 4 languages
- `src/utils/languageManager.js` - Language switching with localStorage
- `src/utils/playerUtils.js` - Player creation with random avatars
- `src/utils/roleUtils.js` - Role assignment algorithm
- `src/utils/timerUtils.js` - Timer formatting (MM:SS)
- `src/screens/startScreen.js` - Language selector initialization
- `src/screens/themeScreen.js` - Multi-select theme UI with dynamic rendering
- `src/screens/setupScreen.js` - Vertical swipe pickers, player management, validation
- `src/screens/revealScreen.js` - Bidirectional swipe with position tracking
- `src/screens/gameScreen.js` - Timer countdown, impostor revelation
- `src/styles.css` - Global styles with CSS variables (830+ lines)
- `public/avatars/` - Player avatar images (11 variations: avatar-1.png to avatar-11.png)
- `vite.config.js` - Vite + PWA plugin configuration
- `capacitor.config.ts` - Native app configuration

## 🔧 Conventions & Patterns

### State Management
- Single `GameState` instance exported from `game.js`
- Import and modify directly: `import { gameState } from './game.js'`
- All game logic methods are in the class (e.g., `addPlayer()`, `assignRoles()`)

### Screen Navigation
- Use `showScreen(screenId)` to switch screens
- Custom events for cross-screen communication:
  - `game-start` - Triggers when setup completes
  - `reveal-complete` - Triggers when all players see roles
  - `language-changed` - Triggers when language changes (updates dynamic content)

### Internationalization
- Translation function: `t(key, replacements)` from `src/data/translations.js`
- Static text: Use `data-i18n="key"` attributes in HTML
- Dynamic content: Use `t('key')` in JavaScript
- Language persistence: localStorage with key `'gameLanguage'`
- **Word Translation**: Uses `getTranslatedWord(themeKey, wordKey)` with shared keys across languages
- **Global Language Selector**: Available on all 5 screens via `.language-dropdown.language-select-global`
- Add new languages by extending `TRANSLATIONS` and `WORD_THEMES` objects with same keys

### Event Handling
- Touch + mouse events for swipe controls (supports desktop testing)
- Event delegation for dynamic elements (player list, theme buttons)
- Vertical swipe pickers: 20px sensitivity, clamps to valid ranges
- Bidirectional reveal: Tracks `currentTranslateY`, snaps at 150px threshold
  - Fixed tracking: `touchStartY` remains constant during drag, no reference drift
  - Smooth position calculation without updating start position mid-drag

### Styling
- CSS variables in `:root` for colors/theming
- Mobile-first with responsive breakpoints
- Landscape mode adjustments for small heights
- Vertical scroll only: `overflow-x: hidden` on scrollable containers
- Touch-optimized: 48px minimum button size, large tap targets

### Validation
- Player names: Unique (case-insensitive), max 20 characters
- Impostor count: ≥1 and < player count (no upper limit)
- Theme selection: At least 1 theme required
- Player count: 3-100 players required to start game

## 🎨 Asset Management

### Avatars
- Located in `public/avatars/avatar-{1-11}.png`
- PNG format for compatibility
- Randomly assigned during `addPlayer()` in `playerUtils.js`
- Change images by replacing files (keep naming convention)

### Icons
- `public/icon-192.png` - PWA icon (192x192)
- `public/icon-512.png` - PWA icon (512x512)
- `public/favicon.ico` - Browser favicon

## 🚀 Adding Features

### Adding a New Language
1. Extend `TRANSLATIONS` in `src/data/translations.js`:
   ```javascript
   export const TRANSLATIONS = {
     es: { /* existing */ },
     en: { /* existing */ },
     fr: { /* existing */ },
     zh: { /* existing */ },
     it: { gameTitle: "🎭 Impostore", /* add all UI keys */ }
   };
   ```

2. Extend `WORD_THEMES` in `src/data/themes.js` using **SAME keys** as existing languages:
   ```javascript
   export const WORD_THEMES = {
     es: { /* existing */ },
     en: { /* existing */ },
     fr: { /* existing */ },
     zh: { /* existing */ },
     it: { 
       places: { 
         name: "🏖️ Luoghi", 
         words: { 
           beach: "Spiaggia",  // Use SAME key as other languages
           mountain: "Montagna",
           /* ... same keys with Italian translations */
         } 
       },
       /* add all 8 categories with same word keys */
     }
   };
   ```

3. Add option to all 5 language dropdowns in `index.html`:
   ```html
   <option value="it">🌐 Italiano (IT)</option>
   ```

3. Add option to language dropdown in `index.html`:
   ```html
   <option value="fr">🌐 Français (FR)</option>
   ```

### Adding a New Word Theme
1. Edit `src/data/themes.js`
2. Add category to each language with 20 words using key-based structure:
   ```javascript
   movies: {
     name: "Películas", // or "Movies" for EN, "Films" for FR, "电影" for ZH
     words: {
       matrix: "Matrix",
       avatar: "Avatar",
       /* ... 18 more with unique keys */
     }
   }
   ```
3. Use SAME keys across all 4 languages for proper translation
4. Theme will automatically appear in selection screen

### Adding a New Screen
1. Create `src/screens/newScreen.js`
2. Add screen HTML to `index.html` with class `screen`
3. Import and initialize in `src/main.js`
4. Use `showScreen('new-screen-id')` to navigate

### Modifying Game Logic
- Update `GameState` class in `src/game.js`
- Call methods from screen modules
- Maintain state consistency across screens
- Use custom events for cross-screen communication

### Styling Changes
- Edit CSS variables in `src/styles.css` for global theming
- Component-specific styles use descriptive class names
- Test on mobile viewport (Chrome DevTools device toolbar)
- Ensure `overflow-x: hidden` for no horizontal scroll

## 🧪 Testing Considerations

- Test language switching on all screens (ES/EN/FR/ZH)
- **Test word translation in reveal screen** when changing language mid-game
- Verify global language selector appears on all 5 screens
- Verify theme selection with different combinations
- Test player name uniqueness validation (case-insensitive)
- Test impostor count validation (must be < player count)
- Test vertical swipe pickers on real mobile devices for touch gestures
- Test bidirectional reveal swipe (up to reveal, down to hide)
- **Test reveal tracking doesn't drift** when dragging multiple times
- Verify PWA installation (Chrome: Install App button)
- Test offline functionality after build
- Check timer accuracy in both infinite and timed modes
- Test button disable/enable logic throughout game flow
- Verify localStorage persistence (language preference)
- Test horizontal scroll prevention (should only scroll vertically)

## 📦 Build & Deployment

### Web Deployment
```bash
npm run build
# Deploy 'dist/' folder to any static host
```

### PWA
- Service worker auto-generated by Vite PWA plugin
- Manifest configured in `vite.config.js`
- Icons and caching rules included

### Native Apps
- Build web first: `npm run build`
- Sync to native: `npm run cap:sync`
- Open platform IDE and build/sign app

## 🐛 Common Issues

1. **Language not switching**: Check localStorage and verify `TRANSLATIONS` object structure
2. **Themes not loading**: Ensure `WORD_THEMES` has correct `{ es: {...}, en: {...} }` format
3. **Timer not working**: Check `gameState.timerMode` setting and timer initialization
4. **Avatars not loading**: Ensure PNG files exist in `public/avatars/` (avatar-1.png to avatar-11.png)
5. **Vertical swipe not responding**: Test touch events vs mouse events, check 20px sensitivity
6. **Bidirectional reveal stuck**: Verify `currentTranslateY` state tracking and snap thresholds
7. **Player names rejected**: Check unique validation (case-insensitive comparison)
8. **Impostor count invalid**: Must be ≥1 and < total player count
9. **Horizontal scroll appearing**: Check `overflow-x: hidden` is applied to containers
10. **PWA not installing**: Verify HTTPS or localhost, check manifest settings

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [PWA Vite Plugin](https://vite-pwa-org.netlify.app/)
- [Capacitor Docs](https://capacitorjs.com/docs)