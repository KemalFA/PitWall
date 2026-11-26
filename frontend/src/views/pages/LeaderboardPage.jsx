import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function LeaderboardPage({ teams, loading }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('constructors');

  const constructorStandings = useMemo(() => {
    return [...teams].sort((a, b) => Number(b.points) - Number(a.points));
  }, [teams]);

  const driverStandings = useMemo(() => {
    const list = [];
    for (const team of teams) {
      if (team.driver_1) {
        list.push({
          key: `${team.id}-1`,
          name: team.driver_1,
          points: Number(team.driver_1_points) || 0,
          teamId: team.id,
          teamName: team.name,
          accentColor: team.accent_color || '#E10600',
        });
      }
      if (team.driver_2) {
        list.push({
          key: `${team.id}-2`,
          name: team.driver_2,
          points: Number(team.driver_2_points) || 0,
          teamId: team.id,
          teamName: team.name,
          accentColor: team.accent_color || '#E10600',
        });
      }
    }
    return list.sort((a, b) => b.points - a.points);
  }, [teams]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1 className="page-title">Klasemen</h1>
          <p className="page-subtitle">Peringkat poin konstruktor dan pembalap musim ini.</p>
        </div>
      </div>

      <div className="filter-row" role="tablist" aria-label="Kategori klasemen" style={{ marginBottom: 16 }}>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'constructors'}
          className={`chip ${tab === 'constructors' ? 'chip--active' : ''}`}
          onClick={() => setTab('constructors')}
        >
          Konstruktor
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'drivers'}
          className={`chip ${tab === 'drivers' ? 'chip--active' : ''}`}
          onClick={() => setTab('drivers')}
        >
          Pembalap
        </button>
      </div>

      {loading ? (
        <div className="card">Memuat klasemen...</div>
      ) : tab === 'constructors' ? (
        constructorStandings.length === 0 ? (
          <div className="card">Belum ada data konstruktor.</div>
        ) : (
          <div className="stack-sm">
            {constructorStandings.map((team, index) => (
              <button
                key={team.id}
                type="button"
                className="list-card"
                onClick={() => navigate(`/teams/${team.id}`)}
              >
                <div className="team-card-lead" style={{ alignItems: 'center' }}>
                  <span className={`rank-num tabular ${index === 0 ? 'rank-num--first' : ''}`}>
                    {index + 1}
                  </span>
                  <span
                    className="team-stripe"
                    style={{ backgroundColor: team.accent_color || '#E10600', alignSelf: 'stretch' }}
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="item-title">{team.name}</h2>
                    <p className="item-meta">
                      {team.driver_1} &middot; {team.driver_2}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="points-box">
                    <span className="points-num tabular">{team.points}</span>
                    <span className="points-label">PTS</span>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        )
      ) : driverStandings.length === 0 ? (
        <div className="card">Belum ada data pembalap.</div>
      ) : (
        <div className="stack-sm">
          {driverStandings.map((driver, index) => (
            <button
              key={driver.key}
              type="button"
              className="list-card"
              onClick={() => navigate(`/teams/${driver.teamId}`)}
            >
              <div className="team-card-lead" style={{ alignItems: 'center' }}>
                <span className={`rank-num tabular ${index === 0 ? 'rank-num--first' : ''}`}>
                  {index + 1}
                </span>
                <span
                  className="team-stripe"
                  style={{ backgroundColor: driver.accentColor, alignSelf: 'stretch' }}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="item-title">{driver.name}</h2>
                  <p className="item-meta">{driver.teamName}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="points-box">
                  <span className="points-num tabular">{driver.points}</span>
                  <span className="points-label">PTS</span>
                </div>
                <ChevronRight size={18} color="var(--text-muted)" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
