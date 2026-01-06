# 🧪 Testing Checklist for Impostor Game

## Setup Screen Tests

### Player Management
- [ ] Add a player with a valid name
- [ ] Try to add a player with an empty name (should be prevented)
- [ ] Add multiple players (3-5)
- [ ] Add maximum players (30)
- [ ] Try to add beyond maximum (should show alert)
- [ ] Remove a player from the list
- [ ] Verify avatar is randomly assigned to each player
- [ ] Verify player count updates correctly

### Configuration
- [ ] Change max players value (3-30)
- [ ] Set impostor count to 1
- [ ] Set impostor count to maximum allowed (less than half)
- [ ] Try invalid impostor count (verify validation)
- [ ] Change game word to different values
- [ ] Switch timer mode to "Infinito"
- [ ] Switch timer mode to "Temporizador"
- [ ] Set different timer minutes (1-60)

### Start Game Button
- [ ] Button is disabled with less than 3 players
- [ ] Button is disabled with invalid impostor count
- [ ] Button is enabled with valid configuration
- [ ] Click button transitions to reveal screen

## Reveal Screen Tests

### Player Display
- [ ] Current player name is shown
- [ ] Current player avatar is displayed
- [ ] Info matches the player from setup screen

### Swipe Mechanic (Desktop)
- [ ] Click and drag up reveals the role/word
- [ ] Can drag back down to cover
- [ ] Can reveal/cover multiple times
- [ ] Smooth animation during drag
- [ ] Snap to revealed state when dragged far enough
- [ ] Snap back to covered when not dragged enough

### Swipe Mechanic (Mobile)
- [ ] Touch and swipe up reveals role/word
- [ ] Can swipe down to cover again
- [ ] Multi-touch works correctly
- [ ] No scrolling interference
- [ ] Smooth touch response

### Role Display
- [ ] Regular players see the secret word
- [ ] Regular players see correct styling/icon
- [ ] Impostors see "IMPOSTOR" text
- [ ] Impostor styling is different (red theme)
- [ ] Text is readable and well-formatted

### Navigation
- [ ] "Siguiente Jugador" button advances to next player
- [ ] Last player sees "Empezar Juego" button
- [ ] Each player can see their role privately
- [ ] Clicking next shows correct next player
- [ ] Final button transitions to game screen

## Game Screen Tests

### Timer Display (Infinite Mode)
- [ ] Shows infinity symbol (∞)
- [ ] "Revelar Impostor" button is enabled immediately
- [ ] No countdown happens

### Timer Display (Timed Mode)
- [ ] Shows initial time (e.g., "5:00")
- [ ] Timer counts down every second
- [ ] Time format is correct (MM:SS)
- [ ] "Revelar Impostor" button is disabled initially
- [ ] Button enables when timer reaches 0:00
- [ ] Timer displays "0:00" when complete

### Impostor Revelation
- [ ] Initial impostor count is correct
- [ ] Click "Revelar Impostor" reveals first impostor
- [ ] Impostor card shows avatar and name
- [ ] Impostor badge displays correctly
- [ ] Remaining count decrements
- [ ] After first reveal, button stays enabled
- [ ] Can reveal next impostor without waiting
- [ ] All impostors can be revealed one by one
- [ ] Last impostor shows game over state

### Game Over
- [ ] "Revelar Impostor" button disables after last impostor
- [ ] "Jugar de Nuevo" button appears
- [ ] "Volver al Inicio" button appears
- [ ] All revealed impostors are visible

### Replay Flow
- [ ] "Jugar de Nuevo" starts new game with same players
- [ ] Roles are reassigned randomly
- [ ] Returns to reveal screen
- [ ] "Volver al Inicio" returns to setup screen
- [ ] Setup retains previous configuration

## Responsive Design Tests

### Mobile Portrait (320px - 480px)
- [ ] All text is readable
- [ ] Buttons are touch-friendly
- [ ] No horizontal scrolling
- [ ] Avatars display correctly
- [ ] Reveal card fits screen
- [ ] Timer is visible

### Mobile Landscape
- [ ] Layout adjusts appropriately
- [ ] Reveal screen adapts layout
- [ ] Timer is visible
- [ ] No content cutoff

### Tablet (768px - 1024px)
- [ ] Centered layout looks good
- [ ] Max-width container works
- [ ] Touch targets are appropriate
- [ ] Typography scales well

### Desktop (>1024px)
- [ ] Centered content with max-width
- [ ] Mouse interactions work
- [ ] Hover effects visible
- [ ] No layout issues

## PWA Tests

### Installation
- [ ] Install button appears in browser
- [ ] PWA installs successfully
- [ ] App icon appears on home screen
- [ ] Opens in standalone mode
- [ ] Splash screen displays (if configured)

### Offline Functionality
- [ ] App loads when offline
- [ ] Cached assets load correctly
- [ ] Game is playable offline
- [ ] Service worker updates properly

### Performance
- [ ] Page loads quickly (<2s)
- [ ] Smooth animations
- [ ] No lag during interactions
- [ ] Touch responses are immediate

## Cross-Browser Tests

### Chrome/Edge
- [ ] All features work
- [ ] PWA installation works
- [ ] Touch events work

### Safari (iOS)
- [ ] Touch gestures work
- [ ] Add to Home Screen works
- [ ] No webkit-specific issues

### Firefox
- [ ] All features work
- [ ] No console errors

## Edge Cases & Error Handling

### Game Logic
- [ ] Exactly 3 players works
- [ ] 30 players works
- [ ] 1 impostor works
- [ ] Maximum impostors (n/2 - 1) works
- [ ] Timer at 1 minute works
- [ ] Timer at 60 minutes works

### Invalid Inputs
- [ ] Empty player name is rejected
- [ ] Duplicate player names are allowed (or not - decide)
- [ ] Empty game word is prevented
- [ ] Invalid impostor count shows error

### State Management
- [ ] Player removal updates state correctly
- [ ] Config changes update state immediately
- [ ] Role assignment is truly random
- [ ] Timer cleanup on screen change
- [ ] No memory leaks

## Accessibility Tests

- [ ] Can navigate with keyboard (Tab key)
- [ ] Buttons have visible focus states
- [ ] Color contrast is sufficient
- [ ] Text is readable at all sizes
- [ ] Touch targets are at least 44x44px

## Visual Polish

- [ ] No layout shifts during loading
- [ ] Animations are smooth (60fps)
- [ ] Colors are consistent
- [ ] Typography is consistent
- [ ] Icons render correctly
- [ ] Shadows/gradients display well

## 🐛 Bug Reporting Template

When you find a bug, document it:

**Bug**: [Brief description]
**Steps to Reproduce**:
1. 
2. 
3. 

**Expected**: [What should happen]
**Actual**: [What actually happens]
**Browser/Device**: [Chrome/Safari/etc on iPhone/Desktop/etc]
**Screenshot**: [If applicable]

---

## ✅ Testing Status

Date tested: _______________
Tested by: _______________

### Summary
- [ ] All critical features working
- [ ] Mobile responsive
- [ ] PWA functional
- [ ] No major bugs
- [ ] Ready for deployment

### Notes:
_______________________________________
_______________________________________
_______________________________________
