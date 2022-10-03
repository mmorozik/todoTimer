import React, { useState, useEffect, createRef } from 'react'

const EditTaskForm = (props) => {
  const ref = createRef()
  const [value, setValue] = useState('')
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    props.editTask(value)
  }
  const blur = () => {
    props.editTask(value)
  }

  useEffect(() => {
    const { label } = props
    setValue(label)
    ref.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <input ref={ref} type="text" className="edit" value={value} onChange={handleChange} onBlur={blur} />
    </form>
  )
}

export default EditTaskForm
