import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { TeamModel } from '../../models/teamModel';
import { TeamFormModal } from '../components/TeamFormModal';

export function TeamDetailPage({ controller }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    TeamModel.getById(id)
      .then((res) => {
        if (active) setTeam(res.data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const handleUpdate = async (payload) => {
    const updated = await controller.updateTeam(id, payload);
    setTeam(updated);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Hapus tim "${team.name}"?`)) return;
    await controller.deleteTeam(id);
    navigate('/teams');
  };

  if (loading) {
    return <div className="card">Memuat detail tim...</div>;
  }

  if (!team) {
    return (
      <div className="stack-md">
        <button type="button" className="btn" onClick={() => navigate('/teams')}>
          <ArrowLeft size={18} /> Kembali ke Daftar Tim
        </button>
        <div className="card">Data tim tidak ditemukan.</div>
      </div>
    );
  }

  return (
    <section>
      <div className="detail-back">
        <button type="button" className="btn" onClick={() => navigate('/teams')}>
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>

      <div
        className="detail-hero"
        style={{ borderLeft: `5px solid ${team.accent_color || '#E10600'}` }}
      >
        <h1 className="page-title">{team.name}</h1>
        <p className="page-subtitle">{team.base}</p>
        {team.description && (
          <p style={{ margin: '12px 0 0', fontSize: '0.95rem' }}>{team.description}</p>
        )}

        <div className="action-row">
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            <Pencil size={16} /> Edit Tim
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} /> Hapus
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="spec-item">
          <p className="spec-label">Pembalap 1</p>
          <p className="spec-value">{team.driver_1}</p>
          <p className="item-meta tabular">{team.driver_1_points ?? 0} pts</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Pembalap 2</p>
          <p className="spec-value">{team.driver_2}</p>
          <p className="item-meta tabular">{team.driver_2_points ?? 0} pts</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Team Principal</p>
          <p className="spec-value">{team.team_principal}</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Power Unit</p>
          <p className="spec-value">{team.power_unit}</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Total Poin Konstruktor</p>
          <p className="spec-value tabular">{team.points} pts</p>
        </div>
        <div className="spec-item">
          <p className="spec-label">Gelar Juara Dunia</p>
          <p className="spec-value tabular">{team.championships}x</p>
        </div>
      </div>

      {editing && (
        <TeamFormModal
          initialData={team}
          onClose={() => setEditing(false)}
          onSubmit={handleUpdate}
        />
      )}
    </section>
  );
}
