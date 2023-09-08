import { ITodo } from '../../App';
import { fetchApi } from '../../api/Api';
import { confirm } from '../../constants/id';
import TodoItem from '../todoItem/TodoItem';
import { useCallback } from 'react';
import './style.scss'

interface IListType {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
    loader: boolean
}
const ListTodos = ({ todos, setTodos, loader }: IListType) => {
    console.log('ListTodo');

    const IsCompleted = useCallback(async (id: number, body: ITodo) => {
        try {
            if (body) {
                await fetchApi(`todos/${id}`, 'PUT', body)
                setTodos((e) => e.map((todo: ITodo) => {
                    if (todo.id === id) {
                        return body
                    }
                    return todo
                }))
            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    const deleteTodo = useCallback(async (id: number) => {
        if (confirm()) {
            try {
                await fetchApi(`todos/${id}`, 'DELETE')
                setTodos(p => p.filter((todo: { id: number }) => {
                    return todo.id !== id
                }))
            } catch (error) {
                console.log(error);

            }
        }
    }, [])

    return (
        <div>
            {
                todos?.map((todo: ITodo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            id={todo.id}
                            IsCompleted={IsCompleted}
                            deleteTodo={deleteTodo} />
                    )

                })
            }
            {loader ? <div className='load-add'></div> : ''}
        </div>
    );
};

export default ListTodos;