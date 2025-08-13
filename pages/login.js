import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [staticId, setStaticId] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('static_id', staticId)
      .single()
    
    if (data?.password === password) {
      alert('Успешный вход!')
    } else {
      alert('Ошибка входа!')
    }
  }

  return (
    <div>
      <input 
        placeholder="Static ID" 
        onChange={(e) => setStaticId(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  )
}