import pool from '../config/db.js';

export const CircuitModel = {
  async findAll({ status = '', search = '' } = {}) {
    const conditions = [];
    const params = [];

    if (status.trim() && status !== 'All') {
      params.push(status.trim());
      conditions.push(`status = $${params.length}`);
    }

    if (search.trim()) {
      params.push(`%${search.trim()}%`);
      const idx = params.length;
      conditions.push(
        `(name ILIKE $${idx} OR grand_prix ILIKE $${idx} OR country ILIKE $${idx} OR city ILIKE $${idx})`
      );
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const { rows } = await pool.query(
      `SELECT * FROM circuits ${whereClause} ORDER BY round_number ASC, id ASC`,
      params
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM circuits WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const {
      name,
      grand_prix,
      country,
      city,
      round_number,
      race_date,
      length_km,
      laps,
      lap_record = '',
      status = 'Scheduled',
      description = '',
    } = data;

    const { rows } = await pool.query(
      `INSERT INTO circuits
        (name, grand_prix, country, city, round_number, race_date, length_km, laps, lap_record, status, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        name,
        grand_prix,
        country,
        city,
        Number(round_number),
        race_date,
        Number(length_km),
        Number(laps),
        lap_record || '',
        status || 'Scheduled',
        description || '',
      ]
    );
    return rows[0];
  },

  async update(id, data) {
    const {
      name,
      grand_prix,
      country,
      city,
      round_number,
      race_date,
      length_km,
      laps,
      lap_record,
      status,
      description,
    } = data;

    const { rows } = await pool.query(
      `UPDATE circuits
       SET name = $1,
           grand_prix = $2,
           country = $3,
           city = $4,
           round_number = $5,
           race_date = $6,
           length_km = $7,
           laps = $8,
           lap_record = $9,
           status = $10,
           description = $11
       WHERE id = $12
       RETURNING *`,
      [
        name,
        grand_prix,
        country,
        city,
        Number(round_number),
        race_date,
        Number(length_km),
        Number(laps),
        lap_record || '',
        status || 'Scheduled',
        description || '',
        id,
      ]
    );
    return rows[0] || null;
  },

  async remove(id) {
    const { rows } = await pool.query('DELETE FROM circuits WHERE id = $1 RETURNING *', [id]);
    return rows[0] || null;
  },
};
