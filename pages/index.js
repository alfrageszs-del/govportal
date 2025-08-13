import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '150vh', padding: '20px' }}>
      <h1>Государственный портал</h1>

      {/* Навигация */}  
      <nav style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
        <Link href="/acts" passHref>
          <a style={linkStyle}>Реестр актов</a>
        </Link>
        <Link href="/fines" passHref>
          <a style={linkStyle}>Штрафы</a>
        </Link>
        <Link href="/wanted" passHref>
          <a style={linkStyle}>Розыск</a>
        </Link>
        <Link href="/login" passHref>
          <a style={linkStyle}>Войти</a>
        </Link>
      </nav>

      {/* Контент страницы */}  
      <div style={{ marginTop: '50px' }}>
        <p>Основной контент главной страницы...</p>
      </div>
    </div>
  )
}

// Стили для ссылок  
const linkStyle = {
  padding: '10px 20px',
  background: '#1e3c72',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px'
}