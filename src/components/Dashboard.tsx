import React, { Children } from 'react';

export interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <section className='flex flex-col rounded-[30px] bg-[#1f1f1f] p-5 md:p-8 md:flex-row md:gap-8'>{children}</section>
  );
}
