import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Shield, Trophy, Flag, User } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Beranda', Icon: Home },
  { path: '/teams', label: 'Tim', Icon: Shield },
  { path: '/leaderboard', label: 'Klasemen', Icon: Trophy },
  { path: '/circuits', label: 'Sirkuit', Icon: Flag },
  { path: '/profile', label: 'Profil', Icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isPathActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      <div className="bottom-nav-inner">
        {navItems.map(({ path, label, Icon }) => {
          const isActive = isPathActive(path);
          return (
            <button
              key={path}
              type="button"
              className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
              onClick={() => navigate(path)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
