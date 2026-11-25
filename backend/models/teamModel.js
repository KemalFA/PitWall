import pool from '../config/db.js';

export const TeamModel = {
  async findAll(search = '') {
    if (search.trim()) {
      const term = `%${search.trim()}%`;
      const { rows } = await pool.query(
        `SELECT * FROM teams
         WHERE name ILIKE $1
            OR driver_1 ILIKE $1
            OR driver_2 ILIKE $1
            OR power_unit ILIKE $1
         ORDER BY points DESC, id ASC`,
        [term]
      );
      return rows;
    }

    const { rows } = await pool.query('SELECT * FROM teams ORDER BY points DESC, id ASC');
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM teams WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const {
      name,
      base,
      team_principal,
      power_unit,
      driver_1,
      driver_2,
      points = 0,
      championships = 0,
      accent_color = '#E10600',
      description = '',
    } = data;

    const { rows } = await pool.query(
      `INSERT INTO teams
        (name, base, team_principal, power_unit, driver_1, driver_2, points, championships, accent_color, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        name,
        base,
        team_principal,
        power_unit,
        driver_1,
        driver_2,
        Number(points) || 0,
        Number(championships) || 0,
        accent_color || '#E10600',
        description || '',
      ]
    );
    return rows[0];
  },

  async update(id, data) {
    const {
      name,
      base,
      team_principal,
      power_unit,
      driver_1,
      driver_2,
      points,
      championships,
      accent_color,
      description,
    } = data;

    const { rows } = await pool.query(
      `UPDATE teams
       SET name = $1,
           base = $2,
           team_principal = $3,
           power_unit = $4,
           driver_1 = $5,
           driver_2 = $6,
           points = $7,
           championships = $8,
           accent_color = $9,
           description = $10
       WHERE id = $11
       RETURNING *`,
      [
        name,
        base,
        team_principal,
        power_unit,
        driver_1,
        driver_2,
        Number(points) || 0,
        Number(championships) || 0,
        accent_color || '#E10600',
        description || '',
        id,
      ]
    );
    return rows[0] || null;
  },

  async remove(id) {
    const { rows } = await pool.query('DELETE FROM teams WHERE id = $1 RETURNING *', [id]);
    return rows[0] || null;
  },
};
