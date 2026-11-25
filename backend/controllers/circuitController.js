import { CircuitModel } from '../models/circuitModel.js';

const requiredFields = [
  'name',
  'grand_prix',
  'country',
  'city',
  'round_number',
  'race_date',
  'length_km',
  'laps',
];

function findMissingFields(body) {
  return requiredFields.filter(
    (field) => body?.[field] === undefined || body?.[field] === null || String(body[field]).trim() === ''
  );
}

export const CircuitController = {
  async getAll(req, res, next) {
    try {
      const status = req.query.status || '';
      const search = req.query.search || '';
      const circuits = await CircuitModel.findAll({ status, search });
      res.json({ data: circuits });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID sirkuit tidak valid.' });
      }

      const circuit = await CircuitModel.findById(id);
      if (!circuit) {
        return res.status(404).json({ error: 'Sirkuit tidak ditemukan.' });
      }

      res.json({ data: circuit });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const missing = findMissingFields(req.body);
      if (missing.length > 0) {
        return res.status(400).json({
          error: `Field wajib belum diisi: ${missing.join(', ')}`,
        });
      }

      const created = await CircuitModel.create(req.body);
      res.status(201).json({ data: created });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID sirkuit tidak valid.' });
      }

      const missing = findMissingFields(req.body);
      if (missing.length > 0) {
        return res.status(400).json({
          error: `Field wajib belum diisi: ${missing.join(', ')}`,
        });
      }

      const updated = await CircuitModel.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Sirkuit tidak ditemukan.' });
      }

      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID sirkuit tidak valid.' });
      }

      const deleted = await CircuitModel.remove(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Sirkuit tidak ditemukan.' });
      }

      res.json({ message: 'Sirkuit berhasil dihapus.', data: deleted });
    } catch (err) {
      next(err);
    }
  },
};
