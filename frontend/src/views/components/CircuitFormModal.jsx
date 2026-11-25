import { useState } from 'react';
import { X } from 'lucide-react';
import { toInputDate } from '../../utils/format';

const emptyForm = {
  name: '',
  grand_prix: '',
  country: '',
  city: '',
  round_number: 1,
  race_date: '',
  length_km: '',
  laps: '',
  lap_record: '',
  status: 'Scheduled',
  description: '',
};

export function CircuitFormModal({ initialData, onClose, onSubmit }) {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState(
    initialData
      ? {
          name: initialData.name || '',
          grand_prix: initialData.grand_prix || '',
          country: initialData.country || '',
          city: initialData.city || '',
          round_number: initialData.round_number ?? 1,
          race_date: toInputDate(initialData.race_date),
          length_km: initialData.length_km ?? '',
          laps: initialData.laps ?? '',
          lap_record: initialData.lap_record || '',
          status: initialData.status || 'Scheduled',
          description: initialData.description || '',
        }
      : emptyForm
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await onSubmit({
        ...form,
        round_number: Number(form.round_number),
        length_km: Number(form.length_km),
        laps: Number(form.laps),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan data sirkuit.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit Sirkuit' : 'Tambah Sirkuit'}>
      <div className="modal-panel">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Edit Sirkuit' : 'Tambah Jadwal Sirkuit'}</h2>
          <button type="button" className="btn" onClick={onClose} aria-label="Tutup form">
            <X size={18} />
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="stack-md">
          <div>
            <label className="field-label" htmlFor="circuit-gp">Nama Grand Prix *</label>
            <input id="circuit-gp" name="grand_prix" className="input" value={form.grand_prix} onChange={handleChange} required />
          </div>

          <div>
            <label className="field-label" htmlFor="circuit-name">Nama Sirkuit *</label>
            <input id="circuit-name" name="name" className="input" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="circuit-country">Negara *</label>
              <input id="circuit-country" name="country" className="input" value={form.country} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label" htmlFor="circuit-city">Kota *</label>
              <input id="circuit-city" name="city" className="input" value={form.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="circuit-round">Round *</label>
              <input id="circuit-round" name="round_number" type="number" min="1" className="input" value={form.round_number} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label" htmlFor="circuit-date">Tanggal Balapan *</label>
              <input id="circuit-date" name="race_date" type="date" className="input" value={form.race_date} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="circuit-length">Panjang Trek (km) *</label>
              <input id="circuit-length" name="length_km" type="number" step="0.001" min="0.5" className="input" value={form.length_km} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label" htmlFor="circuit-laps">Jumlah Lap *</label>
              <input id="circuit-laps" name="laps" type="number" min="1" className="input" value={form.laps} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <div>
              <label className="field-label" htmlFor="circuit-record">Rekor Lap</label>
              <input id="circuit-record" name="lap_record" className="input" placeholder="1:30.983 (Pembalap)" value={form.lap_record} onChange={handleChange} />
            </div>
            <div>
              <label className="field-label" htmlFor="circuit-status">Status</label>
              <select id="circuit-status" name="status" className="input" value={form.status} onChange={handleChange}>
                <option value="Next">Next</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="circuit-desc">Deskripsi</label>
            <textarea id="circuit-desc" name="description" className="textarea" value={form.description} onChange={handleChange} />
          </div>

          <div className="action-row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" className="btn" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Sirkuit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
