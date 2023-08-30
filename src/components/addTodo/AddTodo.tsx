import { useCallback } from 'react';
import './AddTodo.scss';
import { ITodo } from '../../App';
import { alertInput } from '../../constants/Message';
import '../todoItem/TodoItem.scss'
import InputTodo from './InputTodo';
import React from 'react';
import { myId } from '../../constants/Id';
import myAxios from '../../api/Api';


export interface IAddToDo {
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
    setLoader: (value: boolean) => void;

}
const AddTodo = React.memo(({ setTodos, setLoader }: IAddToDo) => {
    console.log('AddTodo');

    const addTodo = useCallback(async (title: string) => {
        try {
            const res = await myAxios.post('todos',
                {
                    id: myId(),
                    title,
                    completed: false
                })
            const data: ITodo = res.data
            setTodos((prev: ITodo[]) => ([...prev, data]))
        } catch (error) {
            console.log(error);
        }


    }, [setTodos])
    const handleSubmit = async (todo = '', callback: () => void | undefined) => {

        if (todo === '') {
            alertInput()
        } else {
            setLoader(true)
            await addTodo(todo);
            callback && callback()
        }
        setLoader(false);
    };



    return (
        <div>
            <div>
                <InputTodo handleSubmit={handleSubmit} />
            </div>
           


        </div>
    );
})

export default React.memo(AddTodo);