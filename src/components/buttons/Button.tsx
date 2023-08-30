import { memo } from 'react';
import './Button.scss';

export interface ButtonProps {
    title: string;
    onClick: () => void;
}
const Button = ({ title,onClick }: ButtonProps ) => {
    console.log('button');
    return (
        <button  className='button' onClick={onClick}>
            {title}
        </button>
    );
};

export default memo(Button);