import React, { Component } from 'react'

export default class TaskTimer extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
    }
    this.intervalID = null
    this.formateSeconds = () => {
      const min = Math.floor(this.state.time / 60)
        .toString()
        .padStart(2, '0')
      const sec = (this.state.time - min * 60).toString().padStart(2, '0')
      return min + ':' + sec
    }
    this.mathDistance = (dateStart) => {
      const newDate = Date.now()
      const dSecond = Math.floor((newDate - dateStart) / 1000)
      const time = this.props.timeComplited - dSecond
      this.formateSeconds(time)
      if (time === 0) this.onStop()
      this.setState(() => {
        return {
          time: time,
        }
      })
    }
    this.onStart = () => {
      if (this.intervalID) return
      const dateStart = Date.now()
      this.intervalID = setInterval(() => this.mathDistance(dateStart), 1000)
    }
    this.onStop = () => {
      clearInterval(this.intervalID)
      this.intervalID = null
      this.props.setNewTimeComplited(this.state.time)
    }
  }
  componentDidMount() {
    this.setState({ time: this.props.timeComplited })
  }
  render() {
    const time = this.formateSeconds()
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.onStart} />
        <button className="icon icon-pause" onClick={this.onStop} />
        <span>{time}</span>
      </span>
    )
  }
}
