document.addEventListener('DOMContentLoaded', function() {
  const theme = document.getElementById('theme');
  const autoFormat = document.getElementById('autoFormat');
  const formatAllSites = document.getElementById('formatAllSites');
  const showButtons = document.getElementById('showButtons');

  // Load settings
  loadSettings();

  // Save settings when changed
  theme.addEventListener('change', saveSettings);
  autoFormat.addEventListener('change', saveSettings);
  formatAllSites.addEventListener('change', saveSettings);
  showButtons.addEventListener('change', saveSettings);

  function loadSettings() {
    browser.storage.sync.get({
      theme: 'dark',
      autoFormat: true,
      formatAllSites: true,
      showButtons: false
    }).then(settings => {
      theme.value = settings.theme;
      autoFormat.checked = settings.autoFormat;
      formatAllSites.checked = settings.formatAllSites;
      showButtons.checked = settings.showButtons;
    });
  }

  function saveSettings() {
    browser.storage.sync.set({
      theme: theme.value,
      autoFormat: autoFormat.checked,
      formatAllSites: formatAllSites.checked,
      showButtons: showButtons.checked
    });
  }
}); 