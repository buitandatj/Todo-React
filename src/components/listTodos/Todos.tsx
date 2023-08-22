/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddTodo from '../addTodo/AddTodo';
import './Todos.scss';
import myAxios, { fetchApi } from '../../api/Api';

export interface Todo {
    id: number,
    title: string,
    completed: boolean
}

export type FILTER = "COMPLETE" | "ACTIVE" | "ALL";
const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<FILTER>("ALL");
    useEffect(() => {
        const getTodo = async () => {
            try {
                const params:Todo = {
                    id: 0,
                    title: '',
                    completed: false
                };

                if (filter === "COMPLETE") params.completed = true;
                if (filter === "ACTIVE") params.completed = false;

                const res = await fetchApi({
                    url: 'todos',
                    method: 'get'
                })
                if (filter === "ALL") {
                    setTodos(res)
                } else {
                    const filteredTodos = res.filter((todo: { completed: boolean; }) => todo.completed === params.completed)
                    setTodos(filteredTodos)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTodo()
    }, [filter])

    const addTodo = async (title: string) => {
        try {
            const res = await myAxios.post('todos',
            {
                id: Math.floor(Math.random() * 999),
                title,
                completed: false
            })
            const newTodo: Todo[] = [...todos, res.data]
            setTodos(newTodo)
        } catch (error) {
            console.log(error);
        }
        console.log('re-render-add');

    }
    const deleteTodo = async (id: number) => {
        if (window.confirm('bạn có muốn xóa?')) {
            try {
                await fetchApi({
                    url: `todos/${id}`,
                    method: "delete"
                })
                const newTodo = todos.filter((todo: { id: number }) => {
                    return todo.id !== id
                })
                setTodos(newTodo)
            } catch (error) {
                console.log(error);

            }
            console.log('re-render-delete');

        }
    }

    const checkAll = async () => {
        try {
            const newTodos: Todo[] = todos.map((todo: Todo) => {
                return { ...todo, completed: !todo.completed };
            });
            await Promise.resolve(newTodos.map(async (todo) => {
                await fetchApi({
                    url: `todos/${todo.id}`,
                    body: todo,
                    method: "put"
                });
            }));
            setTodos(newTodos);
        } catch (error) {
            console.log(error);
        }
        console.log('re-render-checkkALL');
    }


    const compeleted = async (id: number) => {
        try {
            let obj = null;
            const newTodos: Todo[] = todos.map((todo: Todo) => {
                if (todo.id === id) {
                    const newObj = { ...todo, completed: !todo.completed }
                    obj = newObj;
                    return newObj
                }
                return todo
            })
            if (obj) {
                await fetchApi({
                    url: `todos/${id}`,
                    body: obj,
                    method: "put"
                })
                setTodos(newTodos)
            }
        } catch (error) {
            console.log(error);
        }
        console.log('re-render-com');
    }



    console.log(todos)

    return (
        <div className='form'>

            <AddTodo addTodo={addTodo} todos={todos} setTodos={setTodos} setFilter={setFilter} />
            <button onClick={() => checkAll()} type='button' className='btn_checkAll'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg></button>

            <form className="form-top">
                <ul>
                    {todos?.map((todo: Todo,
                        index: number) => {
                        console.log(todo)


                        return (
                            <div key={index} className='form-todo'>
                                <input type='checkbox' onChange={() => compeleted(todo.id)} checked={todo.completed} />
                                <li className='list-unstyled'
                                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                >
                                    <h5 style={{ color: 'white' }}>{todo.title}</h5>
                                </li>
                                <button
                                    className='delete'
                                    type="button"
                                    onClick={() => deleteTodo(todo.id)}>
                                    Xóa
                                </button>
                            </div>
                        )
                    })}
                </ul>
            </form>
        </div>


    );
};

export default Todos;