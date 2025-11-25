import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../../../../server/redux/slices/taskSlice'

export default function Settings() {

  const task = useSelector((state) => state.task.value)
  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(addTask())
  }
  const handleDecrement = () => {
    dispatch(editTask())
  }
  return (
    <>

      <button onClick={handleIncrement}>Increment</button>
      <p>Count = {task}</p>
      <button onClick={handleDecrement}>Decrement</button>
    </>
  )
}
