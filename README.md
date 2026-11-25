# PitWall — Katalog Tim Balap & Jadwal Sirkuit Formula 1

Tugas Akhir Praktikum Pemrograman Perangkat Bergerak.

## Identitas
- **Nama:** Muhammad Kemal Fikri Aldafi
- **NIM:** 21120124130084

## Arsitektur (MVC)
- `backend/`: Express REST API dengan PostgreSQL (Neon)
  - `config/db.js`: Konfigurasi koneksi PostgreSQL
  - `models/`: Query database (`teamModel.js`, `circuitModel.js`)
  - `controllers/`: Logika handler request/response (`teamController.js`, `circuitController.js`)
  - `routes/`: Endpoint `/api/teams` dan `/api/circuits`
- `frontend/`: React + Vite PWA
  - `src/models/`: Integrasi API + fallback penyimpanan `localStorage`
  - `src/controllers/`: State management, filter, dan routing
  - `src/views/`: Halaman dan komponen UI

## Menjalankan Project
1. **Backend**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **Build PWA**
   ```bash
   cd frontend
   npm run build
   ```
