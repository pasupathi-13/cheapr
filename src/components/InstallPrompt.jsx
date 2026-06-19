import { useState, useEffect } from 'react';
import './InstallPrompt.css';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Safety check: only run in browser
    if (typeof window === 'undefined') return;

    try {
      // Check if already installed
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsStandalone(true);
        return;
      }

      // Check iOS
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
      if (isAppleDevice) {
        setIsIOS(true);
        setTimeout(() => {
          if (!localStorage.getItem('installDismissed')) {
            setShowPrompt(true);
          }
        }, 2000);
        return;
      }

      // Android: listen for beforeinstallprompt
      const handleBeforeInstall = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        if (!localStorage.getItem('installDismissed')) {
          setShowPrompt(true);
        }
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);

      // Android: app installed
      const handleAppInstalled = () => {
        setShowPrompt(false);
        localStorage.setItem('installDismissed', 'true');
      };

      window.addEventListener('appinstalled', handleAppInstalled);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    } catch (error) {
      console.log('InstallPrompt error:', error);
      // Gracefully fail: don't show prompt if something breaks
      setShowPrompt(false);
    }
  }, []);

  const handleInstall = async () => {
    try {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
        localStorage.setItem('installDismissed', 'true');
      }
      setDeferredPrompt(null);
    } catch (error) {
      console.log('Install error:', error);
    }
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
              alert('📱 On iOS:\n1. Tap the Share button (box with arrow)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add"');
              setShowPrompt(false);
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