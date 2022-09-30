import React from 'react'
// import { formatDistanceToNow } from 'date-fns'
// import PropTypes from 'prop-types'

import EditTaskForm from '../EditTaskForm/EditTaskForm'
import TaskTimer from '../TaskTimer'

const Task = (props) => {
  const {
    label,
    edit,
    timeComplited,
    deleteTask,
    editTask,
    onEdit,
    doneTask,
    timeToNow,
    timeCreate,
    setNewTimeComplited,
  } = props
  const task = (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="title" onClick={doneTask}>
          {label}
        </span>
        <TaskTimer
          timeComplited={timeComplited}
          timeCreate={timeCreate}
          setNewTimeComplited={(value) => setNewTimeComplited(value)}
        />
        <span className="description time">{timeToNow}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit} />
      <button className="icon icon-destroy" onClick={deleteTask} />
    </div>
  )
  return edit ? <EditTaskForm label={label} editTask={editTask} /> : task
}

export default Task

// Task.defaultProps = {
//   label: 'Not a label',
//   dateNow: new Date(),
// }

// Task.propTypes = {
//   label: PropTypes.string,
//   onDeleted: PropTypes.func.isRequired,
//   onComplited: PropTypes.func.isRequired,
// }
