import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Notes from './components/Notes';
import Tasks from './components/Tasks';
import './App.css';

export default function App() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="app-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userEmail={session.user.email} 
      />
      <main className="workspace">
        {activeTab === 'notes' ? <Notes /> : <Tasks />}
      </main>
    </div>
  );
}
