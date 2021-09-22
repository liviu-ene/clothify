import { useUser } from './User';

export default function ({ children }) {
  const me = useUser();
  if (me.role.canManageProducts === true) {
    return children;
  } else {
    return null;
  }
}
