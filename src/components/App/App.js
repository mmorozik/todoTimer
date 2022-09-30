import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './App.css'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      todoData: [],
      activeFilter: 'all',
    }
    this.key = 100
    this.toggle = (todoData, key, toggleName) => {
      return todoData.map((el) => (el.key === key ? { ...el, [toggleName]: !el[toggleName] } : el))
    }
    this.updateTime = () => {
      this.setState(({ todoData }) => {
        return {
          todoData: todoData.map((el) => {
            const timeToNow = formatDistanceToNow(el.timeCreate, { includeSeconds: true })
            return { ...el, timeToNow }
          }),
        }
      })
    }
    this.createTask = (label, timeComplited = 0) => {
      const timeCreate = new Date()
      return {
        done: false,
        edit: false,
        label,
        timeCreate,
        timeComplited,
        timeToNow: 'less than 2 seconds',
        key: this.key++,
      }
    }
    this.addTask = (label, timeComplited) => {
      const task = this.createTask(label, timeComplited)
      this.setState(({ todoData }) => ({ todoData: [task, ...todoData] }))
    }
    this.deleteTask = (key) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.key === key)
        return {
          todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)],
        }
      })
    }
    this.editTask = (key, value) => {
      this.setState(({ todoData }) => {
        return todoData.map((el) => {
          if (el.key === key) {
            el.label = value
            el.edit = false
          }
          return el
        })
      })
    }
    this.doneTask = (key) => {
      this.setState(({ todoData }) => ({
        todoData: this.toggle(todoData, key, 'done'),
      }))
    }
    this.onEdit = (key) => {
      this.setState(({ todoData }) => ({
        todoData: this.toggle(todoData, key, 'edit'),
      }))
    }
    this.filterTask = () => {
      const { activeFilter, todoData } = this.state
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
    this.onFilterChange = (key) => {
      this.setState({ activeFilter: key })
    }
    this.countActive = () => {
      return this.state.todoData.reduce((counter, task) => (!task.done ? (counter += 1) : counter), 0)
    }
    this.clearComplited = () => {
      this.setState(({ todoData }) => {
        return { todoData: todoData.filter((el) => !el.done) }
      })
    }
    this.setNewTimeComplited = (key, value) => {
      this.setState(({ todoData }) => {
        return {
          todoData: todoData.map((el) => {
            if (el.key === key) el.timeComplited = value
            return el
          }),
        }
      })
    }
  }
  componentDidMount() {
    this.setState({
      todoData: [
        this.createTask('Completed task', 68),
        this.createTask('Editing task', 745),
        this.createTask('Active task', 0),
      ],
    })
    this.tick = setInterval(this.updateTime, 4000)
  }
  componentWillUnmount() {
    clearInterval(this.tick)
  }
  render() {
    const { activeFilter } = this.state
    const isVisibleItems = this.filterTask()
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <main className="main">
          <TaskList
            todoData={isVisibleItems}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            onEdit={this.onEdit}
            doneTask={this.doneTask}
            setNewTimeComplited={this.setNewTimeComplited}
          />
          <Footer
            counter={this.countActive()}
            activeFilter={activeFilter}
            onFilterChange={this.onFilterChange}
            clearComplited={this.clearComplited}
          />
        </main>
      </div>
    )
  }
}
