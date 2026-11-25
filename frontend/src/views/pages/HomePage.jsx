import { ChevronRight } from 'lucide-react';
import { formatRaceDate } from '../../utils/format';

export function HomePage({ teams, circuits, onNavigate }) {
  const nextRace =
    circuits.find((c) => c.status === 'Next') ||
    circuits.find((c) => c.status === 'Scheduled') ||
    circuits[0] ||
    null;

  const topTeams = [...teams]
    .sort((a, b) => Number(b.points) - Number(a.points))
    .slice(0, 3);

  return (
    <section className="stack-lg">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">PitWall Overview</h1>
          <p className="page-subtitle">Katalog tim balap dan jadwal sirkuit Formula 1.</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <p className="stat-label">Konstruktor</p>
          <p className="stat-value tabular">{teams.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Seri Sirkuit</p>
          <p className="stat-value tabular">{circuits.length}</p>
        </div>
      </div>

      {nextRace && (
        <div>
          <div className="section-heading">
            <span>Balapan Terdekat</span>
            <button type="button" className="link-btn" onClick={() => onNavigate('circuits')}>
              Semua jadwal <ChevronRight size={16} />
            </button>
          </div>
          <button
            type="button"
            className="list-card"
            onClick={() => onNavigate('circuit-detail', nextRace.id)}
          >
            <div className="stack-sm" style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="badge badge--next">Round {nextRace.round_number}</span>
                <span className="badge">{nextRace.status}</span>
              </div>
              <h2 className="item-title">{nextRace.grand_prix}</h2>
              <p className="item-meta">
                {nextRace.name} &middot; {nextRace.city}, {nextRace.country}
              </p>
              <p className="item-meta tabular">
                {formatRaceDate(nextRace.race_date)} &middot; {nextRace.laps} lap ({nextRace.length_km} km)
              </p>
            </div>
            <ChevronRight size={20} color="var(--text-muted)" aria-hidden="true" />
          </button>
        </div>
      )}

      <div>
        <div className="section-heading">
          <span>Klasemen Konstruktor Teratas</span>
          <button type="button" className="link-btn" onClick={() => onNavigate('teams')}>
            Semua tim <ChevronRight size={16} />
          </button>
        </div>

        <div className="stack-sm">
          {topTeams.map((team) => (
            <button
              key={team.id}
              type="button"
              className="list-card"
              onClick={() => onNavigate('team-detail', team.id)}
            >
              <div className="team-card-lead">
                <span
                  className="team-stripe"
                  style={{ backgroundColor: team.accent_color || '#E10600' }}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="item-title">{team.name}</h3>
                  <p className="item-meta">
                    {team.driver_1} &middot; {team.driver_2}
                  </p>
                </div>
              </div>
              <div className="points-box">
                <span className="points-num tabular">{team.points}</span>
                <span className="points-label">PTS</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
