import { TopBar } from './views/components/TopBar';
import { BottomNav } from './views/components/BottomNav';
import { HomePage } from './views/pages/HomePage';
import { TeamsPage } from './views/pages/TeamsPage';
import { TeamDetailPage } from './views/pages/TeamDetailPage';
import { CircuitsPage } from './views/pages/CircuitsPage';
import { CircuitDetailPage } from './views/pages/CircuitDetailPage';
import { ProfilePage } from './views/pages/ProfilePage';
import { useRouterController } from './controllers/useRouterController';
import { useTeamsController } from './controllers/useTeamsController';
import { useCircuitsController } from './controllers/useCircuitsController';

export default function App() {
  const { route, activeTab, navigate } = useRouterController();
  const teamsCtrl = useTeamsController();
  const circuitsCtrl = useCircuitsController();

  const dataSource =
    teamsCtrl.source === 'api' && circuitsCtrl.source === 'api' ? 'api' : 'local';

  const handleSyncAll = () => {
    teamsCtrl.refresh();
    circuitsCtrl.refresh();
  };

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            teams={teamsCtrl.teams}
            circuits={circuitsCtrl.circuits}
            onNavigate={navigate}
          />
        );
      case 'teams':
        return <TeamsPage controller={teamsCtrl} onNavigate={navigate} />;
      case 'team-detail':
        return (
          <TeamDetailPage
            teamId={route.id}
            controller={teamsCtrl}
            onNavigate={navigate}
          />
        );
      case 'circuits':
        return <CircuitsPage controller={circuitsCtrl} onNavigate={navigate} />;
      case 'circuit-detail':
        return (
          <CircuitDetailPage
            circuitId={route.id}
            controller={circuitsCtrl}
            onNavigate={navigate}
          />
        );
      case 'profile':
        return <ProfilePage dataSource={dataSource} onSync={handleSyncAll} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <TopBar dataSource={dataSource} />
      <main className="main-content">{renderPage()}</main>
      <BottomNav activeTab={activeTab} onNavigate={navigate} />
    </div>
  );
}
