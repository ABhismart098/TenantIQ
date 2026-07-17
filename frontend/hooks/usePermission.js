import { useState, useCallback } from 'react';
import permissionService from '../services/permission.service';

export function usePermission(token) {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPermissions = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const result = await permissionService.getUserPermissions(token);
      setPermissions(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const can = useCallback((action, resource) => {
    return permissions.some(p => p.action === action && p.resource === resource);
  }, [permissions]);

  return {
    permissions,
    isLoading,
    error,
    loadPermissions,
    can
  };
}
