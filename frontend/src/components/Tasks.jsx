import React, { useState, useEffect } from 'react';
import { fetchFromBackend } from '../api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchFromBackend('/tasks');
      setTasks(data);
    } catch (err) { console.error(err.message); }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    try {
      const newTask = await fetchFromBackend('/tasks', {
        method: 'POST',
        body: JSON.stringify({
          task_text: taskText,
          reminder_date: reminderDate ? new Date(reminderDate).toISOString() : null,
        }),
      });
      setTasks([...tasks, newTask]);
      setTaskText('');
      setReminderDate('');
    } catch (err) { console.error(err.message); }
  };

  const toggleComplete = async (task) => {
    const updated = await fetchFromBackend(`/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_completed: !task.is_completed }),
    });
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await fetchFromBackend(`/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="page-content">
      <h1>✅ Checklists & Reminders</h1>
      <form className="task-form" onSubmit={handleAddTask}>
        <input type="text" placeholder="Add a to-do item..." value={taskText} onChange={(e) => setTaskText(e.target.value)} />
        <input type="datetime-local" title="Set optional reminder" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.is_completed ? 'completed' : ''}`}>
            <label>
              <input type="checkbox" checked={task.is_completed} onChange={() => toggleComplete(task)} />
              <span>{task.task_text}</span>
            </label>
            <div className="task-meta">
              {task.reminder_date && (
                <span className="reminder-badge">⏰ {new Date(task.reminder_date).toLocaleString()}</span>
              )}
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
