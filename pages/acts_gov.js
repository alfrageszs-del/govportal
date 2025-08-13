import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function ActsGov() {
  const [acts, setActs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActs()
  }, [])

  const fetchActs = async () => {
    const { data, error } = await supabase
      .from('acts_gov')
      .select('*')
    
    if (!error) setActs(data)
    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Реестр актов правительства</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {acts.map(act => (
            <tr key={act.id}>
              <td>{act.id}</td>
              <td>{act.title}</td>
              <td>{new Date(act.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// pages/acts_gov.js
import withAuth from '../components/WithAuth';
import ActsTable from '../components/ActsTable';
import CreateGovActForm from '../components/CreateGovActForm';

function ActsGovPage({ user }) {
  return (
    <div>
      <h1>Реестр актов правительства</h1>
      
      {['prosecutor', 'admin'].includes(user.role) && (
        <CreateGovActForm user={user} />
      )}

      <ActsTable userRole={user.role} />
    </div>
  );
}

export default withAuth(ActsGovPage);