function isJsonString(str) {
  try {
      const parsed = JSON.parse(str);
      return typeof parsed === 'object' && parsed !== null;
  } catch (e) {
      return false;
  }
}

function createControlButtons(jsonData, formatter) {
    const controlContainer = document.createElement('div');
    controlContainer.className = 'json-control-buttons';

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    `;
    copyBtn.className = 'json-control-btn copy';
    copyBtn.title = "Copy JSON";
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    };

    // Decrease Level button
    const decreaseBtn = document.createElement('button');
    decreaseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M17 13l-5 5-5-5M17 7l-5 5-5-5"/>
        </svg>
    `;
    decreaseBtn.className = 'json-control-btn';
    decreaseBtn.title = "Decrease Level";
    let currentLevel = 2; // Başlangıç seviyesi
    decreaseBtn.onclick = () => {
        if (currentLevel > 1) {
            currentLevel--;
            formatter.openAtDepth(currentLevel);
        }
    };

    // Increase Level button
    const increaseBtn = document.createElement('button');
    increaseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M7 11l5-5 5 5M7 17l5-5 5 5"/>
        </svg>
    `;
    increaseBtn.className = 'json-control-btn';
    increaseBtn.title = "Increase Level";
    increaseBtn.onclick = () => {
        currentLevel++;
        formatter.openAtDepth(currentLevel);
    };

    controlContainer.appendChild(copyBtn);
    controlContainer.appendChild(decreaseBtn);
    controlContainer.appendChild(increaseBtn);

    return controlContainer;
}

function createPrettyButton(textNode) {
    const button = document.createElement('button');
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 32 32"><title>file_type_light_json</title><path d="M4.014,14.976a2.51,2.51,0,0,0,1.567-.518A2.377,2.377,0,0,0,6.386,13.1,15.261,15.261,0,0,0,6.6,10.156q.012-2.085.075-2.747a5.236,5.236,0,0,1,.418-1.686,3.025,3.025,0,0,1,.755-1.018A3.046,3.046,0,0,1,9,4.125,6.762,6.762,0,0,1,10.544,4h.7V5.96h-.387a2.338,2.338,0,0,0-1.723.468A3.4,3.4,0,0,0,8.709,8.52a36.054,36.054,0,0,1-.137,4.133,4.734,4.734,0,0,1-.768,2.06A4.567,4.567,0,0,1,6.1,16a3.809,3.809,0,0,1,1.992,1.754,8.861,8.861,0,0,1,.618,3.865q0,2.435.05,2.9A1.755,1.755,0,0,0,9.264,25.7a2.639,2.639,0,0,0,1.592.337h.387V28h-.7a5.655,5.655,0,0,1-1.773-.2,2.97,2.97,0,0,1-1.324-.93,3.353,3.353,0,0,1-.681-1.63A24.175,24.175,0,0,1,6.6,22.006,16.469,16.469,0,0,0,6.386,18.9a2.408,2.408,0,0,0-.805-1.361,2.489,2.489,0,0,0-1.567-.524Z" style="fill:#fbc02d"/><path d="M27.986,17.011a2.489,2.489,0,0,0-1.567.524,2.408,2.408,0,0,0-.805,1.361,16.469,16.469,0,0,0-.212,3.109,24.175,24.175,0,0,1-.169,3.234,3.353,3.353,0,0,1-.681,1.63,2.97,2.97,0,0,1-1.324.93,5.655,5.655,0,0,1-1.773.2h-.7V26.04h.387a2.639,2.639,0,0,0,1.592-.337,1.755,1.755,0,0,0,.506-1.186q.05-.462.05-2.9a8.861,8.861,0,0,1,.618-3.865A3.809,3.809,0,0,1,25.9,16a4.567,4.567,0,0,1-1.7-1.286,4.734,4.734,0,0,1-.768-2.06,36.054,36.054,0,0,1-.137-4.133,3.4,3.4,0,0,0-.425-2.092,2.338,2.338,0,0,0-1.723-.468h-.387V4h.7A6.762,6.762,0,0,1,23,4.125a3.046,3.046,0,0,1,1.149.581,3.025,3.025,0,0,1,.755,1.018,5.236,5.236,0,0,1,.418,1.686q.062.662.075,2.747a15.261,15.261,0,0,0,.212,2.947,2.377,2.377,0,0,0,.805,1.355,2.51,2.51,0,0,0,1.567.518Z" style="fill:#fbc02d"/></svg>
    `;
    button.className = 'pretty-json-btn';
    button.title = 'Format JSON';
    button.style.marginLeft = '10px';
    
    button.addEventListener('click', async () => {
        try {
            const jsonData = JSON.parse(textNode.textContent);
            
            const formattedContainer = document.createElement('div');
            formattedContainer.className = 'json-formatter';
            
            const formatter = new window.JSONFormatter(jsonData, 2, {
                hoverPreviewEnabled: true,
                hoverPreviewArrayCount: 100,
                hoverPreviewFieldCount: 5,
                theme: 'dark',
                animateOpen: true,
                animateClose: true
            });

            const controlButtons = createControlButtons(jsonData, formatter);
            formattedContainer.appendChild(controlButtons);
            formattedContainer.appendChild(formatter.render());
            
            textNode.parentNode.replaceChild(formattedContainer, textNode);
            button.remove();
            
        } catch (e) {
            console.error('JSON parse error:', e);
        }
    });
    
    return button;
}

function findAndProcessJsonContent() {
  const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
          acceptNode: function(node) {
              return isJsonString(node.textContent.trim()) 
                  ? NodeFilter.FILTER_ACCEPT 
                  : NodeFilter.FILTER_REJECT;
          }
      }
  );

  let node;
  while (node = walker.nextNode()) {
      if (!node.parentElement.querySelector('.pretty-json-btn')) {
          const button = createPrettyButton(node);
          node.parentElement.appendChild(button);
      }
  }
}

// Sayfa yüklendiğinde ve DOM değişikliklerinde çalıştır
document.addEventListener('DOMContentLoaded', findAndProcessJsonContent);

// DOM değişikliklerini izle
const observer = new MutationObserver(findAndProcessJsonContent);
observer.observe(document.body, {
  childList: true,
  subtree: true
});