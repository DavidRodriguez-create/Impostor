# 🚀 Quick Start Guide

## Development Server

Start the dev server:
```bash
npm install
npm run dev
```

Your Impostor game will be accessible at: **http://localhost:5173/**

## What You Can Do Now

### 1. Test the Complete Game Flow
- Open http://localhost:5173/ in your browser
- **Change language** using the dropdown (ES/EN/FR/ZH) - available on ALL screens
- **Select themes** (pick 1+ categories from 8 available)
- **Add players** (3-100, unique names required)
- **Configure game** with vertical swipe pickers:
  - Impostor count (1-999 range, must be < player count)
  - Timer mode (Infinite or Timed with minutes selector)
- **Reveal roles** with bidirectional swipe gesture (up to reveal, down to hide)
- **Test word translation**: Change language during reveal screen - words translate automatically!
- **Play game** with timer and sequential impostor reveals

### 2. Test Mobile Gestures
- Get your computer's local IP address:
  - Windows: `ipconfig` (look for IPv4)
  - Mac/Linux: `ifconfig` or `ip addr`
- On your phone's browser: `http://YOUR_IP:5173/`
- Test touch gestures:
  - Vertical swipe pickers for numbers
  - Bidirectional role reveal swipe
  - Theme multi-select buttons

### 3. Build for Production
```bash
npm run build
npm run preview  # Test the production build
```

### 4. Install as PWA
- Open in Chrome
- Click the install icon in the address bar
- Test offline functionality

### 5. Package as Native App

#### For Android:
```bash
npm run build
npm run cap:sync
npm run cap:android
```
Then build APK/AAB from Android Studio

#### For iOS:
```bash
npm run build
npm run cap:sync
npm run cap:ios
```
Then build IPA from Xcode

## 📱 Testing Checklist

- [ ] Language switching (ES/EN/FR/ZH) in real-time on ANY screen
- [ ] Word translation when changing language in reveal screen
- [ ] Theme selection (multi-select, min 1 required)
- [ ] Add/remove players (unique names, max 100)
- [ ] Vertical swipe picker for impostor count
- [ ] Vertical swipe picker for timer minutes
- [ ] Timer mode toggle (infinite/timed)
- [ ] Bidirectional swipe reveal (up = reveal, down = hide) - smooth tracking
- [ ] Reveal can be hidden again by swiping down
- [ ] Role assignment (impostors get "IMPOSTOR" badge, others get secret word)
- [ ] Timer countdown (if timed mode)
- [ ] Reveal impostors one by one
- [ ] Play again functionality
- [ ] Back to start/setup navigation
- [ ] Responsive design on different screen sizes
- [ ] PWA installation capability
- [ ] Offline functionality (after first load)
- [ ] Player input box styling and validation

## 🎨 Customization Ideas

1. **Add New Languages**
   - Edit `src/data/translations.js` - Add new language object with all UI strings
   - Edit `src/data/themes.js` - Add translated word themes using SAME keys as existing languages
   - Add dropdown option in all 5 language selectors in `index.html`
   - Language persists in localStorage
   - **Key System**: Words use shared keys (e.g., `beach: "Playa"` in ES, `beach: "Beach"` in EN)
   - This allows automatic translation when switching languages mid-game

2. **Change Theme Colors**
   - Edit CSS variables in `src/styles.css`
   - Modify `--primary-color`, `--secondary-color`, `--danger-color`, etc.
   - Test with light/dark themes

3. **Add More Word Themes**
   - Edit `src/data/themes.js`
   - Add new category with 20 words per language
   - Format: `{ es: {...}, en: {...} }`

4. **Customize Game Rules**
   - Modify `GameState` class in `src/game.js`
   - Adjust `maxPlayers` (currently 10)
   - Change impostor validation logic
   - Modify timer ranges

5. **Add New Avatars**
   - Add image files to `public/avatars/`
   - Update avatar count in `src/utils/playerUtils.js`
   - Keep consistent naming: `avatar-N.png`

6. **Enhance Swipe Controls**
   - Adjust sensitivity in `src/screens/setupScreen.js`
   - Modify snap thresholds in `src/screens/revealScreen.js`
   - Change transition speeds in CSS

7. **Add Sound Effects**
   - Add audio files to `public/sounds/`
   - Trigger sounds on role reveal, timer end, impostor reveal
   - Use Web Audio API for better mobile support

## 🐛 Troubleshooting

### Dev server won't start
- Check Node.js version (v16+ required, tested with v16.15.1)
- Delete `node_modules` and `package-lock.json`, reinstall: `npm install`
- Check port 5173 is not in use

### Language not switching
- Check browser console for errors
- Verify localStorage is enabled
- Check `src/data/translations.js` has complete translations

### Vertical swipe picker not working
- Test on actual mobile device (not just DevTools)
- Check touch events are not blocked by CSS
- Verify 20px sensitivity threshold in `src/screens/setupScreen.js`

### Bidirectional swipe not responding
- Test on real mobile device
- Check `currentTranslateY` state tracking in `src/screens/revealScreen.js`
- Verify snap points at 150px (reveal) and 50px (hide)

### Themes not loading
- Verify `src/data/themes.js` has correct structure
- Check `WORD_THEMES = { es: {...}, en: {...} }`
- Ensure at least one theme is selected before proceeding

### Player names rejected
- Names must be unique (case-insensitive comparison)
- Check validation in `src/screens/setupScreen.js`
- Maximum 20 characters per name

### PWA not installing
- Ensure you're on HTTPS or localhost
- Check manifest in DevTools → Application tab
- Verify service worker is registered
- Clear browser cache and try again

### Avatars not showing
- Verify files exist in `public/avatars/` (avatar-1.png to avatar-11.png)
- Check browser network tab for 404 errors
- Ensure correct image format and naming

### Scroll issues in player list
- Check `overflow-x: hidden` is set in `.players-list`
- Verify `overflow-y: auto` for vertical scrolling
- Test on mobile with many players

## 📚 Next Steps

1. **Deploy to Web**
   - Host on Vercel, Netlify, or GitHub Pages
   - Run `npm run build` and upload `dist/` folder

2. **Publish to App Stores**
   - Follow Capacitor guides for iOS/Android
   - Configure app icons, splash screens, etc.

3. **Add Features**
   - Multiple game modes
   - Player statistics
   - Social sharing
   - Localization

Have fun building! 🎉
