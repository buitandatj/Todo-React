/* eslint-disable array-callback-return */
import { Link } from 'react-router-dom';
import './App.scss'
import { fetchApi } from './api/Api';
import AddTodo from './components/addTodo/AddTodo';
import ListBtn from './components/buttons/ListBtn';
import Header from './components/header/Header';
import ListTodos from './components/listTodos/ListTodos';
import { Loading } from './components/loading/Loading';
import { LoadingContextType, loadingContext } from './context/ContextLoading';
import { useState, useEffect, useContext } from 'react';
export interface ITodo {
  id: number,
  title: string,
  completed: boolean
}
export type FILTER = "COMPLETE" | "ACTIVE" | "ALL";
function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<FILTER>("ALL");
  const [loader, setLoader] = useState<boolean>(false)
  console.log('App')
  const { loading, setLoading } = useContext<LoadingContextType>(loadingContext);
  useEffect(() => {
    const getTodo = async () => {
      setLoading(true)
      try {
        const res: ITodo[] = await fetchApi('todos', 'GET')

        if (filter === "ALL") {
          setTodos(res);
        } else {
          const newTodo = res.filter(
            (todo) => {
              if (filter === "COMPLETE") {
                return todo.completed === true
              } else if (filter === "ACTIVE") {
                return todo.completed === false
              }
            }
          );
          setTodos(newTodo);

        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }

    getTodo()
  }, [filter, setLoading])
  const checkAll = async () => {
    try {
      const newTodos: ITodo[] = todos?.map((todo: ITodo) => {
        return { ...todo, completed: !todos.every(todo => todo.completed) };
      });
      await Promise.resolve(newTodos?.map(async (todo) => {
        await fetchApi(`todos/${todo.id}`, 'PUT', todo);
      }));
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className='App'>
        <Header />
        <Link to='/'  className='btn-exit'>
          <p>Exit</p>
        </Link>
        <div className='form'>
          <AddTodo setTodos={setTodos} setLoader={setLoader} />
          <button onClick={() => checkAll()} type='button' className='btn_checkAll'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>

          <div className="form-top">
            {loading ? <Loading /> :
              <ul>
                <ListTodos todos={todos} setTodos={setTodos} loader={loader} />
              </ul>
            }
          </div>
          <div>
            <ListBtn setFilter={setFilter} setTodos={setTodos} todos={todos} />
          </div>
        </div>

      </div>
    </>

  );
}

export default App;
