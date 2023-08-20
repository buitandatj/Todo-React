import React from 'react';
import './App.scss'
import Header from './components/header/Header';
import Todos from './components/todos/Todos';

function App() {
  return (
    <div className='App'>
      <Header />
      <Todos />
    </div>
  );
}

export default App;
