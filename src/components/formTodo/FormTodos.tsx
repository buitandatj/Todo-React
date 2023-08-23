import { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddTodo from '../addTodo/AddTodo';
import './Todos.scss';
import myAxios, { fetchApi } from '../../api/Api';
import ListTodos from '../listTodos/ListTodos';
import { Loading } from '../loading/Loading';
import { LoadingContextType, loadingContext } from '../../context/ContextLoading';
export interface ITodo {
    id: number,
    title: string,
    completed: boolean
}

export type FILTER = "COMPLETE" | "ACTIVE" | "ALL";
const Todos = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [filter, setFilter] = useState<FILTER>("ALL");
    
    const { loading, setLoading } = useContext<LoadingContextType | null >(loadingContext)!;
    
    useEffect(() => {
        const getTodo = async () => {
            try {
                const params: ITodo = {
                    id: 0,
                    title: "",
                    completed: false,
                };

                switch (filter) {
                    case "COMPLETE":
                        params.completed = true;
                        break;
                    case "ACTIVE":
                        params.completed = false;
                        break;
                    default:
                        break;
                }

                const res = await fetchApi('todos', 'GET', [])

                if (filter === "ALL") {
                    setTodos(res);
                } else {
                    const newTodo = res.filter(
                        (todo: { completed: boolean }) => todo.completed === params.completed
                    );
                    setTodos(newTodo);

                }
            } catch (error) {
                console.log(error);
            }
        }

        getTodo()
        setLoading(false)
    }, [filter, setLoading])

    const addTodo = async (title: string) => {
        try {
            const res = await myAxios.post('todos',
                {
                    id: Math.floor(Math.random() * 999),
                    title,
                    completed: false
                })
            const newTodo: ITodo[] = [...todos, res.data]
            setTodos(newTodo)
        } catch (error) {
            console.log(error);
        }
        console.log('re-render-add');

    }


    const checkAll = async () => {
        try {

            const newTodos: ITodo[] = todos.map((todo: ITodo) => {
                return { ...todo, completed: !todo.completed };

            });

            await Promise.resolve(newTodos.map(async (todo) => {
                await fetchApi(`todos/${todo.id}`, 'PUT', []);
            }));
            setTodos(newTodos);
        } catch (error) {
            console.log(error);
        }
        console.log('re-render-checkkALL');
    }

    return (
        <div className='form'>
            <AddTodo addTodo={addTodo} todos={todos} setTodos={setTodos} setFilter={setFilter} />
            <button onClick={() => checkAll()} type='button' className='btn_checkAll'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>

            <form className="form-top">
                {loading ? <Loading />
                    :
                    <ul>
                        <ListTodos todos={todos} setTodos={setTodos} addTodo={function (todo: string): void {
                            throw new Error('Function not implemented.');
                        }} setFilter={function (arg0: FILTER): void {
                            throw new Error('Function not implemented.');
                        }} />
                    </ul>
                }
            </form>
        </div>


    );
};

export default Todos;