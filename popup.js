document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const addUrlBtn = document.getElementById('addUrl');
  const urlList = document.getElementById('urlList');
  const defaultOpenLevel = document.getElementById('defaultOpenLevel');
  const theme = document.getElementById('theme');
  const hoverPreview = document.getElementById('hoverPreview');
  const animateOpen = document.getElementById('animateOpen');

  // Load all settings
  loadSettings();

  // Save settings when changed
  defaultOpenLevel.addEventListener('change', saveSettings);
  theme.addEventListener('change', saveSettings);
  hoverPreview.addEventListener('change', saveSettings);
  animateOpen.addEventListener('change', saveSettings);

  function loadSettings() {
    chrome.storage.sync.get({
      allowedUrls: [],
      defaultOpenLevel: 2,
      theme: 'dark',
      hoverPreview: true,
      animateOpen: true
    }, function(settings) {
      // Load URLs
      settings.allowedUrls.forEach(url => addUrlToList(url));
      
      // Load other settings
      defaultOpenLevel.value = settings.defaultOpenLevel;
      theme.value = settings.theme;
      hoverPreview.checked = settings.hoverPreview;
      animateOpen.checked = settings.animateOpen;
    });
  }

  function saveSettings() {
    chrome.storage.sync.set({
      defaultOpenLevel: parseInt(defaultOpenLevel.value),
      theme: theme.value,
      hoverPreview: hoverPreview.checked,
      animateOpen: animateOpen.checked
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
    chrome.storage.sync.get(['allowedUrls'], function(result) {
      const urls = result.allowedUrls || [];
      if (!urls.includes(url)) {
        urls.push(url);
        chrome.storage.sync.set({ allowedUrls: urls }, function() {
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
    chrome.storage.sync.get(['allowedUrls'], function(result) {
      const urls = result.allowedUrls || [];
      const newUrls = urls.filter(u => u !== url);
      chrome.storage.sync.set({ allowedUrls: newUrls });
    });
  }
}); 