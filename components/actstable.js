// components/ActsTable.js
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

export default function ActsTable({ userRole }) {
  const [acts, setActs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActs();
  }, []);

  const fetchActs = async () => {
    const { data, error } = await supabase
      .from('acts_gov')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setActs(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!['prosecutor', 'admin'].includes(userRole)) return;
    
    const { error } = await supabase
      .from('acts_gov')
      .delete()
      .eq('id', id);
    
    if (!error) fetchActs();
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="acts-container">
      {acts.map((act) => (
        <div key={act.id} className="act-card">
          <h3>{act.title}</h3>
          <p>{act.content}</p>
          {act.reference_link && (
            <a href={act.reference_link} target="_blank">Ссылка на источник</a>
          )}
          {['prosecutor', 'admin'].includes(userRole) && (
            <button 
              onClick={() => handleDelete(act.id)}
              className="delete-button"
            >
              Удалить
            </button>
          )}
        </div>
      ))}
    </div>
  );
}