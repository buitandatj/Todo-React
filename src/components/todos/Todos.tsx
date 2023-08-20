/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddTodo from '../todo/AddTodo';
import './Todos.scss';
import axios from 'axios';


interface Todo {
    id: number,
    title: string,
    completed: boolean
}
const Todos = () => {

    const [todos, setTodos] = useState([])
    useEffect(() => {
        const getTodo = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=5`)
                setTodos(res.data)
            } catch (error) {
                console.log(error);

            }

            getTodo();

        }
    }, [])
    const compeleted = (id: number | ChangeEvent<HTMLInputElement>) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id)
                todo.completed = !todo.completed
            return todo
        })
        setTodos(newTodos)

    }
    const addTodo = async (title: Todo[]) => {
        try {
            const res = await axios.post(`https://jsonplaceholder.typicode.com/todos`,
                {
                    id: Math.floor(Math.random() * 99999),
                    title,
                    completed: false
                })
                const newTodo:any = [...todos ,res.data ]
                setTodos(newTodo)
        } catch (error) {
            console.log(error);
        }


    }
    const deleteTodo = async (id: number | ChangeEvent<HTMLButtonElement>) => {
        try {
            const res= await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            const newTodo = todos.filter(todo=>{
                return todo.id !== id
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className='form'>
            <AddTodo addTodo={addTodo} />
            <form className="form-top">
                <ul>
                    {todos.map((todo, index) => {
                        return (
                            <div key={index} className='form-todo'>
                                <input type='checkbox' onChange={() => compeleted(todo.id)} checked={todo.completed} />
                                <li className='list-unstyled'
                                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                >
                                    {todo.title}
                                </li>
                                <button
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