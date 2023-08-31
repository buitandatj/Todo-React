import React, { ChangeEvent, memo, useState } from 'react'

interface InputTodoProps {
  handleSubmit: (todo: string, callback: () => void | undefined) => void;
}
const InputTodo = ({ handleSubmit }: InputTodoProps) => {
  console.log('inputTodo');
  
  const [todo, setTodo] = useState<string>('');
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);

  }
  const handle = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(todo, () => {
      setTodo('')
    })

  }

  return (
    <form onSubmit={handle}>
      <input
        type="text"
        placeholder="Nhập công việc.."
        value={todo}
        onChange={changeInput} />
      <i className="fa-solid fa-chevron-down"></i>
      <button className='btn-add' type='submit'>Lưu</button>
    </form>
  )
}

export default memo(InputTodo)