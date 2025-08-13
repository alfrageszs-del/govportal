import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Государственный портал</h1>
      
      <nav>
        <Link href="/acts">
          <button>Реестр актов</button>
        </Link>
        <Link href="/fines">
          <button>Штрафные санкции</button>
        </Link>
        <Link href="/wanted">
          <button>Федеральный розыск</button>
        </Link>
        <Link href="/login">
          <button>Войти</button>
        </Link>
      </nav>
    </div>
  )
}