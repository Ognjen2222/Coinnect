'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  async function load() {
    try {
      setGroups(await api.groups());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler');
    }
  }

  useEffect(() => { load(); }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.createGroup(name, description);
      setName('');
      setDescription('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler');
    }
  }

  return (
    <div className="screen-content grid-gap">
      <section className="card">
        <div className="section-header"><h2>Gruppen</h2><span>{groups.length} aktiv</span></div>
        {error && <div className="error-box">{error}</div>}
        <div className="group-list">
          {groups.map((group) => (
            <div className="group-card" key={group.id}>
              <div>
                <h3>{group.name}</h3>
                <p className="muted">{group.description}</p>
              </div>
              <div className="avatar-row">
                {group.members.map((member: any) => <span className="avatar" key={member.id}>{member.initials}</span>)}
              </div>
              <div className="expense-list">
                {group.latestExpenses.length ? group.latestExpenses.map((expense: any, index: number) => (
                  <div key={index} className="expense-row"><span>{expense.title}</span><strong>{expense.amount}</strong></div>
                )) : <div className="muted">Noch keine Ausgaben</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="card">
        <h2>Neue Gruppe anlegen</h2>
        <form className="stack" onSubmit={onCreate}>
          <label>Gruppenname<input value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. Ski Trip 2026" required /></label>
          <label>Beschreibung<input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Kurz beschreiben" /></label>
          <button className="primary-button" type="submit">Gruppe erstellen</button>
        </form>
      </section>
    </div>
  );
}
