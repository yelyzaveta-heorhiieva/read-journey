import React, { Children } from 'react';

export interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <section className='flex flex-col gap-5 rounded-[30px] w-full bg-[#1f1f1f] p-5 md:p-8 md:flex-row md:gap-8 xl:flex-col xl:pt-10 xl:pb-5 xl:px-5 xl:max-w-[353px] xl:gap-5'>{children}</section>
  );
}
