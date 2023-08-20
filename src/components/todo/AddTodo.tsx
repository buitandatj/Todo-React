import React, { ChangeEvent, useState } from 'react';
import './AddTodo.scss'

const AddTodo = ({addTodo}:any) => {
    const [todo, setTodo] = useState('')

    const changeInput=(e:  ChangeEvent<HTMLInputElement>)=>{
        setTodo(e.target.value);
        
    }
    console.log(todo);
    const submitTodo =(e:any):void =>{
        if(todo !== ''){
            addTodo(todo)
        }else{
            alert('Vui lòng nhập...')
        }
        e.preventDefault();
        setTodo('')
    }
    return (
        <div>
            <form onSubmit={submitTodo}>
                <input
                    type="text"
                    placeholder="Nhập công việc.."
                    value={todo}
                    onChange={changeInput} />
                <i className="fa-solid fa-chevron-down"></i>
                <button className='btn-add' onClick={submitTodo}>Lưu</button>

            </form>
            {/* <div className='btn-bot'>
                <Button title='ALL' />
                <Button title='ACTIVE' />
                <Button title='COMPLETED' />
                <Button title='CLEAR' />
            </div> */}
        </div>
    );
};

export default AddTodo;