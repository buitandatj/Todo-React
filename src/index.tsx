import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './components/pages/Pages';
import App from './App';
import {LoadingProvider} from './context/ContextLoading';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LoadingProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages />} /> 
        <Route path="/App" element={<App />} />
      </Routes>
    </BrowserRouter>
  </LoadingProvider>

);
reportWebVitals();
