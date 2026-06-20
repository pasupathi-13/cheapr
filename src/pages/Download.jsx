import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Download.css';

const Download = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    document.title = 'Download Cheapr App – Free';

    const isIOSDevice = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroidDevice = /android/i.test(navigator.userAgent);
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      setInstalled(true);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="download-page">
      <Navbar showSearch={false} />

      <div className="download-container">

        {/* Hero */}
        <div className="download-hero">
          <div className="download-icon">📱</div>
          <h1 className="download-title">Get Cheapr App</h1>
          <p className="download-sub">
            Compare Amazon & Flipkart prices anytime — completely free!
          </p>
          <div className="download-url">
            🔗 cheaprr.vercel.app
          </div>
        </div>

        {/* Features */}
        <div className="download-features">
          {[
            { icon: "⚡", text: "Instant price comparison" },
            { icon: "💰", text: "Save money every purchase" },
            { icon: "📶", text: "Works offline too" },
            { icon: "🆓", text: "100% free forever" },
            { icon: "🚀", text: "Super fast loading" },
            { icon: "🛍️", text: "50+ products daily" },
          ].map((f) => (
            <div key={f.text} className="download-feature">
              <span className="feature-icon">{f.icon}</span>
              <span className="feature-text">{f.text}</span>
            </div>
          ))}
        </div>

        {/* Success State */}
        {installed ? (
          <div className="download-success">
            <div className="success-icon">🎉</div>
            <h2>Cheapr App Installed!</h2>
            <p>Check your home screen for the Cheapr icon!</p>
          </div>
        ) : (
          <div className="download-steps">

            {/* Android */}
            {(isAndroid || !isIOS) && (
              <div className="download-card android-card">
                <div className="card-header">
                  <span className="card-icon">🤖</span>
                  <div>
                    <h2>Android</h2>
                    <p className="card-sub">Chrome browser required</p>
                  </div>
                </div>

                {deferredPrompt ? (
                  <div className="install-ready">
                    <p>Ready to install! Tap below:</p>
                    <button className="install-now-btn" onClick={handleInstall}>
                      📲 Install Cheapr App Now
                    </button>
                  </div>
                ) : (
                  <div className="manual-steps">
                    <p className="steps-label">Follow these steps:</p>
                    <div className="step">
                      <span className="step-num">1</span>
                      <span>Open <strong>cheaprr.vercel.app</strong> in Chrome</span>
                    </div>
                    <div className="step">
                      <span className="step-num">2</span>
                      <span>Tap <strong>3 dots menu</strong> (top right)</span>
                    </div>
                    <div className="step">
                      <span className="step-num">3</span>
                      <span>Tap <strong>"Add to Home Screen"</strong></span>
                    </div>
                    <div className="step">
                      <span className="step-num">4</span>
                      <span>Tap <strong>"Add"</strong> — Done! ✅</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* iPhone */}
            {(isIOS || !isAndroid) && (
              <div className="download-card ios-card">
                <div className="card-header">
                  <span className="card-icon">🍎</span>
                  <div>
                    <h2>iPhone / iPad</h2>
                    <p className="card-sub">Safari browser required</p>
                  </div>
                </div>
                <div className="manual-steps">
                  <p className="steps-label">Follow these steps:</p>
                  <div className="step">
                    <span className="step-num">1</span>
                    <span>Open <strong>cheaprr.vercel.app</strong> in Safari</span>
                  </div>
                  <div className="step">
                    <span className="step-num">2</span>
                    <span>Tap <strong>Share button</strong> (bottom center)</span>
                  </div>
                  <div className="step">
                    <span className="step-num">3</span>
                    <span>Scroll and tap <strong>"Add to Home Screen"</strong></span>
                  </div>
                  <div className="step">
                    <span className="step-num">4</span>
                    <span>Tap <strong>"Add"</strong> — Done! ✅</span>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop */}
            <div className="download-card desktop-card">
              <div className="card-header">
                <span className="card-icon">💻</span>
                <div>
                  <h2>Desktop / Laptop</h2>
                  <p className="card-sub">Chrome browser required</p>
                </div>
              </div>
              {deferredPrompt ? (
                <div className="install-ready">
                  <p>Ready to install! Click below:</p>
                  <button className="install-now-btn" onClick={handleInstall}>
                    💻 Install on Desktop
                  </button>
                </div>
              ) : (
                <div className="manual-steps">
                  <p className="steps-label">Follow these steps:</p>
                  <div className="step">
                    <span className="step-num">1</span>
                    <span>Open <strong>cheaprr.vercel.app</strong> in Chrome</span>
                  </div>
                  <div className="step">
                    <span className="step-num">2</span>
                    <span>Look for <strong>install icon</strong> in address bar (right side)</span>
                  </div>
                  <div className="step">
                    <span className="step-num">3</span>
                    <span>Click <strong>"Install"</strong> — Done! ✅</span>
                  </div>
                </div>
              )}
            </div>

            {/* Share Section */}
            <div className="share-section">
              <h3>📤 Share Cheapr with Friends</h3>
              <p>Share this link on WhatsApp, Instagram, or anywhere!</p>
              <div className="share-link">
                <span>🔗 cheaprr.vercel.app</span>
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText('https://cheaprr.vercel.app');
                    alert('Link copied! Share it anywhere 🎉');
                  }}
                >
                  Copy Link
                </button>
              </div>
              <div className="share-buttons">
                <a
                  href="https://wa.me/?text=Check%20out%20Cheapr%20-%20Compare%20Amazon%20%26%20Flipkart%20prices%20instantly!%20https://cheaprr.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn whatsapp-btn"
                >
                  📱 Share on WhatsApp
                </a>
                
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20out%20Cheapr%20-%20Compare%20Amazon%20%26%20Flipkart%20prices%20instantly!&url=https://cheaprr.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn twitter-btn"
                >
                  🐦 Share on Twitter
                </a>
              </div>
            </div>

          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Download;