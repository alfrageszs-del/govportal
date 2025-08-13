// pages/admin/roles.js
import withAuth from '../../components/WithAuth';
import { supabase } from '../../lib/supabase';
import { useState, useEffect } from 'react';

const ROLES = {
  civilian: 'Гражданский',
  fib_agent: 'Агент FIB',
  lspd_officer: 'Офицер LSPD',
  prosecutor: 'Прокурор',
  judge: 'Судья',
  admin: 'Администратор'
};

function RoleManagement({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, nickname, static_id, role');
    
    if (!error) setUsers(data);
    setLoading(false);
  };

  const updateRole = async (userId, newRole) => {
    const { error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId);
    
    if (!error) fetchUsers();
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container">
      <h1>Управление ролями</h1>
      <table className="role-table">
        <thead>
          <tr>
            <th>Никнейм</th>
            <th>Static ID</th>
            <th>Текущая роль</th>
            <th>Новая роль</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nickname}</td>
              <td>{user.static_id}</td>
              <td>{ROLES[user.role] || user.role}</td>
              <td>
                <select
                  defaultValue={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                >
                  {Object.entries(ROLES).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </td>
              <td>
                <button 
                  onClick={() => updateRole(user.id, document.querySelector(`select[value="${user.role}"]`).value)}
                >
                  Обновить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withAuth(RoleManagement, 'admin');