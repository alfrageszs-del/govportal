// pages/appointments.js
import withAuth from '../components/WithAuth';
import AppointmentForm from '../components/AppointmentForm';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

function AppointmentsPage({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_at', { ascending: true });
    
    if (!error) setAppointments(data);
    setLoading(false);
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Мои записи на приём</h1>
      
      <AppointmentForm user={user} onSuccess={fetchAppointments} />

      <div className="appointments-list">
        {appointments.map((app) => (
          <div key={app.id} className="appointment-card">
            <h3>{DEPARTMENTS[app.department] || app.department}</h3>
            <p>Дата: {new Date(app.scheduled_at).toLocaleString()}</p>
            <p>Статус: {app.status}</p>
            <p>Цель: {app.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(AppointmentsPage);