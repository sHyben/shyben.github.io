import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '5rem',
          fontWeight: 900,
          color: 'var(--color-rust)',
          margin: 0,
          lineHeight: 1,
        }}
      >
        404
      </p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: 0 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.65rem 1.5rem',
          background: 'var(--color-rust)',
          color: '#fff',
          borderRadius: '10px',
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '0.95rem',
        }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
