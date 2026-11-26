import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TopBar } from './views/components/TopBar';
import { BottomNav } from './views/components/BottomNav';
import { HomePage } from './views/pages/HomePage';
import { TeamsPage } from './views/pages/TeamsPage';
import { TeamDetailPage } from './views/pages/TeamDetailPage';
import { CircuitsPage } from './views/pages/CircuitsPage';
import { CircuitDetailPage } from './views/pages/CircuitDetailPage';
import { LeaderboardPage } from './views/pages/LeaderboardPage';
import { ProfilePage } from './views/pages/ProfilePage';
import { useTeamsController } from './controllers/useTeamsController';
import { useCircuitsController } from './controllers/useCircuitsController';

export default function App() {
  const teamsCtrl = useTeamsController();
  const circuitsCtrl = useCircuitsController();

  return (
    <BrowserRouter>
      <div className="app-shell">
        <TopBar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage teams={teamsCtrl.teams} circuits={circuitsCtrl.circuits} />}
            />
            <Route path="/teams" element={<TeamsPage controller={teamsCtrl} />} />
            <Route path="/teams/:id" element={<TeamDetailPage controller={teamsCtrl} />} />
            <Route
              path="/leaderboard"
              element={<LeaderboardPage teams={teamsCtrl.teams} loading={teamsCtrl.loading} />}
            />
            <Route path="/circuits" element={<CircuitsPage controller={circuitsCtrl} />} />
            <Route path="/circuits/:id" element={<CircuitDetailPage controller={circuitsCtrl} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
