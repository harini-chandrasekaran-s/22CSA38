import React, { useState } from 'react';

const UrlItem = ({ url, onDelete, onIncrementClicks }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShortUrlClick = () => {
    onIncrementClicks(url.id);
    window.open(url.originalUrl, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="url-item">
      <div className="url-content">
        <div className="url-details">
          <div className="original-url">
            <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
              {url.originalUrl.length > 50 
                ? `${url.originalUrl.substring(0, 50)}...` 
                : url.originalUrl
              }
            </a>
          </div>
          <div className="short-url">
            <a 
              href={url.shortUrl} 
              onClick={handleShortUrlClick}
              target="_blank" 
              rel="noopener noreferrer"
            >
              {url.shortUrl}
            </a>
          </div>
          <div className="url-stats">
            <span className="clicks">{url.clicks} clicks</span>
            <span className="date">Created: {formatDate(url.date)}</span>
          </div>
        </div>
        <div className="url-actions">
          <button 
            onClick={handleCopy} 
            className={`copy-btn ${copied ? 'copied' : ''}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button 
            onClick={() => onDelete(url.id)} 
            className="delete-btn"
            aria-label="Delete URL"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlItem;