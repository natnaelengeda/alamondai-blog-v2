// lib/logout.ts
'use client';

import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { queryClient } from '@/app/provider'; // or however you're exporting it
import { store } from '@/app/store'; // Redux store
import { logout } from '@/state/user'; // your logout action

export const logoutAndClear = async () => {
  try {
    await signOut(auth);
    store.dispatch(logout());
    queryClient.clear();
  } catch (err) {
    console.error("Error logging out:", err);
  }
};
