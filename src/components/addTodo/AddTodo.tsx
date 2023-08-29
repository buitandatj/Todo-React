import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import './AddTodo.scss';
import Button from '../buttons/Button';
import { FILTER, ITodo } from '../formTodo/FormTodos';
import { fetchApi } from '../../api/Api';
import { alertInput } from '../../constants/Message';
import '../todoItem/TodoItem.scss'
export interface IAddToDo {
    addTodo: (todo: string) => void;
    todos: ITodo[];
    setTodos: (todos: ITodo[]) => void;
    setFilter: (arg0: FILTER) => void;
    loader: boolean;
    setLoader: (value: boolean) => void;
}
export interface ButtonProps {
    title: string;
    onClick: () => void;
}

const AddTodo = ({ addTodo, todos, setTodos, setFilter, loader, setLoader }: IAddToDo) => {
    const [todo, setTodo] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)
    // const [loading, setLoading] = useState<boolean>(false);

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

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo === '') {
            alertInput()
        } else {
            setLoader(true)
            await addTodo(todo);
            setTodo('');
        }
        setLoader(false);
    };

    const handleClear = useCallback(async () => {
        const newTodo = todos.filter(todo => todo.completed);
        for (let todo of newTodo) {
            await fetchApi(`todos/${todo.id}`, 'DELETE', []);
        }
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos);
    }
        , [todos, setTodos])
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
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

export default memo(AddTodo);