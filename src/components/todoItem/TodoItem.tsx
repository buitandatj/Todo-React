import { ITodo } from '../formTodo/FormTodos';
// import { Loading } from '../loading/Loading';
// import { LoadingContextType, loadingContext } from '../../context/ContextLoading';
// import { useContext } from 'react';
interface ITodoItem {
    todo: ITodo;
    Iscompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
}
const TodoItem = ({ todo, Iscompleted, deleteTodo }: ITodoItem) => {
    // const { loading } = useContext<LoadingContextType | any>(loadingContext)
    return (
            <div className="form-todo">
                <input
                    type="checkbox"
                    onChange={() => Iscompleted(todo.id)}
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

export default TodoItem;