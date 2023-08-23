import { IAddToDo } from '../addTodo/AddTodo';
import { ITodo } from '../formTodo/FormTodos';
import { fetchApi } from '../../api/Api';
import { confirm } from '../../constants/Message';
import TodoItem from '../todoItem/TodoItem';
import { useState } from 'react';


const ListTodos = ({ todos, setTodos }: IAddToDo) => {
    const [loading, setLoading] = useState<boolean>(true)

    const Iscompleted = async (id: number) => {
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
    }
    const deleteTodo = async (id: number) => {
        if (confirm()) {
            try {
                await fetchApi(`todos/${id}`, 'DELETE', [])
                const newTodo = todos.filter((todo: { id: number }) => {
                    return todo.id !== id
                })
                setLoading(false)
                setTodos(newTodo)
            } catch (error) {
                console.log(error);
                setLoading(true)

            }
            console.log('re-render-delete');

        }
    }
    return (
        <div>
            {
                todos?.map((todo: ITodo) => {
                    console.log(todo)
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            Iscompleted={Iscompleted}
                            deleteTodo={deleteTodo}
                        />
                    )
                })
            }
        </div>
    );
};

export default ListTodos;