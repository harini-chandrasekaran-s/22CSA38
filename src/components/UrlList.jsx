import React from 'react';
import UrlItem from './UrlItem';

const UrlList = ({ urls, onDelete, onIncrementClicks }) => {
  if (urls.length === 0) {
    return (
      <div className="url-list-empty">
        <p>No shortened URLs yet. Enter a URL above to get started!</p>
      </div>
    );
  }

  return (
    <div className="url-list">
      <h2>Your Shortened URLs</h2>
      <div className="url-items">
        {urls.map(url => (
          <UrlItem
            key={url.id}
            url={url}
            onDelete={onDelete}
            onIncrementClicks={onIncrementClicks}
          />
        ))}
      </div>
    </div>
  );
};

export default UrlList;