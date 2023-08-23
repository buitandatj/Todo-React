import './App.css'
import Header from './components/header/Header';
import Todos from './components/formTodo/FormTodos';
import {  loadingContext } from './context/ContextLoading';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <loadingContext.Provider value={{loading,setLoading}} >
      <div className='App'>
        <Header />
        <Todos />
      </div>
    </loadingContext.Provider>

  );
}

export default App;
