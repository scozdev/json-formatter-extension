chrome.action.onClicked.addListener((tab) => {
  console.log("Extension button clicked");
  
  // Browser temasını kontrol et
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => window.matchMedia('(prefers-color-scheme: dark)').matches
  }).then((result) => {
    const isDarkMode = result[0].result;
    
    // JSONFormatter'ı yükle
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['node_modules/json-formatter-js/dist/json-formatter.umd.js']
    }).then(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: formatJson,
        args: [isDarkMode]
      });
    });

    // Stilleri ekle
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: getStyles(isDarkMode)
    });
  });
});

function getStyles(isDarkMode) {
  const darkTheme = {
    background: '#1e1e1e',
    color: '#d4d4d4',
    scrollTrack: '#2d2d2d',
    scrollThumb: '#666'
  };

  const lightTheme = {
    background: '#ffffff',
    color: '#333333',
    scrollTrack: '#f1f1f1',
    scrollThumb: '#c1c1c1'
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return `
    [data-test-subj="tableDocViewRow-msg-value"] {
      max-height: 500px;
      overflow: auto;
      max-width: 100%;
      position: relative;
      padding: 0 10px;
    }

    [data-test-subj="tableDocViewRow-msg-value"]::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    [data-test-subj="tableDocViewRow-msg-value"]::-webkit-scrollbar-track {
      background: ${theme.scrollTrack};
      border-radius: 4px;
    }

    [data-test-subj="tableDocViewRow-msg-value"]::-webkit-scrollbar-thumb {
      background: ${theme.scrollThumb};
      border-radius: 4px;
    }

    .json-formatter-row {
      font-family: monaco, Consolas, 'Lucida Console', monospace;
      font-size: 13px;
      line-height: 1.4;
      background: ${theme.background};
      color: ${theme.color};
    }
  `;
}

function formatJson(isDarkMode) {
  const elements = document.querySelectorAll('[data-test-subj="tableDocViewRow-msg-value"]');

  elements.forEach((element) => {
    try {
      const jsonData = JSON.parse(element.innerText);
      const formatter = new JSONFormatter(jsonData, 2, {
        theme: isDarkMode ? 'dark' : 'light',
        hoverPreviewEnabled: true,
        animateOpen: true,
        animateClose: true
      });
      
      element.innerHTML = '';
      element.appendChild(formatter.render());
    } catch (e) {
      console.log("JSON parse error:", e.message);
    }
  });
} 