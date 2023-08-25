import { IAddToDo } from '../addTodo/AddTodo';
import { ITodo } from '../formTodo/FormTodos';
import { fetchApi } from '../../api/Api';
import { confirm } from '../../constants/Message';
import TodoItem from '../todoItem/TodoItem';
import { useCallback, useContext } from 'react';
import { LoadingContextType, loadingContext } from '../../context/ContextLoading';


const ListTodos = ({ todos, setTodos }: IAddToDo) => {
    const { setLoading } = useContext<LoadingContextType>(loadingContext);

    const IsCompleted = useCallback(async (id: number) => {
        try {
            let obj = null;
            const newTodos: ITodo[] = todos.map((todo: ITodo) => {
                if (todo.id === id) {
                    const newObj = { ...todo, completed: !todo.completed }
                    obj = newObj;
                    return newObj
                }
                return todo
            })
            if (obj) {
                await fetchApi(`todos/${id}`, 'PUT', obj)
                setTodos(newTodos)
            }
        } catch (error) {
            console.log(error);
        }
        console.log('re-render-com');
    }, [todos, setTodos])

    const deleteTodo = useCallback(async (id: number) => {
        if (confirm()) {
            setLoading(true)
            try {
                await fetchApi(`todos/${id}`, 'DELETE', [])
                const newTodo = todos.filter((todo: { id: number }) => {
                    return todo.id !== id
                })
                setTodos(newTodo)
            } catch (error) {
                console.log(error);

            }
            setLoading(false)
            console.log('re-render-delete');

        }
    }, [setLoading, todos, setTodos])
    return (
        <div>
            {
                todos.map((todo: ITodo) => {
                    console.log(todo)
                    return (

                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            IsCompleted={IsCompleted}
                            deleteTodo={deleteTodo}
                        />
                    )
                })
            }
        </div>
    );
};

export default ListTodos;