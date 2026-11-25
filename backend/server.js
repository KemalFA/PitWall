import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import teamRoutes from './routes/teamRoutes.js';
import circuitRoutes from './routes/circuitRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected', message: err.message });
  }
});

app.use('/api/teams', teamRoutes);
app.use('/api/circuits', circuitRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
});

app.listen(PORT, () => {
  console.log(`PitWall API berjalan di http://localhost:${PORT}`);
});
