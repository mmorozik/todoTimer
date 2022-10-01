import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

const TasksFilter = (props) => {
  const { onFilterChange, activeFilter } = props
  const btn = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]
  const filter = btn.map(({ key, label }) => {
    let className = ''
    if (activeFilter === key) className = 'selected'
    return (
      <li key={key}>
        <button className={className} onClick={() => onFilterChange(key)} type="button">
          {label}
        </button>
      </li>
    )
  })
  return <ul className="filters">{filter}</ul>
}

export default TasksFilter

TasksFilter.propTypes = {
  stateBtn: PropTypes.arrayOf(PropTypes.object),
  activeFilter: PropTypes.string,
}

TasksFilter.defaultProps = {
  activeFilter: 'all',
}
