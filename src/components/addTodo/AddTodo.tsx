import { memo } from 'react';
import './style.scss';
import { ITodo } from '../../App';
import { alertInput } from '../../constants/id';
import '../todoItem/style.scss'
import InputTodo from './InputTodo';
import React from 'react';
import { randomId } from '../../constants/id';
import myAxios from '../../api/Api';


export interface IAddToDo {
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
    setLoader: (value: boolean) => void;

}
const AddTodo = ({ setTodos, setLoader }: IAddToDo) => {
    console.log('AddTodo');

    const addTodo = async (title: string) => {
        try {
            const res = await myAxios.post('todos',
                {
                    id: randomId(),
                    title,
                    completed: false
                })
            const data: ITodo = res.data
            setTodos((prev: ITodo[]) => ([...prev, data]))
        } catch (error) {
            console.log(error);
        }


    }
    const handleSubmit = async (todo = '', callback: () => void | undefined) => {

        if (todo === '') {
            alertInput()
        } else {
            setLoader(true)
            await addTodo(todo);
            callback()
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
};

export default memo(AddTodo);