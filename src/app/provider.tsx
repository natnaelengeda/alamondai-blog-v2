"use client";

import React, { useEffect } from 'react'

// Mantine
import { MantineProvider } from '@mantine/core';

// Components
import Header from '@/components/header';
import Footer from '@/components/footer';

// Firebase
import { analytics } from '@/lib/firebase';
import { logEvent } from "firebase/analytics";

// React Query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// State
import { Provider as StateProvider } from 'react-redux';
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

// Toast
import { Toaster } from 'react-hot-toast';

// Progress Bar
// import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const queryClient = new QueryClient()
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Create a client

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "screen_view", {
        firebase_screen: "HomePage",
        firebase_screen_class: "Home",
      })
    }
  }, []);

  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <StateProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <div
              className="w-full min-h-[calc(100vh-10rem)] pb-5 scroll-smooth">
              {children}
              {/* <ProgressBar
                height="10px"
                color="#C32122"
                options={{ showSpinner: false }}
                shallowRouting /> */}
              <Toaster />
            </div>
            <Footer />
          </PersistGate>
        </StateProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}


