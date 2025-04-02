
import { useState } from "react"

export default function Home() {
  const [goal, setGoal] = useState("")
  const [showTasks, setShowTasks] = useState(false)
  const [tasks, setTasks] = useState<string[]>([])

  const handleGenerateTasks = async () => {
    const res = await fetch("https://goalflow-api-demo.vercel.app/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal }),
    })

    const data = await res.json()
    const content = data.content
    const lines = content.split("\n").filter(line => line.trim().length > 3)
    setTasks(lines)
    setShowTasks(true)
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>GoalFlow</h1>
      <p style={{ textAlign: 'center' }}>让你的大目标，变成一个个可执行的小计划</p>

      <input
        style={{ width: '100%', padding: 10, marginTop: 20 }}
        placeholder="请输入你的目标，例如：3个月内学会Python"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button
        style={{ marginTop: 10, padding: 10, width: '100%' }}
        onClick={handleGenerateTasks}
        disabled={!goal}
      >
        生成执行计划
      </button>

      {showTasks && (
        <ul style={{ marginTop: 20 }}>
          {tasks.map((task, i) => (
            <li key={i} style={{ padding: 5, borderBottom: '1px solid #ccc' }}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
