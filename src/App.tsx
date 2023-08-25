import './App.css'
import Header from './components/header/Header';
import { LoadingProvider } from './context/ContextLoading';
import Todos from './components/formTodo/FormTodos';

function App() {
  return (
    <LoadingProvider>
        <div className='App'>
          <Header />
          <Todos />
        </div>
    </LoadingProvider>

  );
}

export default App;
