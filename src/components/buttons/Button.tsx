import { memo } from 'react';
import { ButtonProps } from '../addTodo/AddTodo';
import './Button.scss'


const Button = ({ btn }: { btn: ButtonProps }) => {
    console.log('button');
    
    return (
        <button className='button' onClick={btn.onClick}>
            {btn.title}
        </button>
    );
};

export default memo(Button);