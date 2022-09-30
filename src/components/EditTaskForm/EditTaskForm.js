import React, { Component } from 'react'

export default class EditTaskForm extends Component {
  constructor() {
    super()
    this.state = { value: '' }
    this.handleChange = (e) => {
      this.setState(() => {
        return { value: e.target.value }
      })
    }
    this.handleSubmit = (e) => {
      e.preventDefault()
      const { value } = this.state
      this.props.editTask(value)
    }
    this.blur = () => {
      const { value } = this.state
      this.props.editTask(value)
    }
  }
  componentDidMount() {
    const { label } = this.props
    console.log(label)
    this.setState(() => ({ value: label }))
  }
  render() {
    const { value } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" className="edit" value={value} onChange={this.handleChange} onBlur={this.blur} />
      </form>
    )
  }
}
