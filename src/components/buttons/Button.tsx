import './Button.scss'
const Button = (title:string | any) => {
    
    return (
        <button className='button'>
            {title.title}
        </button>
    );
};

export default Button;