import { ITodo } from '../formTodo/FormTodos';
import { memo, useState } from 'react';
import './TodoItem.scss'
interface ITodoItem {
    todo: ITodo;
    IsCompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
}
const TodoItem = ({ todo, IsCompleted, deleteTodo }: ITodoItem) => {
    const [load, setLoad] = useState(false)

    const handleDelete = async () => {
        setLoad(true)
        await deleteTodo(todo.id)
        setLoad(false)
    }
    const handleIsComplete = () => {
        IsCompleted(todo.id)
    }

    return (
        <div className="form-todo">
            <input
                type="checkbox"
                onChange={handleIsComplete}
                checked={todo.completed}
            />
            <li
                className="list-unstyled"
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
                <h5 style={{ color: 'white' }}>{todo.title}</h5>
            </li>
            {load ? (
                <div className='load'></div>
            ) : (
                <button className="delete" type="button" onClick={handleDelete}>
                    Xóa
                </button>
            )}
        </div>
    );
};

export default memo(TodoItem); 