import './App.css'
import Header from './components/header/Header';
import Todos from './components/listTodos/Todos';

function App() {
  return (
    <div className='App'>
      <Header />
      <Todos />
    </div>
  );
}

export default App;
