import React, { useState } from 'react';
import { Send, Copy, Download, RefreshCw } from 'lucide-react';
import { reviewCode } from '../services/api.jsx';

const CodeReviewer = () => {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter some code to review');
      return;
    }

    setLoading(true);
    setError('');
    setReview('');

    try {
      const result = await reviewCode(code);
      setReview(result);
    } catch (err) {
      setError('Failed to review code. Please check your connection and try again.');
      console.error('Review error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleCopyReview = () => {
    navigator.clipboard.writeText(review);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReview = () => {
    const blob = new Blob([review], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-review.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode('');
    setReview('');
    setError('');
  };

  const formatReviewContent = (reviewText) => {
    // Split the review into sections
    const sections = reviewText.split(/##\s+/);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;
      
      const lines = section.split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      
      // Determine section type for styling
      let sectionClass = 'review-section';
      let icon = '📋';
      
      if (title.includes('Analysis Summary')) {
        sectionClass = 'review-section summary';
        icon = '🔍';
      } else if (title.includes('Issues Found')) {
        sectionClass = 'review-section issues';
        icon = '❌';
      } else if (title.includes('Corrected Code')) {
        sectionClass = 'review-section corrected-code';
        icon = '✅';
      } else if (title.includes('Improvements Made')) {
        sectionClass = 'review-section improvements';
        icon = '💡';
      } else if (title.includes('Additional Recommendations')) {
        sectionClass = 'review-section recommendations';
        icon = '🚀';
      } else if (title.includes('Code Quality Score')) {
        sectionClass = 'review-section score';
        icon = '📊';
      }
      
      return (
        <div key={index} className={sectionClass}>
          <h4 className="section-title">
            <span className="section-icon">{icon}</span>
            {title.replace(/[*]/g, '')}
          </h4>
          <div className="section-content">
            {content.includes('```') ? (
              <div className="code-block-enhanced">
                <pre><code>{content}</code></pre>
              </div>
            ) : (
              <div className="text-content" dangerouslySetInnerHTML={{ 
                __html: content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            )}
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  return (
      <div className="container">
        <div className="card fade-in">
          <div className="header-section">
            <div className="animated-logo">
              <div className="robot-icon">🤖</div>
              <div className="code-symbols">
                <span className="symbol">{'</>'}</span>
                <span className="symbol">{'{}'}</span>
                <span className="symbol">{'[]'}</span>
              </div>
            </div>
            <h1 className="main-title">AI Code Reviewer</h1>
            <p className="subtitle">
              Get instant AI-powered code reviews with suggestions for improvements, 
              best practices, and potential issues.
            </p>
            <div className="branding-info">
              <div className="features">
                <span className="feature-tag">✨ Smart Analysis</span>
                <span className="feature-tag">🔧 Code Fixes</span>
                <span className="feature-tag">🚀 Best Practices</span>
              </div>
            </div>
          </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code" className="form-label">
              📝 Enter your code to review:
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                id="code"
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={12}
              />
              {code && (
                <button
                  type="button"
                  onClick={handleCopyCode}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Copy size={12} />
                  Copy
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !code.trim()}
            >
              {loading ? (
                <>
                  <RefreshCw className="loading" size={16} />
                  Reviewing...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Review Code
                </>
              )}
            </button>

            {code && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleDownloadCode}
              >
                <Download size={16} />
                Download Code
              </button>
            )}

            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-error fade-in">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div className="loading-section fade-in">
            <div className="loading-animation">
              <div className="ai-brain">
                <div className="brain-pulse"></div>
                <div className="neural-network">
                  <div className="neuron"></div>
                  <div className="neuron"></div>
                  <div className="neuron"></div>
                  <div className="neuron"></div>
                </div>
              </div>
            </div>
            <div className="loading-text">
              <h3>🧠 AI is analyzing your code...</h3>
              <p>Our advanced AI is examining every line for improvements, bugs, and best practices</p>
              <div className="loading-steps">
                <div className="step active">📝 Parsing code structure</div>
                <div className="step active">🔍 Identifying issues</div>
                <div className="step">💡 Generating improvements</div>
                <div className="step">✅ Creating corrections</div>
              </div>
            </div>
          </div>
        )}

        {review && (
          <div className="code-review-result fade-in">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px',
              borderBottom: '2px solid #e9ecef',
              paddingBottom: '12px'
            }}>
              <h3>🔍 AI Code Review Results</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={handleCopyReview}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  <Copy size={12} />
                  Copy Review
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleDownloadReview}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  <Download size={12} />
                  Download
                </button>
              </div>
            </div>
            <div className="enhanced-review-content">
              {formatReviewContent(review)}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🤖 AI Code Reviewer</h4>
            <p>Advanced AI-powered code analysis and improvement suggestions</p>
          </div>
          
          <div className="footer-section">
            <h5>Features</h5>
            <ul>
              <li>✨ Smart Code Analysis</li>
              <li>🔧 Automatic Fixes</li>
              <li>🚀 Best Practices</li>
              <li>📊 Quality Scoring</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Support</h5>
            <ul>
              <li>📧 Contact Support</li>
              <li>📖 Documentation</li>
              <li>🐛 Report Issues</li>
              <li>💡 Feature Requests</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Connect</h5>
            <div className="social-links">
              <span className="social-link" onClick={() => window.open("https://github.com/Darshanraval2", "_blank")}>🐙 GitHub</span>
              <span className="social-link">🐦 Twitter</span>
              <span className="social-link" onClick={()=> window.open("https://www.linkedin.com/in/darshanraval-6674-git/")}>💼 LinkedIn</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <span>© 2025 AI Code Reviewer. Made with ❤️ for developers.</span>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CodeReviewer;
