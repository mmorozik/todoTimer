import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'
const NewTaskForm = (props) => {
  const [newTask, setNewTask] = useState({ label: '', min: '', sec: '' })
  const onLabelChange = (event) => {
    const name = event.target.name
    setNewTask((task) => ({ ...task, [name]: event.target.value }))
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const { label, min, sec } = newTask
    const time = +min * 60 + +sec
    if (label !== '') props.addTask(label, time)
    setNewTask({ label: '', min: '', sec: '' })
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        name="label"
        className="new-todo"
        type="text"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        autoFocus
        value={newTask.label}
      />
      <input
        name="min"
        className="new-todo-form__timer"
        type="number"
        onChange={onLabelChange}
        placeholder="Min"
        value={newTask.min}
      />
      <input
        name="sec"
        className="new-todo-form__timer"
        type="number"
        onChange={onLabelChange}
        placeholder="Sec"
        value={newTask.sec}
      />
      <input className="sub-btn" type="submit" />
    </form>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm
