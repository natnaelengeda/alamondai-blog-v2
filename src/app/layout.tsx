
import type { Metadata } from "next";

// Provider 
import Provider from "./provider";

// MetaData 
import { meta } from "@/meta/metadata";

// Styles
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

export const metadata: Metadata = meta

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
        </Provider>
      </body>
    </html>
  );
}
