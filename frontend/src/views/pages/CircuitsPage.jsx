import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronRight } from 'lucide-react';
import { CircuitFormModal } from '../components/CircuitFormModal';
import { formatRaceDate } from '../../utils/format';

const statuses = ['All', 'Next', 'Scheduled', 'Completed'];

function statusBadgeClass(status) {
  if (status === 'Next') return 'badge badge--next';
  if (status === 'Completed') return 'badge badge--completed';
  return 'badge';
}

export function CircuitsPage({ controller }) {
  const navigate = useNavigate();
  const {
    circuits,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    createCircuit,
  } = controller;
  const [showCreate, setShowCreate] = useState(false);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">Jadwal Sirkuit</h1>
          <p className="page-subtitle">Klik seri balapan untuk melihat spesifikasi sirkuit dan kelola data.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowCreate(true)}>
          <Plus size={18} /> Tambah Sirkuit
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            type="search"
            className="input input--search"
            placeholder="Cari Grand Prix, sirkuit, atau negara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari sirkuit"
          />
        </div>
        <div className="filter-row" role="group" aria-label="Filter status balapan">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              className={`chip ${statusFilter === st ? 'chip--active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="card">Memuat jadwal sirkuit...</div>
      ) : circuits.length === 0 ? (
        <div className="card">Tidak ada jadwal sirkuit yang cocok.</div>
      ) : (
        <div className="list-grid">
          {circuits.map((circuit) => (
            <button
              key={circuit.id}
              type="button"
              className="list-card"
              onClick={() => navigate(`/circuits/${circuit.id}`)}
            >
              <div className="stack-sm" style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge tabular">R{circuit.round_number}</span>
                  <span className={statusBadgeClass(circuit.status)}>{circuit.status}</span>
                </div>
                <h2 className="item-title">{circuit.grand_prix}</h2>
                <p className="item-meta">
                  {circuit.name} &middot; {circuit.country}
                </p>
                <p className="item-meta tabular">{formatRaceDate(circuit.race_date)}</p>
              </div>
              <ChevronRight size={18} color="var(--text-muted)" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {showCreate && (
        <CircuitFormModal onClose={() => setShowCreate(false)} onSubmit={createCircuit} />
      )}
    </section>
  );
}
