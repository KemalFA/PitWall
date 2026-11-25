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
      driver_1_points = 0,
      driver_2_points = 0,
      points,
      championships = 0,
      accent_color = '#E10600',
      description = '',
    } = data;

    const p1 = Number(driver_1_points) || 0;
    const p2 = Number(driver_2_points) || 0;
    const totalPoints = points !== undefined && points !== '' ? Number(points) || 0 : p1 + p2;

    const { rows } = await pool.query(
      `INSERT INTO teams
        (name, base, team_principal, power_unit, driver_1, driver_2, driver_1_points, driver_2_points, points, championships, accent_color, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        name,
        base,
        team_principal,
        power_unit,
        driver_1,
        driver_2,
        p1,
        p2,
        totalPoints,
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
      driver_1_points = 0,
      driver_2_points = 0,
      points,
      championships,
      accent_color,
      description,
    } = data;

    const p1 = Number(driver_1_points) || 0;
    const p2 = Number(driver_2_points) || 0;
    const totalPoints = points !== undefined && points !== '' ? Number(points) || 0 : p1 + p2;

    const { rows } = await pool.query(
      `UPDATE teams
       SET name = $1,
           base = $2,
           team_principal = $3,
           power_unit = $4,
           driver_1 = $5,
           driver_2 = $6,
           driver_1_points = $7,
           driver_2_points = $8,
           points = $9,
           championships = $10,
           accent_color = $11,
           description = $12
       WHERE id = $13
       RETURNING *`,
      [
        name,
        base,
        team_principal,
        power_unit,
        driver_1,
        driver_2,
        p1,
        p2,
        totalPoints,
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
