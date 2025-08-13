// pages/wanted.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function WantedList() {
  const [wanted, setWanted] = useState([]);
  const [users, setUsers] = useState([]);
  const [acts, setActs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Проверка авторизации
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);

      // Загрузка данных
      const { data: wantedData } = await supabase
        .from('wanted_persons')
        .select('*, users!wanted_persons_user_id_fkey(nickname), court_acts(title)');

      const { data: usersData } = await supabase
        .from('users')
        .select('id, nickname');

      const { data: actsData } = await supabase
        .from('court_acts')
        .select('id, title');

      setWanted(wantedData || []);
      setUsers(usersData || []);
      setActs(actsData || []);
    };

    fetchData();
  }, []);

  const addToWanted = async (userId, actId, reason) => {
    if (!['fib_agent', 'lspd_officer', 'admin'].includes(user?.role)) return;

    const { error } = await supabase
      .from('wanted_persons')
      .insert([{
        user_id: userId,
        act_id: actId,
        reason,
        added_by: user.id
      }]);

    if (!error) {
      // Обновляем список
      const { data } = await supabase
        .from('wanted_persons')
        .select('*, users!wanted_persons_user_id_fkey(nickname), court_acts(title)');
      setWanted(data || []);
    }
  };

  return (
    <div>
      <h1>Федеральный розыск</h1>

      {/* Форма добавления (для FIB/LSPD) */}
      {['fib_agent', 'lspd_officer', 'admin'].includes(user?.role) && (
        <WantedForm 
          users={users} 
          acts={acts} 
          onSubmit={addToWanted} 
        />
      )}

      {/* Таблица розыска */}
      <table>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Никнейм</th>
            <th>Причина</th>
            <th>Основание</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {wanted.map(w => (
            <tr key={w.id}>
              <td>
                <div className="avatar-placeholder">
                  {w.users?.nickname?.charAt(0) || '?'}
                </div>
              </td>
              <td>{w.users?.nickname || 'Unknown'}</td>
              <td>{w.reason}</td>
              <td>{w.court_acts?.title || 'N/A'}</td>
              <td>{w.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}