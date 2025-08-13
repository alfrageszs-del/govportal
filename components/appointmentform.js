// components/AppointmentForm.js
import { supabase } from '../lib/supabase';
import { useState } from 'react';

const DEPARTMENTS = {
  governor: 'Губернатор',
  vice_governor: 'Вице-губернатор',
  finance: 'Министерство финансов',
  justice: 'Министерство юстиции'
};

export default function AppointmentForm({ user }) {
  const [department, setDepartment] = useState('');
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('appointments')
      .insert([{
        user_id: user.id,
        department,
        purpose,
        scheduled_at: `${date}T${time}:00Z`,
        status: 'pending'
      }]);
    
    if (!error) {
      alert('Запись успешно создана!');
      setDepartment('');
      setPurpose('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      >
        <option value="">Выберите отдел</option>
        {Object.entries(DEPARTMENTS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>

      <textarea
        placeholder="Цель визита"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <button type="submit">Записаться</button>
    </form>
  );
}