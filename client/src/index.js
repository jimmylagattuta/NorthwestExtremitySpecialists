// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Update import statement
import './index.css';
import App from './App';
import { CsrfTokenProvider } from './components/CsrfTokenContext';

const rootElement = document.getElementById('root');

createRoot(rootElement).render( // Update usage
  <React.StrictMode>
    <BrowserRouter>
      <CsrfTokenProvider>
        <App />
      </CsrfTokenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
