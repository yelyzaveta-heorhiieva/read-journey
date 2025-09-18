import React, { Children } from 'react';

export interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <section className='rounded-[30px] bg-[#1f1f1f] p-5'>{children}</section>
  );
}
