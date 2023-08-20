import { ChangeEvent, useEffect, useState } from 'react';
import './AddTodo.scss';
import Button from '../buttons/Button';
import { FILTER, Todo } from '../listTodos/Todos';
import myAxios from '../../api/Api';

interface IAddToDo {
    addTodo: (todo: string) => void;
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    setFilter: (arg0: FILTER) => void
}
export interface ButtonProps {
    title: string;
    onClick: () => void;
}

const AddTodo = ({ addTodo, todos, setTodos, setFilter }: IAddToDo) => {
    const [todo, setTodo] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)

    useEffect(() => {
        const show = todos.some(todo => todo.completed)
        setShow(show)
    }, [todos])


    const listBtn: ButtonProps[] = [
        {
            title: 'All',
            onClick: () => {
                return setFilter("ALL");
            }
        },
        {
            title: 'Active',
            onClick: () => {
                return setFilter("ACTIVE")
            }
        },
        {
            title: 'Completed',
            onClick: () => {
                return setFilter("COMPLETE")
            }
        },
        {
            title: 'Clear',
            onClick: () => {
                handleClear()
            }
        },
    ]
    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);

    }
    const submitTodo = (e: ChangeEvent<HTMLFormElement>) => {
        if (todo === '') {
            alert('Vui lòng nhập...')
        } else {
            addTodo(todo)
        }
        e.preventDefault();
        setTodo('')

    }

    const handleClear = async () => {

        const newTodo = todos.filter(todo => todo.completed);
        for (let todo of newTodo) {
            await myAxios.delete(`todos/${todo.id}`, {
            });
        }
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos);

    }

    return (
        <div>
            <div>
                <form onSubmit={submitTodo}>
                    <input
                        type="text"
                        placeholder="Nhập công việc.."
                        value={todo}
                        onChange={changeInput} />
                    <i className="fa-solid fa-chevron-down"></i>
                    <button className='btn-add' type='submit'>Lưu</button>


                </form>


            </div>
            <div className='btn-bot'>
                {listBtn.map(btn => (
                    btn.title === 'Clear' && show ?
                        <Button btn={{ ...btn }} /> :
                        btn.title !== 'Clear' && <Button btn={{ ...btn }} />
                ))}

            </div>
        </div>
    );
};

export default AddTodo;