import React from 'react';
import { supabase } from '../supabaseClient';

export default function Sidebar({ activeTab, setActiveTab, userEmail }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <strong>📓 My Workspace</strong>
        <small>{userEmail}</small>
      </div>
      <nav className="nav-links">
        <button className={activeTab === 'notes' ? 'active' : ''} onClick={() => setActiveTab('notes')}>📄 Notes & Docs</button>
        <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>✅ Checklists & Reminders</button>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>🚪 Log Out</button>
    </div>
  );
}
