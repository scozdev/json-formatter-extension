function formatSpecificJson() {
  console.log("formatSpecificJson fonksiyonu çalıştı");
  
  const elements = document.querySelectorAll('[data-test-subj="tableDocViewRow-msg-value"]');
  console.log("Bulunan elementler:", elements.length);

  elements.forEach((element) => {
    try {
      const jsonData = JSON.parse(element.innerText);
      const formattedJson = JSON.stringify(jsonData, null, 2);
      element.innerHTML = `<pre class="json-formatter">${formattedJson}</pre>`;
      console.log("JSON formatlandı:", formattedJson);
    } catch (e) {
      console.log("JSON parse hatası:", e.message);
    }
  });
}

// Mesaj dinleyicisi ekleyin
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Mesaj alındı:", request);
  if (request.action === "formatJson") {
    formatSpecificJson();
  }
});

console.log("Content script yüklendi");
  