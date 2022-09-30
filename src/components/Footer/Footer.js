import React from 'react'
// import PropTyps from 'prop-types'

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

// Footer.propTyps = {
//   count: PropTyps.number,
//   stateBtn: PropTyps.arrayOf(PropTyps.object),
//   onFilter: PropTyps.func.isRequired,
//   onClear: PropTyps.func.isRequired,
// }

// Footer.defaultProps = {
//   count: 0,
//   stateBtn: [{}],
// }
