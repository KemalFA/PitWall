import { Storage } from './storage';

const BASE_URL = '/api/teams';

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Permintaan API gagal.');
  }
  return payload;
}

export const TeamModel = {
  async getAll(search = '') {
    const query = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : '';
    try {
      const res = await requestJson(`${BASE_URL}${query}`);
      if (!search.trim()) {
        Storage.setTeams(res.data);
      }
      return { data: res.data, source: 'api' };
    } catch {
      const cached = Storage.getTeams();
      const term = search.trim().toLowerCase();
      const filtered = term
        ? cached.filter((t) =>
            [t.name, t.driver_1, t.driver_2, t.power_unit].some((v) =>
              String(v || '').toLowerCase().includes(term)
            )
          )
        : cached;
      return {
        data: [...filtered].sort((a, b) => Number(b.points) - Number(a.points)),
        source: 'local',
      };
    }
  },

  async getById(id) {
    try {
      const res = await requestJson(`${BASE_URL}/${id}`);
      return { data: res.data, source: 'api' };
    } catch {
      const found = Storage.getTeams().find((t) => Number(t.id) === Number(id)) || null;
      return { data: found, source: 'local' };
    }
  },

  async create(payload) {
    try {
      const res = await requestJson(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const current = Storage.getTeams();
      Storage.setTeams([...current, res.data]);
      return { data: res.data, source: 'api' };
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      const current = Storage.getTeams();
      const nextId = current.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
      const localItem = { ...payload, id: nextId, points: Number(payload.points) || 0, championships: Number(payload.championships) || 0 };
      Storage.setTeams([...current, localItem]);
      return { data: localItem, source: 'local' };
    }
  },

  async update(id, payload) {
    try {
      const res = await requestJson(`${BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      const updated = Storage.getTeams().map((t) => (Number(t.id) === Number(id) ? res.data : t));
      Storage.setTeams(updated);
      return { data: res.data, source: 'api' };
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      const current = Storage.getTeams();
      const localItem = { ...payload, id: Number(id), points: Number(payload.points) || 0, championships: Number(payload.championships) || 0 };
      Storage.setTeams(current.map((t) => (Number(t.id) === Number(id) ? localItem : t)));
      return { data: localItem, source: 'local' };
    }
  },

  async remove(id) {
    try {
      await requestJson(`${BASE_URL}/${id}`, { method: 'DELETE' });
      Storage.setTeams(Storage.getTeams().filter((t) => Number(t.id) !== Number(id)));
      return { source: 'api' };
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      Storage.setTeams(Storage.getTeams().filter((t) => Number(t.id) !== Number(id)));
      return { source: 'local' };
    }
  },
};
