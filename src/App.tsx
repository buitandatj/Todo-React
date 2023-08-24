import './App.css'
import Header from './components/header/Header';
import Todos from './components/formTodo/FormTodos';
import { LoadingProvider } from './context/ContextLoading';

function App() {
  return (
    <LoadingProvider >
      <div className='App'>
        <Header />
        <Todos />
      </div>
    </LoadingProvider>

  );
}

export default App;
