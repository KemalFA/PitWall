import { useState, useEffect, useCallback } from 'react';
import { CircuitModel } from '../models/circuitModel';

export function useCircuitsController() {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('api');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchCircuits = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await CircuitModel.getAll({ status: statusFilter, search });
      setCircuits(res.data);
      setSource(res.source);
    } catch (err) {
      setError(err.message || 'Gagal memuat jadwal sirkuit.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    fetchCircuits();
  }, [fetchCircuits]);

  const createCircuit = useCallback(async (payload) => {
    const res = await CircuitModel.create(payload);
    setSource(res.source);
    await fetchCircuits();
    return res.data;
  }, [fetchCircuits]);

  const updateCircuit = useCallback(async (id, payload) => {
    const res = await CircuitModel.update(id, payload);
    setSource(res.source);
    await fetchCircuits();
    return res.data;
  }, [fetchCircuits]);

  const deleteCircuit = useCallback(async (id) => {
    const res = await CircuitModel.remove(id);
    setSource(res.source);
    await fetchCircuits();
  }, [fetchCircuits]);

  return {
    circuits,
    loading,
    error,
    source,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    refresh: fetchCircuits,
    createCircuit,
    updateCircuit,
    deleteCircuit,
  };
}
