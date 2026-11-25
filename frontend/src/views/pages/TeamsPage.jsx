import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronRight } from 'lucide-react';
import { TeamFormModal } from '../components/TeamFormModal';

export function TeamsPage({ controller }) {
  const navigate = useNavigate();
  const { teams, loading, error, search, setSearch, createTeam } = controller;
  const [showCreate, setShowCreate] = useState(false);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tim Balap F1</h1>
          <p className="page-subtitle">Pilih tim untuk melihat detail atau ubah data.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Tambah Tim
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            type="search"
            className="input input--search"
            placeholder="Cari nama tim, pembalap, atau mesin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari tim"
          />
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="card">Memuat daftar tim...</div>
      ) : teams.length === 0 ? (
        <div className="card">Belum ada data tim yang cocok.</div>
      ) : (
        <div className="list-grid">
          {teams.map((team) => (
            <button
              key={team.id}
              type="button"
              className="list-card"
              onClick={() => navigate(`/teams/${team.id}`)}
            >
              <div className="team-card-lead">
                <span
                  className="team-stripe"
                  style={{ backgroundColor: team.accent_color || '#E10600' }}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="item-title">{team.name}</h2>
                  <p className="item-meta tabular">
                    {team.driver_1} ({team.driver_1_points ?? 0}) &middot; {team.driver_2} ({team.driver_2_points ?? 0})
                  </p>
                  <p className="item-meta">{team.power_unit} Power Unit</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="points-box">
                  <span className="points-num tabular">{team.points}</span>
                  <span className="points-label">PTS</span>
                </div>
                <ChevronRight size={18} color="var(--text-muted)" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      )}

      {showCreate && (
        <TeamFormModal onClose={() => setShowCreate(false)} onSubmit={createTeam} />
      )}
    </section>
  );
}
