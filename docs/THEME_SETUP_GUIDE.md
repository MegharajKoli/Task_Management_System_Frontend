# Redux Theme State Setup Guide

## Overview
The application now has a complete dark/light theme system integrated with Redux store, localStorage persistence, and system preference detection.

## Architecture

### 1. **Redux State Management** (`src/store/themeSlices.ts`)
```typescript
interface ThemeState {
  mode: 'light' | 'dark';
}

// Actions
- toggleTheme(): Switches between light and dark mode
- setTheme(payload): Sets specific theme
```

### 2. **Store Configuration** (`src/store/index.ts`)
- ConfigureStore with themeReducer
- Custom hooks: `useAppDispatch` and `useAppSelector`
- Type-safe Redux usage

### 3. **Main Entry Point** (`src/main.tsx`)
- Provider wraps the entire app with Redux store
- Available to all components

### 4. **App Component Integration** (`src/App.tsx`)
```typescript
// Get current theme from Redux
const theme = useAppSelector((state) => state.theme.mode);

// Dispatch toggle action
const dispatch = useAppDispatch();
dispatch(toggleTheme());
```

### 5. **Theme Persistence & DOM Integration**
- **localStorage**: Saves theme preference on every change
- **data-theme attribute**: Applied to HTML element
- **System preference**: Respects OS dark/light mode preference
- **Smooth transitions**: CSS transitions on theme changes

### 6. **CSS Variables** (`src/index.css`)

#### Light Mode (Default)
```css
--bg-color: #f5f5f5
--text-color: #333333
--link-color: #2196f3
--button-bg: #2196f3
--card-bg: #ffffff
--input-bg: #ffffff
```

#### Dark Mode
```css
--bg-color: #1a1a1a
--text-color: #f5f5f5
--link-color: #64b5f6
--button-bg: #1976d2
--card-bg: #2d2d2d
--input-bg: #333333
```

## How It Works

### Theme Initialization Flow
1. App mounts → useEffect runs
2. Check localStorage for saved theme
3. If no saved theme, detect system preference
4. Apply theme to DOM via `data-theme` attribute
5. CSS variables automatically update

### Theme Toggle Flow
1. User clicks theme toggle button
2. `toggleTheme()` action dispatched
3. Redux state updates
4. Component re-renders with new theme
5. useEffect detects theme change
6. DOM attribute updated
7. Theme saved to localStorage
8. CSS variables switch automatically

## Usage Examples

### Example 1: Access Current Theme in Component
```typescript
import { useAppSelector } from '../store';

function MyComponent() {
  const theme = useAppSelector((state) => state.theme.mode);
  
  return <div>Current theme: {theme}</div>;
}
```

### Example 2: Dispatch Theme Action
```typescript
import { useAppDispatch } from '../store';
import { toggleTheme, setTheme } from '../store/themeSlices';

function ThemeButton() {
  const dispatch = useAppDispatch();
  
  // Toggle between light/dark
  const handleToggle = () => dispatch(toggleTheme());
  
  // Set specific theme
  const handleSetDark = () => dispatch(setTheme('dark'));
  
  return (
    <button onClick={handleToggle}>Toggle Theme</button>
  );
}
```

### Example 3: Use CSS Variables in Styles
```css
/* Automatically adapts to light/dark theme */
.card {
  background-color: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--card-border);
}

.button {
  background-color: var(--button-bg);
  color: white;
}

.input {
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  color: var(--text-color);
}
```

## Theme Toggle Button
Located in navbar (`App.tsx`):
- Shows 🌙 (moon) in light mode
- Shows ☀️ (sun) in dark mode
- Smooth hover animation
- Click to toggle theme

## Persistence
- **localStorage key**: 'theme'
- **Storage value**: 'light' | 'dark'
- **Auto-loaded** on page refresh
- **Survives** browser restarts

## System Preference Detection
```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```
- Automatically detects if user prefers dark mode in OS settings
- Falls back to system preference if no localStorage value exists
- Can be overridden by user via toggle button

## Adding Theme Support to New Components

### Step 1: Use CSS Variables
```css
/* Instead of hard-coded colors */
.myComponent {
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--card-border);
}
```

### Step 2: Add Transition Effects
```css
.myComponent {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Step 3: Optional - React to Theme Changes
```typescript
import { useAppSelector } from '../store';

function MyComponent() {
  const theme = useAppSelector((state) => state.theme.mode);
  
  // Optional: Do something based on theme
  useEffect(() => {
    console.log('Theme changed to:', theme);
  }, [theme]);
  
  return <div>Components automatically styled</div>;
}
```

## Available CSS Variables

### Colors
- `--bg-color`: Main background
- `--text-color`: Main text color
- `--link-color`: Link color
- `--card-bg`: Card/panel background
- `--input-bg`: Input field background
- `--navbar-bg`: Navbar background

### UI Elements
- `--button-bg`: Button background
- `--card-border`: Card border color
- `--input-border`: Input border color
- `--hover-bg`: Hover state background

### Semantic Colors
- `--error-color`: Error/danger messages
- `--success-color`: Success messages
- `--warning-color`: Warning messages

## Browser Support
- All modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support required
- CSS Variables (CSS Custom Properties) support required
- matchMedia API for system preference detection

## File Structure
```
src/
├── store/
│   ├── index.ts           # Redux store configuration
│   └── themeSlices.ts     # Theme reducer and actions
├── App.tsx                # App with theme integration
├── index.css              # CSS variables for themes
└── main.tsx               # Redux Provider setup
```

## Next Steps
1. Update all component stylesheets to use CSS variables
2. Test theme switching in all components
3. Verify localStorage persistence
4. Test system preference detection
5. Check accessibility in both modes

## Troubleshooting

### Theme not persisting
- Check if localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

### Theme not applying
- Verify `data-theme` attribute on html element
- Check if CSS variables are defined
- Reload page (hard refresh)

### Button not appearing
- Verify nav-links display: flex is set
- Check button styling in App.css
- Ensure no CSS specificity overrides

---
**Version**: 1.0  
**Last Updated**: Feb 24, 2026
