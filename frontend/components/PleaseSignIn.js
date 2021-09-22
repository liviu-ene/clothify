import SignIn from './SignIn';
import { useUser } from './User';
import Router from 'next/router';

export default function ({ children }) {
  const me = useUser();
  if (!me) {
    return null;
  } else {
    return children;
  }
}
