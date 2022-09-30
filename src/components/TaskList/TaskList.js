import React from 'react'
// import PropTypes from 'prop-types'

import './TaskList.css'

import Task from '../Task'

const TaskList = (props) => {
  const { todoData, deleteTask, editTask, onEdit, doneTask, setNewTimeComplited } = props
  const taskList = todoData.map(({ done, edit, label, key, timeComplited, timeToNow, timeCreate }) => {
    let className = ''
    if (done) {
      className = 'completed'
    }
    if (edit) {
      className = 'editing'
    }
    return (
      <li key={key} className={className}>
        <Task
          label={label}
          edit={edit}
          done={done}
          timeToNow={timeToNow}
          timeComplited={timeComplited}
          timeCreate={timeCreate}
          deleteTask={() => deleteTask(key)}
          editTask={(value) => editTask(key, value)}
          onEdit={() => onEdit(key)}
          doneTask={() => doneTask(key)}
          setNewTimeComplited={(value) => setNewTimeComplited(key, value)}
        />
      </li>
    )
  })
  return <ul className="todo-list">{taskList}</ul>
}

export default TaskList

// Task.defaultProps = {
//   viewList: 'All',
// }

// TaskList.propTypes = {
//   todos: PropTypes.arrayOf(PropTypes.object),
//   onDeleted: PropTypes.func.isRequired,
//   onComplited: PropTypes.func.isRequired,
//   viewList: PropTypes.string,
// }
