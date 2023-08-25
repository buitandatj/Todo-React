import { ITodo } from '../formTodo/FormTodos';
import { LoadingContextType, loadingContext } from '../../context/ContextLoading';
import { useContext, memo} from 'react';
interface ITodoItem {
    todo: ITodo;
    IsCompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
}
const TodoItem = ({ todo, IsCompleted, deleteTodo }: ITodoItem) => {
    const { loading } = useContext<LoadingContextType>(loadingContext);
    console.log(loading)
    return (

            <div className="form-todo">
                <input
                    type="checkbox"
                    onChange={() => IsCompleted(todo.id)}
                    checked={todo.completed}
                />
                <li
                    className="list-unstyled"
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                    <h5 style={{ color: 'white' }}>{todo.title}</h5>
                </li>
                <button className="delete" type="button" onClick={() => deleteTodo(todo.id)}>
                    Xóa
                </button>
            </div>
    );
};

export default memo(TodoItem); 