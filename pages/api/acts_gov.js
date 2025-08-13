import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  // Проверяем роль пользователя
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return res.status(401).json({ error: 'Не авторизован' });
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userError || !['prosecutor', 'admin'].includes(userData.role)) {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }

  // Остальная логика API...
}