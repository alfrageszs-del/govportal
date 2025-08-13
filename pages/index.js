import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const navigate = (path) => {
    router.push(path)
      .then(() => window.scrollTo(0, 0))
      .catch(err => console.error('Navigation error:', err))
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Государственный портал</h1>
      
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button 
          onClick={() => navigate('/acts')}
          style={buttonStyle}
        >
          Реестр актов
        </button>
        
        {/* Остальные кнопки аналогично */}
      </div>
    </div>
  )
}

const buttonStyle = {
  padding: '10px 20px',
  background: '#1e3c72',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
}