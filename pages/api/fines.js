// pages/fines.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function Fines() {
  const [fines, setFines] = useState([]);
  const [users, setUsers] = useState([]);
  const [courtActs, setCourtActs] = useState([]);
  const [newFine, setNewFine] = useState({
    target_user_id: '',
    court_act_id: '',
    amount: '',
    reason: ''
  });
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setUser(userData);
      
      // Загружаем штрафы
      const { data: finesData } = await supabase
        .from('fines')
        .select('*, court_acts(*)');
      
      // Загружаем пользователей для выпадающего списка
      const { data: usersData } = await supabase
        .from('users')
        .select('id, nickname');
      
      // Загружаем акты суда
      const { data: actsData } = await supabase
        .from('court_acts')
        .select('id, title');
      
      setFines(finesData || []);
      setUsers(usersData || []);
      setCourtActs(actsData || []);
    };

    fetchData();
  }, []);

  const handleAddFine = async () => {
    if (!['judge', 'prosecutor', 'admin'].includes(user?.role)) return;

    const { error } = await supabase
      .from('fines')
      .insert([{
        ...newFine,
        amount: parseFloat(newFine.amount),
        author_id: user.id
      }]);

    if (!error) {
      setNewFine({ target_user_id: '', court_act_id: '', amount: '', reason: '' });
      // Обновляем список
      const { data } = await supabase.from('fines').select('*, court_acts(*)');
      setFines(data || []);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Реестр штрафных санкций</h1>

      {/* Форма добавления штрафа (для судей/прокуроров) */}
      {['judge', 'prosecutor', 'admin'].includes(user.role) && (
        <div className="form">
          <h3>Добавить штраф</h3>
          
          <select
            value={newFine.target_user_id}
            onChange={(e) => setNewFine({...newFine, target_user_id: e.target.value})}
          >
            <option value="">Выберите пользователя</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.nickname}</option>
            ))}
          </select>

          <select
            value={newFine.court_act_id}
            onChange={(e) => setNewFine({...newFine, court_act_id: e.target.value})}
          >
            <option value="">Выберите акт суда</option>
            {courtActs.map(a => (
              <option key={a.id} value={a.id}>{a.title}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Сумма штрафа"
            value={newFine.amount}
            onChange={(e) => setNewFine({...newFine, amount: e.target.value})}
          />

          <textarea
            placeholder="Причина штрафа"
            value={newFine.reason}
            onChange={(e) => setNewFine({...newFine, reason: e.target.value})}
          />

          <button onClick={handleAddFine}>Добавить штраф</button>
        </div>
      )}

      {/* Таблица штрафов */}
      <table className="fines-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Нарушитель</th>
            <th>Сумма</th>
            <th>Причина</th>
            <th>Статус</th>
            <th>Акт суда</th>
          </tr>
        </thead>
        <tbody>
          {fines.map(fine => (
            <tr key={fine.id}>
              <td>{fine.id}</td>
              <td>
                {users.find(u => u.id === fine.target_user_id)?.nickname || 'Unknown'}
              </td>
              <td>{fine.amount} $</td>
              <td>{fine.reason}</td>
              <td>{fine.status}</td>
              <td>
                {courtActs.find(a => a.id === fine.court_act_id)?.title || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}