import React from 'react';
import type { Metadata, Viewport } from 'next';
import basePath from '../basePath';
import './globals.css';

export const metadata: Metadata = {
  title: 'Contact Book',
  description: 'Web site created using create-react-app',
  // Next only basePath-prefixes its own auto-discovered metadata files
  // (e.g. app/icon.png), not plain strings here, so these are prefixed
  // manually against the same basePath.js next.config.js uses.
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/logo192.png`,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <link
        href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@700&family=Roboto:ital,wght@0,100;0,400;0,500;0,700;0,900;1,300&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossOrigin="anonymous"
      />
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
