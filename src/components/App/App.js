import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './App.css'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

let key = 100

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const toggle = (todoData, key, toggleName) => {
    return todoData.map((el) => (el.key === key ? { ...el, [toggleName]: !el[toggleName] } : el))
  }
  const updateTime = () => {
    setTodoData((data) =>
      data.map((el) => {
        const timeToNow = formatDistanceToNow(el.timeCreate, { includeSeconds: true })
        return { ...el, timeToNow }
      })
    )
  }
  const createTask = (label, timeComplited = 0) => {
    return {
      done: false,
      edit: false,
      label,
      timeCreate: new Date(),
      timeComplited,
      timeToNow: 'less than 2 seconds',
      key: key++,
    }
  }
  const addTask = (label, timeComplited) => {
    const task = createTask(label, timeComplited)
    setTodoData((data) => [task, ...data])
  }
  const deleteTask = (key) => {
    const index = todoData.findIndex((el) => el.key === key)
    setTodoData((data) => [...data.slice(0, index), ...data.slice(index + 1)])
  }
  const editTask = (key, value) => {
    setTodoData((data) =>
      data.map((el) => {
        if (el.key === key) {
          el.label = value
          el.edit = false
        }
        return el
      })
    )
  }
  const doneTask = (key) => {
    setTodoData((data) => toggle(data, key, 'done'))
  }
  const onEdit = (key) => {
    setTodoData((data) => toggle(data, key, 'edit'))
  }
  const filterTask = () => {
    switch (activeFilter) {
      case 'active':
        return todoData.filter((el) => {
          if (!el.done) return el
        })
      case 'completed':
        return todoData.filter((el) => {
          if (el.done) return el
        })
      default:
        return todoData
    }
  }
  const onFilterChange = (key) => {
    setActiveFilter(key)
  }
  const countActive = () => {
    return todoData.reduce((counter, task) => (!task.done ? (counter += 1) : counter), 0)
  }
  const clearComplited = () => {
    setTodoData((data) => data.filter((el) => !el.done))
  }
  const setNewTimeComplited = (key, value) => {
    setTodoData((data) =>
      data.map((el) => {
        if (el.key === key) el.timeComplited = value
        return el
      })
    )
  }
  useEffect(() => {
    setTodoData([createTask('Completed task', 68), createTask('Editing task', 745), createTask('Active task', 0)])
    const tick = setInterval(updateTime, 4000)
    return clearInterval(tick)
  }, [])
  const isVisibleItems = filterTask()
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <main className="main">
        <TaskList
          todoData={isVisibleItems}
          deleteTask={deleteTask}
          editTask={editTask}
          onEdit={onEdit}
          doneTask={doneTask}
          setNewTimeComplited={setNewTimeComplited}
        />
        <Footer
          counter={countActive()}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          clearComplited={clearComplited}
        />
      </main>
    </div>
  )
}

export default App
