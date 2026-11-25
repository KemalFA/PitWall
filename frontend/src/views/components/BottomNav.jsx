import { Home, Shield, Flag, User } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Beranda', Icon: Home },
  { id: 'teams', label: 'Tim', Icon: Shield },
  { id: 'circuits', label: 'Sirkuit', Icon: Flag },
  { id: 'profile', label: 'Profil', Icon: User },
];

export function BottomNav({ activeTab, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      <div className="bottom-nav-inner">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
              onClick={() => onNavigate(id)}
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
