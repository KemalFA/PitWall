import { useEffect, useState } from 'react';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { CircuitModel } from '../../models/circuitModel';
import { CircuitFormModal } from '../components/CircuitFormModal';
import { formatRaceDate } from '../../utils/format';

export function CircuitDetailPage({ circuitId, controller, onNavigate }) {
  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    CircuitModel.getById(circuitId)
      .then((res) => {
        if (active) setCircuit(res.data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [circuitId]);

  const handleUpdate = async (payload) => {
    const updated = await controller.updateCircuit(circuitId, payload);
    setCircuit(updated);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Hapus jadwal "${circuit.grand_prix}"?`)) return;
    await controller.deleteCircuit(circuitId);
    onNavigate('circuits');
  };

  if (loading) {
    return <div className="card">Memuat detail sirkuit...</div>;
  }

  if (!circuit) {
    return (
      <div className="stack-md">
        <button type="button" className="btn" onClick={() => onNavigate('circuits')}>
          <ArrowLeft size={18} /> Kembali ke Jadwal
        </button>
        <div className="card">Data sirkuit tidak ditemukan.</div>
      </div>
    );
  }

  const totalDistance = (Number(circuit.length_km) * Number(circuit.laps)).toFixed(2);

  return (
    <section>
      <div className="detail-back">
        <button type="button" className="btn" onClick={() => onNavigate('circuits')}>
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>

      <div className="detail-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="badge tabular">Round {circuit.round_number}</span>
          <span
            className={`badge ${
              circuit.status === 'Next'
                ? 'badge--next'
                : circuit.status === 'Completed'
                  ? 'badge--completed'
                  : ''
            }`}
          >
            {circuit.status}
          </span>
        </div>
        <h1 className="page-title">{circuit.grand_prix}</h1>
        <p className="page-subtitle">
          {circuit.name} &middot; {circuit.city}, {circuit.country}
        </p>
        {circuit.description && (
          <p style={{ margin: '12px 0 0', fontSize: '0.95rem' }}>{circuit.description}</p>
        )}

        <div className="action-row">
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            <Pencil size={16} /> Edit Sirkuit
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} /> Hapus
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="spec-item">
          <p className="spec-label">Tanggal Balapan</p>
          <p className="spec-value tabular">{formatRaceDate(circuit.race_date)}</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Panjang Lintasan</p>
          <p className="spec-value tabular">{circuit.length_km} km</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Jumlah Lap</p>
          <p className="spec-value tabular">{circuit.laps} lap</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Total Jarak Balap</p>
          <p className="spec-value tabular">{totalDistance} km</p>
        </div>
        <div className="spec-item" style={{ gridColumn: '1 / -1' }}>
          <p className="spec-label">Rekor Lap</p>
          <p className="spec-value">{circuit.lap_record || 'Belum tercatat'}</p>
        </div>
      </div>

      {editing && (
        <CircuitFormModal
          initialData={circuit}
          onClose={() => setEditing(false)}
          onSubmit={handleUpdate}
        />
      )}
    </section>
  );
}
