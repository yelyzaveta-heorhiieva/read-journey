import React, { Suspense } from 'react';

export interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
};
