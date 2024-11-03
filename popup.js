document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const addUrlBtn = document.getElementById('addUrl');
  const urlList = document.getElementById('urlList');
  const defaultOpenLevel = document.getElementById('defaultOpenLevel');
  const theme = document.getElementById('theme');
  const autoFormat = document.getElementById('autoFormat');
  const formatAllSites = document.getElementById('formatAllSites');

  // Load all settings
  loadSettings();

  // Save settings when changed
  defaultOpenLevel.addEventListener('change', saveSettings);
  theme.addEventListener('change', saveSettings);
  autoFormat.addEventListener('change', saveSettings);
  formatAllSites.addEventListener('change', saveSettings);

  function loadSettings() {
    browser.storage.sync.get({
      allowedUrls: [],
      defaultOpenLevel: 2,
      theme: 'dark',
      autoFormat: false,
      formatAllSites: false
    }).then(settings => {
      // Load URLs
      settings.allowedUrls.forEach(url => addUrlToList(url));
      
      // Load other settings
      defaultOpenLevel.value = settings.defaultOpenLevel;
      theme.value = settings.theme;
      autoFormat.checked = settings.autoFormat;
      formatAllSites.checked = settings.formatAllSites;
    });
  }

  function saveSettings() {
    browser.storage.sync.set({
      defaultOpenLevel: parseInt(defaultOpenLevel.value),
      theme: theme.value,
      autoFormat: autoFormat.checked,
      formatAllSites: formatAllSites.checked
    });
  }

  addUrlBtn.addEventListener('click', function() {
    const url = urlInput.value.trim();
    if (url) {
      addUrl(url);
      urlInput.value = '';
    }
  });

  function addUrl(url) {
    browser.storage.sync.get(['allowedUrls']).then(result => {
      const urls = result.allowedUrls || [];
      if (!urls.includes(url)) {
        urls.push(url);
        browser.storage.sync.set({ allowedUrls: urls }).then(() => {
          addUrlToList(url);
        });
      }
    });
  }

  function addUrlToList(url) {
    const div = document.createElement('div');
    div.className = 'url-item';
    div.innerHTML = `
      <span>${url}</span>
      <button class="delete">Delete</button>
    `;

    div.querySelector('.delete').addEventListener('click', function() {
      removeUrl(url);
      div.remove();
    });

    urlList.appendChild(div);
  }

  function removeUrl(url) {
    browser.storage.sync.get(['allowedUrls']).then(result => {
      const urls = result.allowedUrls || [];
      const newUrls = urls.filter(u => u !== url);
      browser.storage.sync.set({ allowedUrls: newUrls });
    });
  }
}); 