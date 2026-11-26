export function ProfilePage() {
  return (
    <section className="stack-lg">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Profil &amp; Tentang Aplikasi</h1>
          <p className="page-subtitle">Tugas Akhir Praktikum Pemrograman Perangkat Bergerak.</p>
        </div>
      </div>

      <div className="card stack-sm">
        <h2 className="item-title">Pengembang</h2>
        <div className="detail-grid" style={{ marginTop: 8 }}>
          <div className="spec-item">
            <p className="spec-label">Nama</p>
            <p className="spec-value">Muhammad Kemal Fikri Aldafi</p>
          </div>
          <div className="spec-item">
            <p className="spec-label">NIM</p>
            <p className="spec-value tabular">21120124130084</p>
          </div>
        </div>
      </div>

      <div className="card stack-sm">
        <h2 className="item-title">Tentang PitWall</h2>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.94rem' }}>
          PitWall adalah aplikasi Progressive Web App (PWA) bertema Formula 1 untuk melihat dan
          mengelola katalog tim konstruktor, klasemen pembalap, serta jadwal sirkuit balapan.
          Dibangun dengan pola arsitektur MVC menggunakan Express REST API, PostgreSQL (Neon),
          React + Vite, dan fallback penyimpanan localStorage saat offline.
        </p>
      </div>
    </section>
  );
}
