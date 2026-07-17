import { useMemo } from 'react';

export function useRole(user) {
  const roleInfo = useMemo(() => {
    if (!user?.role) return null;

    const roles = {
      ADMIN: { id: 1, name: 'Admin', label: 'Administrator' },
      TENANT: { id: 2, name: 'Tenant', label: 'Tenant' },
      PROPERTY_MANAGER: { id: 3, name: 'Property Manager', label: 'Property Manager' },
      OWNER: { id: 4, name: 'Owner', label: 'Property Owner' }
    };

    return roles[user.role] || null;
  }, [user?.role]);

  const isAdmin = useMemo(() => user?.role === 'ADMIN', [user?.role]);
  const isOwner = useMemo(() => user?.role === 'OWNER', [user?.role]);
  const isPropertyManager = useMemo(() => user?.role === 'PROPERTY_MANAGER', [user?.role]);
  const isTenant = useMemo(() => user?.role === 'TENANT', [user?.role]);

  return {
    roleInfo,
    isAdmin,
    isOwner,
    isPropertyManager,
    isTenant
  };
}
