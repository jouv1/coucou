
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { register } from './serviceWorker'

// Set theme meta tag for iOS PWA
const setThemeColor = () => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', '#18353c'); // Our teal color
  } else {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = '#18353c';
    document.head.appendChild(meta);
  }
  
  // Add apple-mobile-web-app-capable meta tag
  const mobileMeta = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
  if (!mobileMeta) {
    const meta = document.createElement('meta');
    meta.name = 'apple-mobile-web-app-capable';
    meta.content = 'yes';
    document.head.appendChild(meta);
  }
  
  // Add apple-mobile-web-app-status-bar-style meta tag
  const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (!statusBarMeta) {
    const meta = document.createElement('meta');
    meta.name = 'apple-mobile-web-app-status-bar-style';
    meta.content = 'black-translucent';
    document.head.appendChild(meta);
  }
};

// Run setup
setThemeColor();

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA capabilities
register();
