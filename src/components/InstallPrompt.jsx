import { useState, useEffect } from 'react';
import './InstallPrompt.css';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    if (isAppleDevice) {
      setIsIOS(true);
      // Show iOS prompt after delay
      setTimeout(() => {
        if (!localStorage.getItem('installDismissed')) {
          setShowPrompt(true);
        }
      }, 2000);
      return;
    }

    // Android: listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!localStorage.getItem('installDismissed')) {
        setShowPrompt(true);
      }
    });

    // Android: check if app was installed
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      localStorage.setItem('installDismissed', 'true');
    });

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
      localStorage.setItem('installDismissed', 'true');
    }
    setDeferredPrompt(null);
  };

  const handleLater = () => {
    setShowPrompt(false);
    localStorage.setItem('installDismissed', 'true');
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt-icon">📱</div>
      <div className="install-prompt-text">
        <strong>Install Cheapr App</strong>
        <span>
          {isIOS 
            ? 'Tap Share → Add to Home Screen' 
            : 'Compare prices anytime — Free!'}
        </span>
      </div>
      <div className="install-prompt-actions">
        {isIOS ? (
          <>
            <button className="ios-guide-btn" onClick={() => {
              // Show iOS guide modal
              setIsIOS(false);
              setShowPrompt(false);
              // Show a small guide
              alert('📱 On iOS:\n1. Tap the Share button (box with arrow)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add"');
            }}>
              How to Install
            </button>
            <button className="later-btn" onClick={handleLater}>
              Later
            </button>
          </>
        ) : (
          <>
            <button className="install-btn" onClick={handleInstall}>
              Add to Home Screen
            </button>
            <button className="later-btn" onClick={handleLater}>
              Later
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;