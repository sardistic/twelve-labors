import { useEffect, useMemo, useState } from 'react'

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remaining = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remaining}`
}

export function WorkoutTimer() {
  const [running, setRunning] = useState(false)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const target = 60 * 60
  const remaining = Math.max(target - elapsed, 0)
  const status = useMemo(() => {
    if (elapsed < 7 * 60) return 'Warm-up window'
    if (elapsed < 45 * 60) return 'Main lift window'
    if (elapsed < 55 * 60) return 'Finisher window'
    return 'Wrap up and log'
  }, [elapsed])

  useEffect(() => {
    if (!running || startedAt === null) return
    const interval = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [running, startedAt])

  const start = () => {
    const now = Date.now() - elapsed * 1000
    setStartedAt(now)
    setRunning(true)
  }

  const pause = () => {
    setRunning(false)
  }

  const reset = () => {
    setRunning(false)
    setStartedAt(null)
    setElapsed(0)
  }

  return (
    <section className="timer-card">
      <div>
        <span>Session timer</span>
        <strong>{formatTime(remaining)}</strong>
        <p>{status}</p>
      </div>
      <div className="timer-actions">
        <button type="button" onClick={running ? pause : start}>{running ? 'Pause' : 'Start'}</button>
        <button type="button" onClick={reset}>Reset</button>
      </div>
    </section>
  )
}
