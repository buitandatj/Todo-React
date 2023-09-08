import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './components/pages/Home';
import App from './App';
import { LoadingProvider } from './context/ContextLoading';
import Blog from './components/pages/Blog';
import Info from './components/pages/Info';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LoadingProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/App" element={<App />} />
        <Route path='/blog' element={<Blog />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  </LoadingProvider>

);
reportWebVitals();
