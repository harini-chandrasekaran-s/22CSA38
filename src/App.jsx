import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to shorten a URL
  const shortenUrl = async (originalUrl) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const shortUrl = generateShortUrl();
      
      const newUrl = {
        id: Date.now(),
        originalUrl,
        shortUrl,
        clicks: 0,
        date: new Date().toISOString()
      };
      
      setUrls(prev => [newUrl, ...prev]);
      return newUrl;
    } catch (error) {
      console.error('Error shortening URL:', error);
      throw new Error('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };
  const generateShortUrl = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `https://short.url/${result}`;
  };


  const deleteUrl = (id) => {
    setUrls(prev => prev.filter(url => url.id !== id));
  };


  const incrementClicks = (id) => {
    setUrls(prev => 
      prev.map(url => 
        url.id === id ? { ...url, clicks: url.clicks + 1 } : url
      )
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>URL Shortener</h1>
        <p>Shorten your long URLs quickly and easily</p>
      </header>
      
      <main className="app-main">
        <UrlForm onShorten={shortenUrl} loading={loading} />
        <UrlList 
          urls={urls} 
          onDelete={deleteUrl} 
          onIncrementClicks={incrementClicks}
        />
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;