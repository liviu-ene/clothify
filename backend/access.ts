import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
};

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // do they have permission?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // if not, do they own item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // do they have permission?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not, do they own item?
    return { user: { id: session.itemId } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // do they have permission?
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // if not, they may only update themsleves
    return { id: session.itemId };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    // do they have permission?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not, do they own item?
    return { id: session.itemId };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true; // they can read everything
    }
    // they only see available products (based on status field)
    return { status: 'AVAILABLE' };
  },
};
