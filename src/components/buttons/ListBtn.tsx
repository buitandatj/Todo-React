import React, { useMemo, useCallback } from 'react';
import { ButtonProps } from './Button';
import Button from './Button';
import { FILTER, ITodo } from '../../App';
import { fetchApi } from '../../api/Api';
interface IListBtn {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
    setFilter: (arg0: FILTER) => void;
    // title:string;
}
const ListBtn = ({ setFilter, setTodos, todos}: IListBtn) => {

    const show = useMemo(() => todos?.some(todo => todo.completed), [todos]);
    console.log('listBtn');
    const handleClear = useCallback(async () => {
        const newTodo = todos.filter(todo => todo.completed);
        for (let todo of newTodo) {
            await fetchApi(`todos/${todo.id}`, 'DELETE');
        }
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos);
    }, [setTodos, todos])
    const listBtn: ButtonProps[] = useMemo(() => [
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
    ], []);
    return (
        <div className='btn-bot'>
            {listBtn?.map((btn,index) => (
                btn.title === 'Clear' && show ?
                    <Button {...btn} onClick={handleClear} key={index}/> :
                    btn.title !== 'Clear' && <Button {...btn} />
            ))}

        </div>
    );
};

export default ListBtn;