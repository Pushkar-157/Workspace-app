import React, { useState, useEffect } from 'react';
import { fetchFromBackend } from '../api';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => { loadNotes(); }, []);

  const loadNotes = async () => {
    try {
      const data = await fetchFromBackend('/notes');
      setNotes(data);
    } catch (err) { console.error(err.message); }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newNote = await fetchFromBackend('/notes', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
      });
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    } catch (err) { console.error(err.message); }
  };

  const handleDelete = async (id) => {
    await fetchFromBackend(`/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="page-content">
      <h1>📄 Notes</h1>
      <form className="note-editor" onSubmit={handleAddNote}>
        <input type="text" className="note-title-input" placeholder="Untitled Note..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="note-body-input" placeholder="Type your thoughts here..." rows="4" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Save Page</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-card-header">
              <h3>{note.title}</h3>
              <button onClick={() => handleDelete(note.id)}>🗑️</button>
            </div>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
