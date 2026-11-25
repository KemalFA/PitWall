import { TeamModel } from '../models/teamModel.js';

const requiredFields = ['name', 'base', 'team_principal', 'power_unit', 'driver_1', 'driver_2'];

function findMissingFields(body) {
  return requiredFields.filter((field) => !body?.[field] || String(body[field]).trim() === '');
}

export const TeamController = {
  async getAll(req, res, next) {
    try {
      const search = req.query.search || '';
      const teams = await TeamModel.findAll(search);
      res.json({ data: teams });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID tim tidak valid.' });
      }

      const team = await TeamModel.findById(id);
      if (!team) {
        return res.status(404).json({ error: 'Tim tidak ditemukan.' });
      }

      res.json({ data: team });
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

      const created = await TeamModel.create(req.body);
      res.status(201).json({ data: created });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID tim tidak valid.' });
      }

      const missing = findMissingFields(req.body);
      if (missing.length > 0) {
        return res.status(400).json({
          error: `Field wajib belum diisi: ${missing.join(', ')}`,
        });
      }

      const updated = await TeamModel.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Tim tidak ditemukan.' });
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
        return res.status(400).json({ error: 'ID tim tidak valid.' });
      }

      const deleted = await TeamModel.remove(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Tim tidak ditemukan.' });
      }

      res.json({ message: 'Tim berhasil dihapus.', data: deleted });
    } catch (err) {
      next(err);
    }
  },
};
