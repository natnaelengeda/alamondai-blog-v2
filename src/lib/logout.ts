// lib/logout.ts
'use client';

import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { queryClient } from '@/app/provider'; // or however you're exporting it
import { store } from '@/app/store'; // Redux store
import { logout } from '@/state/user'; // your logout action
import { logError } from '@/utils/logError';

export const logoutAndClear = async () => {
  try {
    await signOut(auth);
    store.dispatch(logout());
    queryClient.clear();
  } catch (error) {
    logError('logout-and-clear', 'logout-error', 'logut', error)
    // console.error("Error logging out:", err);
  }
};
