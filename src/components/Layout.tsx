import React, { Suspense } from 'react';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../redux/selectors';

export interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isLoading = useSelector(selectIsLoading)
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
     {isLoading && <Loader />}
    </>
  );
};
