import { ITodo } from '../../App';
import { memo, useState } from 'react';
import './TodoItem.scss'
interface ITodoItem extends ITodo {
    IsCompleted: (id: number, body: ITodo) => void;
    deleteTodo: (id: number) => void;
}
const TodoItem = ({ completed, id, title, IsCompleted, deleteTodo }: ITodoItem) => {
    const [load, setLoad] = useState(false)
    console.log('ItemTodo');

    const handleDelete = async () => {
        setLoad(true)
        await deleteTodo(id)
        setLoad(false)
    }
    const handleIsComplete = () => {
        completed = !completed;
        IsCompleted(id, { completed, id, title });
    }

    return (
        <div className="form-todo">
            <input
                type="checkbox"
                onChange={handleIsComplete}
                checked={completed}
            />
            <li
                className="list-unstyled"
                style={{ textDecoration: completed ? 'line-through' : 'none' }}
            >
                <h5 style={{ color: 'white' }}>{title}</h5>
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