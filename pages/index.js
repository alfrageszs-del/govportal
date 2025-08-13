import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Государственный портал</h1>
      
      {/* Кнопки для перехода */}
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <Link href="/acts" passHref>
          <button style={buttonStyle}>Реестр актов</button>
        </Link>
        <Link href="/fines" passHref>
          <button style={buttonStyle}>Штрафы</button>
        </Link>
        <Link href="/wanted" passHref>
          <button style={buttonStyle}>Розыск</button>
        </Link>
        <Link href="/login" passHref>
          <button style={buttonStyle}>Войти</button>
        </Link>
      </div>
    </div>
  )
}

// Стили для кнопок
const buttonStyle = {
  padding: '10px 20px',
  background: '#1e3c72',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
}