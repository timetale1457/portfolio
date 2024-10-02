import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login/login';
import { changeLanguage } from 'i18next';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <button onClick={() => changeLanguage('en')}>English</button>
     <button onClick={() => changeLanguage('ko')}>한국어</button>
    <Login />
  </React.StrictMode>
);