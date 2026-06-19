import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: '#f1f3f6',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ 
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px' }}>⚠️</div>
            <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Something went wrong</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Please refresh the page</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 24px',
                background: '#2874f0',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;