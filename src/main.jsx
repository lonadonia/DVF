import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.css';
import App from './App';

window.addEventListener('error', (e) => {
  const el = document.getElementById('root');
  if (el && !el.hasChildNodes()) {
    el.innerHTML = `<pre style="color:red;padding:20px;font-size:14px">[JS Error] ${e.message}\n${e.filename}:${e.lineno}\n\n${e.error?.stack || ''}</pre>`;
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Load lucide icons after React renders to avoid blocking initial paint
import('lucide').then(({ createIcons, icons }) => {
  createIcons({ icons });
  new MutationObserver(() => createIcons({ icons })).observe(document.body, { childList: true, subtree: true });
});
