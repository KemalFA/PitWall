import { useState } from 'react';
import { X } from 'lucide-react';

const emptyForm = {
  name: '',
  base: '',
  team_principal: '',
  power_unit: '',
  driver_1: '',
  driver_2: '',
  driver_1_points: 0,
  driver_2_points: 0,
  points: 0,
  championships: 0,
  accent_color: '#E10600',
  description: '',
};

export function TeamFormModal({ initialData, onClose, onSubmit }) {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState(
    initialData
      ? {
          name: initialData.name || '',
          base: initialData.base || '',
          team_principal: initialData.team_principal || '',
          power_unit: initialData.power_unit || '',
          driver_1: initialData.driver_1 || '',
          driver_2: initialData.driver_2 || '',
          driver_1_points: initialData.driver_1_points ?? 0,
          driver_2_points: initialData.driver_2_points ?? 0,
          points: initialData.points ?? 0,
          championships: initialData.championships ?? 0,
          accent_color: initialData.accent_color || '#E10600',
          description: initialData.description || '',
        }
      : emptyForm
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'driver_1_points' || name === 'driver_2_points') {
        const p1 = Number(name === 'driver_1_points' ? value : prev.driver_1_points) || 0;
        const p2 = Number(name === 'driver_2_points' ? value : prev.driver_2_points) || 0;
        next.points = p1 + p2;
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await onSubmit({
        ...form,
        driver_1_points: Number(form.driver_1_points) || 0,
        driver_2_points: Number(form.driver_2_points) || 0,
        points: Number(form.points) || 0,
        championships: Number(form.championships) || 0,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan data tim.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit Tim' : 'Tambah Tim'}>
      <div className="modal-panel">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Edit Tim Balap' : 'Tambah Tim Balap'}</h2>
          <button type="button" className="btn" onClick={onClose} aria-label="Tutup form">
            <X size={18} />
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="stack-md">
          <div>
            <label className="field-label" htmlFor="team-name">Nama Tim *</label>
            <input id="team-name" name="name" className="input" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="team-base">Markas *</label>
              <input id="team-base" name="base" className="input" value={form.base} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label" htmlFor="team-principal">Team Principal *</label>
              <input id="team-principal" name="team_principal" className="input" value={form.team_principal} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="team-pu">Power Unit *</label>
              <input id="team-pu" name="power_unit" className="input" value={form.power_unit} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label" htmlFor="team-color">Warna Aksen</label>
              <input id="team-color" name="accent_color" type="color" className="input" value={form.accent_color} onChange={handleChange} />
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="team-d1">Pembalap 1 *</label>
              <input id="team-d1" name="driver_1" className="input" value={form.driver_1} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label" htmlFor="team-d1-pts">Poin Pembalap 1</label>
              <input id="team-d1-pts" name="driver_1_points" type="number" min="0" className="input" value={form.driver_1_points} onChange={handleChange} />
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="team-d2">Pembalap 2 *</label>
              <input id="team-d2" name="driver_2" className="input" value={form.driver_2} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label" htmlFor="team-d2-pts">Poin Pembalap 2</label>
              <input id="team-d2-pts" name="driver_2_points" type="number" min="0" className="input" value={form.driver_2_points} onChange={handleChange} />
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="team-points">Total Poin Konstruktor</label>
              <input id="team-points" name="points" type="number" min="0" className="input" value={form.points} onChange={handleChange} />
            </div>
            <div>
              <label className="field-label" htmlFor="team-titles">Gelar Juara Dunia</label>
              <input id="team-titles" name="championships" type="number" min="0" className="input" value={form.championships} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="team-desc">Deskripsi</label>
            <textarea id="team-desc" name="description" className="textarea" value={form.description} onChange={handleChange} />
          </div>

          <div className="action-row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" className="btn" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Tim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
