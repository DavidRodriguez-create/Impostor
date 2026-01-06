# 🎭 Impostor Game

Un juego social de deducción para móvil y web, construido como PWA (Progressive Web App).

## 🎮 Características

- **Sistema de Temas**: 8 categorías temáticas con palabras secretas (Lugares, Comida, Animales, Objetos, Actividades, Profesiones, Colores & Formas, Emociones)
- **Multilenguaje Avanzado**: Soporte completo para 4 idiomas (Español, English, Français, 中文) con cambio en tiempo real
- **Traducción de Palabras**: Sistema de mapeo con keys compartidas - las palabras del juego se traducen automáticamente al cambiar idioma
- **Selector Global de Idioma**: Cambia de idioma en cualquier pantalla del juego, no solo al inicio
- **Setup del Juego**: Configura jugadores (hasta 100), número de impostores (sin límite, solo < jugadores), y tiempo con controles táctiles optimizados
- **Controles Verticales**: Selectores deslizables verticales (swipe pickers) para números al estilo móvil nativo
- **Asignación de Roles**: Cada jugador ve su rol secretamente con sistema bidireccional de deslizar mejorado
- **Temporizador**: Modo infinito o con tiempo límite configurable (1-60 minutos vía swipe picker)
- **Revelación Gradual**: Descubre impostores uno por uno
- **Validaciones**: Nombres únicos por jugador, impostores menores al número de jugadores
- **Multiplataforma**: Funciona en navegador web y como app instalable (PWA)
- **Empaquetado Nativo**: Soporte para Android/iOS mediante Capacitor

## 🚀 Tech Stack

- **Vite 4.5** - Build tool ultra-rápido
- **Vanilla JavaScript ES6** - Sin frameworks, máximo rendimiento
- **Arquitectura Modular** - Separación en data/, utils/, screens/
- **Sistema i18n Avanzado** - Traducción completa ES/EN/FR/ZH con mapeo de palabras mediante keys compartidas
- **Traducción Dinámica** - Las palabras del juego se traducen en tiempo real usando keys (beach → Playa/Beach/Plage/海滩)
- **PWA** - Instalable y funciona offline (vite-plugin-pwa)
- **Capacitor 5.5** - Empaquetado nativo para móviles

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📱 Empaquetado Nativo

### Android

```bash
# Sincronizar con Capacitor
npm run cap:sync

# Abrir en Android Studio
npm run cap:android

# Luego desde Android Studio, compila y genera el APK/AAB
```

### iOS

```bash
# Sincronizar con Capacitor
npm run cap:sync

# Abrir en Xcode
npm run cap:ios

# Luego desde Xcode, compila y genera el IPA
```

## 🎯 Cómo Jugar

1. **Inicio**: Selecciona idioma (ES/EN/FR/ZH) desde el dropdown - ¡puedes cambiar de idioma en cualquier momento!
2. **Temas**: Elige una o más categorías de palabras (mínimo 1)
3. **Setup**: 
   - Añade jugadores con nombres únicos (hasta 100 jugadores)
   - Usa swipe vertical para configurar número de impostores (de 1 a 999, pero debe ser < número de jugadores)
   - Configura modo de tiempo (Infinito o Temporizador con swipe vertical 1-60 minutos)
4. **Revelación**: Cada jugador desliza hacia arriba para ver su rol y palabra secreta, puede tapar deslizando hacia abajo
   - Las palabras se traducen automáticamente si cambias el idioma durante el juego
5. **Juego**: Inicia el temporizador (o modo infinito) y discute para descubrir impostores
6. **Revelación Final**: Revela impostores uno por uno cuando estén listos

## 🗂️ Estructura del Proyecto

```
impostor/
├── public/
│   ├── avatars/          # Avatares de jugadores (11 variaciones)
│   ├── icon-192.png      # Icono PWA 192x192
│   ├── icon-512.png      # Icono PWA 512x512
│   └── favicon.ico       # Favicon
├── src/
│   ├── data/
│   │   ├── themes.js         # 8 categorías temáticas bilingües (ES/EN)
│   │   └── translations.js   # Sistema completo de traducciones
│   ├── utils/
│   │   ├── languageManager.js  # Gestión cambio de idioma
│   │   ├── playerUtils.js      # Utilidades de jugadores
│   │   ├── roleUtils.js        # Lógica asignación de roles
│   │   └── timerUtils.js       # Utilidades de temporizador
│   ├── screens/
│   │   ├── startScreen.js    # Pantalla inicial con selector de idioma
│   │   ├── themeScreen.js    # Selección de temas (multi-select)
│   │   ├── setupScreen.js    # Configuración con swipe pickers verticales
│   │   ├── revealScreen.js   # Revelación bidireccional con swipe
│   │   └── gameScreen.js     # Pantalla de juego con timer
│   ├── game.js           # State management (GameState class)
│   ├── main.js           # Entry point & routing
│   └── styles.css        # Estilos globales (797+ líneas)
├── index.html            # HTML con todas las pantallas
├── vite.config.js        # Configuración Vite + PWA
├── capacitor.config.ts   # Configuración Capacitor
└── package.json
```

## 🎨 Personalización

### Agregar Nuevos Idiomas
1. Edita `src/data/translations.js` y agrega nuevo idioma:
   ```javascript
   export const TRANSLATIONS = {
     es: { ... },
     en: { ... },
     fr: { /* nuevas traducciones */ }
   };
   ```
2. Edita `src/data/themes.js` y agrega temas traducidos:
   ```javascript
   export const WORD_THEMES = {
     es: { ... },
     en: { ... },
     fr: { /* nuevos temas */ }
   };
   ```
3. Agrega opción en `index.html`:
   ```html
   <option value="fr">🌐 Français (FR)</option>
   ```

### Modificar Temas y Palabras
- Edita `src/data/themes.js`
- Cada categoría tiene 20 palabras por idioma
- Mantén estructura `{ es: {...}, en: {...} }`

### Cambiar Colores
- Edita variables CSS en `src/styles.css`:
  ```css
  :root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --danger-color: #d63031;
  }
  ```

### Agregar Avatares
- Añade archivos a `public/avatars/` (avatar-12.png, avatar-13.png, etc.)
- Actualiza cantidad en `src/utils/playerUtils.js`

## 📄 Licencia

MIT License - Libre para usar y modificar
