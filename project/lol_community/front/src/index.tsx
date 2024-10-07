import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login/login';
import Header from './components/header/header'
import { changeLanguage } from 'i18next';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header/>
    <Login />
  </React.StrictMode>
);