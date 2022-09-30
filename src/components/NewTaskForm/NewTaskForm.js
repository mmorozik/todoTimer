import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      min: '',
      sec: '',
    }

    this.onLabelChange = (event) => {
      const name = event.target.name
      this.setState({
        [name]: event.target.value,
      })
    }

    this.onSubmit = (event) => {
      event.preventDefault()
      const { label, min, sec } = this.state
      const time = +min * 60 + +sec
      if (label !== '') this.props.addTask(label, time)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          name="label"
          className="new-todo"
          type="text"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
        />
        <input
          name="min"
          className="new-todo-form__timer"
          type="number"
          onChange={this.onLabelChange}
          placeholder="Min"
          value={this.state.min}
        />
        <input
          name="sec"
          className="new-todo-form__timer"
          type="number"
          onChange={this.onLabelChange}
          placeholder="Sec"
          value={this.state.sec}
        />
        <input className="sub-btn" type="submit" />
      </form>
    )
  }
}

// NewTaskForm.propTypes = {
//   onItemAdded: PropTypes.func.isRequired,
// }
