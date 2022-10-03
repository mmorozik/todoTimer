import React, { useEffect, useState } from 'react'

const TaskTimer = (props) => {
  const [time, setTime] = useState(0)
  let intervalID = null
  const formateSeconds = () => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
    const sec = (time - min * 60).toString().padStart(2, '0')
    return min + ':' + sec
  }
  const mathDistance = (dateStart) => {
    const newDate = Date.now()
    const dSecond = Math.floor((newDate - dateStart) / 1000)
    const time = props.timeComplited - dSecond
    formateSeconds(time)
    if (time === 0) onStop()
    setTime(() => time)
  }
  const onStart = () => {
    if (intervalID) return
    const dateStart = Date.now()
    intervalID = setInterval(() => mathDistance(dateStart), 1000)
  }
  const onStop = () => {
    clearInterval(intervalID)
    intervalID = null
    props.setNewTimeComplited(time)
  }

  useEffect(() => {
    setTime(props.timeComplited)
    if (intervalID) return clearInterval(intervalID)
  })

  return (
    <span className="description">
      <button className="icon icon-play" onClick={onStart} />
      <button className="icon icon-pause" onClick={onStop} />
      <span>{formateSeconds()}</span>
    </span>
  )
}

export default TaskTimer
