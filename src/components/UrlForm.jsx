import React, { useState } from 'react';

const UrlForm = ({ onShorten, loading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    try {

      new URL(url);
      return true;
    } catch (error) {

      const pattern = /^([\da-z.-]+)\.([a-z.]{2,63})([/\w .-]*)*\/?(\?[&\w\-=]*)?(#[\w\-]*)?$/i;
      return pattern.test(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    let processedUrl = url.trim();
    
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = `https://${processedUrl}`;
    }
  
    if (!validateUrl(processedUrl)) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }
    
    try {
      await onShorten(processedUrl);
      setUrl('');
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Shortening error:', error);
    }
  };

  return (
    <div className="url-form-container">
      <form onSubmit={handleSubmit} className="url-form">
        <div className="input-group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here (e.g., example.com)"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default UrlForm;