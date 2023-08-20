import { ButtonProps } from '../addTodo/AddTodo';
import './Button.scss'


const Button = ({ btn }: { btn: ButtonProps }) => {

    return (
        <button className='button' onClick={btn.onClick}>
            {btn.title}
        </button>
    );
};

export default Button;