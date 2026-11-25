import { Storage } from './storage';

const BASE_URL = '/api/circuits';

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

export const CircuitModel = {
  async getAll({ status = 'All', search = '' } = {}) {
    const params = new URLSearchParams();
    if (status && status !== 'All') params.set('status', status);
    if (search.trim()) params.set('search', search.trim());
    const qs = params.toString() ? `?${params.toString()}` : '';

    try {
      const res = await requestJson(`${BASE_URL}${qs}`);
      if ((!status || status === 'All') && !search.trim()) {
        Storage.setCircuits(res.data);
      }
      return { data: res.data, source: 'api' };
    } catch {
      let cached = Storage.getCircuits();
      if (status && status !== 'All') {
        cached = cached.filter((c) => c.status === status);
      }
      const term = search.trim().toLowerCase();
      if (term) {
        cached = cached.filter((c) =>
          [c.name, c.grand_prix, c.country, c.city].some((v) =>
            String(v || '').toLowerCase().includes(term)
          )
        );
      }
      return {
        data: [...cached].sort((a, b) => Number(a.round_number) - Number(b.round_number)),
        source: 'local',
      };
    }
  },

  async getById(id) {
    try {
      const res = await requestJson(`${BASE_URL}/${id}`);
      return { data: res.data, source: 'api' };
    } catch {
      const found = Storage.getCircuits().find((c) => Number(c.id) === Number(id)) || null;
      return { data: found, source: 'local' };
    }
  },

  async create(payload) {
    try {
      const res = await requestJson(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const current = Storage.getCircuits();
      Storage.setCircuits([...current, res.data]);
      return { data: res.data, source: 'api' };
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      const current = Storage.getCircuits();
      const nextId = current.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
      const localItem = {
        ...payload,
        id: nextId,
        round_number: Number(payload.round_number),
        laps: Number(payload.laps),
      };
      Storage.setCircuits([...current, localItem]);
      return { data: localItem, source: 'local' };
    }
  },

  async update(id, payload) {
    try {
      const res = await requestJson(`${BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      const updated = Storage.getCircuits().map((c) =>
        Number(c.id) === Number(id) ? res.data : c
      );
      Storage.setCircuits(updated);
      return { data: res.data, source: 'api' };
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      const current = Storage.getCircuits();
      const localItem = {
        ...payload,
        id: Number(id),
        round_number: Number(payload.round_number),
        laps: Number(payload.laps),
      };
      Storage.setCircuits(current.map((c) => (Number(c.id) === Number(id) ? localItem : c)));
      return { data: localItem, source: 'local' };
    }
  },

  async remove(id) {
    try {
      await requestJson(`${BASE_URL}/${id}`, { method: 'DELETE' });
      Storage.setCircuits(Storage.getCircuits().filter((c) => Number(c.id) !== Number(id)));
      return { source: 'api' };
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      Storage.setCircuits(Storage.getCircuits().filter((c) => Number(c.id) !== Number(id)));
      return { source: 'local' };
    }
  },
};
