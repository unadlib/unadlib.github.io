// Theme management class
class ThemeManager {
  constructor() {
    this.themeKey = 'attraction-theme';
    this.init();
  }

  init() {
    this.createToggleButton();
    this.applyTheme();
    this.setupEventListeners();
  }

  // Create theme toggle button
  createToggleButton() {
    const toggleButton = document.createElement('div');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = '<span class="icon">🌙</span>';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(toggleButton);
    this.toggleButton = toggleButton;
  }

  // Get current theme
  getCurrentTheme() {
    // Prioritize user settings
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      return savedTheme;
    }

    // Auto-detect system theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  // Apply theme
  applyTheme(theme = null) {
    const currentTheme = theme || this.getCurrentTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update button icon
    const icon = this.toggleButton.querySelector('.icon');
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    // Save user choice
    localStorage.setItem(this.themeKey, currentTheme);
  }

  // Toggle theme
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  // Setup event listeners
  setupEventListeners() {
    // Button click event
    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch when user hasn't manually set theme
        if (!localStorage.getItem(this.themeKey)) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    // Keyboard shortcut support (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
}

// Initialize theme manager after page load
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});

// If page is already loaded, initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
  });
} else {
  new ThemeManager();
}
