import { useState, useEffect, useCallback } from 'react';
import { TeamModel } from '../models/teamModel';

export function useTeamsController() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('api');
  const [search, setSearch] = useState('');

  const fetchTeams = useCallback(async (query = search) => {
    setLoading(true);
    setError('');
    try {
      const res = await TeamModel.getAll(query);
      setTeams(res.data);
      setSource(res.source);
    } catch (err) {
      setError(err.message || 'Gagal memuat data tim.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchTeams(search);
  }, [search, fetchTeams]);

  const createTeam = useCallback(async (payload) => {
    const res = await TeamModel.create(payload);
    setSource(res.source);
    await fetchTeams('');
    return res.data;
  }, [fetchTeams]);

  const updateTeam = useCallback(async (id, payload) => {
    const res = await TeamModel.update(id, payload);
    setSource(res.source);
    await fetchTeams(search);
    return res.data;
  }, [fetchTeams, search]);

  const deleteTeam = useCallback(async (id) => {
    const res = await TeamModel.remove(id);
    setSource(res.source);
    await fetchTeams(search);
  }, [fetchTeams, search]);

  return {
    teams,
    loading,
    error,
    source,
    search,
    setSearch,
    refresh: () => fetchTeams(search),
    createTeam,
    updateTeam,
    deleteTeam,
  };
}
