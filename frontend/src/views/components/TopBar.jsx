export function TopBar({ dataSource }) {
  const isOnline = dataSource === 'api';

  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <div className="brand-mark">
          <span className="brand-stripe" aria-hidden="true" />
          <span>PitWall</span>
        </div>
        <span
          className={`sync-pill ${isOnline ? 'sync-pill--online' : 'sync-pill--offline'}`}
          title={isOnline ? 'Terhubung ke API & PostgreSQL' : 'Menggunakan cache localStorage'}
        >
          {isOnline ? 'API Connected' : 'Offline Cache'}
        </span>
      </div>
    </header>
  );
}
