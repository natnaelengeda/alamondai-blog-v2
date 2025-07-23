// "use client"

import type { Metadata } from "next";

// Provider 
import Provider from "./provider";

// MetaData 
import { meta } from "@/meta/metadata";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


// Styles
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          {/* <ProgressBar
            height="10px"
            color="#C32122"
            options={{ showSpinner: false }}
            shallowRouting /> */}
        </Provider>
      </body>
    </html>
  );
}
