// ::: DARK MODE TOGGLE SCRIPT :::

// Function to toggle dark mode
function toggleDarkMode() {
    const darkModeClass = 'dark-mode';
    document.documentElement.classList.toggle(darkModeClass);
    // Save the preference in localStorage
    const darkModeStatus = document.documentElement.classList.contains(darkModeClass) ? 'enabled' : 'disabled';
    localStorage.setItem('darkMode', darkModeStatus);
    console.log('Dark mode toggled:', darkModeStatus);
}

// Function to load the user's dark mode preference
function loadDarkModePreference() {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'enabled') {
        document.documentElement.classList.add('dark-mode');
    }
}

// Function to initialize the dark mode toggle button
function initializeDarkModeToggle() {
    const darkModeToggleButton = document.getElementById('dark-mode-toggle');
    if (darkModeToggleButton) {
        darkModeToggleButton.addEventListener('click', toggleDarkMode);
    }
}

// Function to initialize the dark mode functionality
function initializeDarkMode() {
    loadDarkModePreference();
    initializeDarkModeToggle();
}

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeDarkMode);
