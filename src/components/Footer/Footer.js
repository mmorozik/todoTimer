import React from 'react'

import './Footer.css'

import TasksFilter from '../TasksFilter'

const Footer = (props) => {
  const { counter, activeFilter, onFilterChange, clearComplited } = props
  return (
    <footer className="footer">
      <span className="todo-count">{counter} items left</span>
      <TasksFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearComplited}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
