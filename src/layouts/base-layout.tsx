import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
