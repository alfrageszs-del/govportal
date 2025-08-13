import Link from 'next/link'

export default function ActsPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Реестр актов</h1>
      <Link href="/">
        <a style={{ color: 'blue' }}>← На главную</a>
      </Link>
    </div>
  )
}