import { TopBar } from './views/components/TopBar';
import { BottomNav } from './views/components/BottomNav';
import { useRouterController } from './controllers/useRouterController';

function PagePlaceholder({ title, subtitle }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="card">
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Konten halaman ini akan dilengkapi pada Step 4.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const { route, activeTab, navigate } = useRouterController();

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return (
          <PagePlaceholder
            title="PitWall Overview"
            subtitle="Ringkasan musim Formula 1, balapan berikutnya, dan klasemen tim."
          />
        );
      case 'teams':
        return (
          <PagePlaceholder
            title="Tim Balap F1"
            subtitle="Katalog konstruktor beserta pembalap dan perolehan poin."
          />
        );
      case 'team-detail':
        return (
          <PagePlaceholder
            title={`Detail Tim #${route.id}`}
            subtitle="Informasi lengkap konstruktor dan aksi ubah/hapus."
          />
        );
      case 'circuits':
        return (
          <PagePlaceholder
            title="Jadwal Sirkuit"
            subtitle="Kalender balapan Formula 1 beserta status dan spesifikasi trek."
          />
        );
      case 'circuit-detail':
        return (
          <PagePlaceholder
            title={`Detail Sirkuit #${route.id}`}
            subtitle="Spesifikasi sirkuit dan pengelolaan data balapan."
          />
        );
      case 'profile':
        return (
          <PagePlaceholder
            title="Profil & Tentang Aplikasi"
            subtitle="Informasi mahasiswa pengembang dan status penyimpanan aplikasi."
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <TopBar dataSource="api" />
      <main className="main-content">{renderPage()}</main>
      <BottomNav activeTab={activeTab} onNavigate={navigate} />
    </div>
  );
}
