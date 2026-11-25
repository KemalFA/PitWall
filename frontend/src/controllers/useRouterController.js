import { useState, useEffect, useCallback } from 'react';

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { page: 'home', id: null };

  const [segment, param] = raw.split('/');
  if (segment === 'teams' && param) {
    return { page: 'team-detail', id: Number(param) };
  }
  if (segment === 'circuits' && param) {
    return { page: 'circuit-detail', id: Number(param) };
  }
  if (['home', 'teams', 'circuits', 'profile'].includes(segment)) {
    return { page: segment, id: null };
  }
  return { page: 'home', id: null };
}

export function useRouterController() {
  const [route, setRoute] = useState(() => parseHash());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((page, id = null) => {
    let targetHash = `#/${page}`;
    if (page === 'team-detail' && id) targetHash = `#/teams/${id}`;
    if (page === 'circuit-detail' && id) targetHash = `#/circuits/${id}`;

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    } else {
      setRoute({ page, id });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const activeTab =
    route.page === 'team-detail'
      ? 'teams'
      : route.page === 'circuit-detail'
        ? 'circuits'
        : route.page;

  return { route, activeTab, navigate };
}
