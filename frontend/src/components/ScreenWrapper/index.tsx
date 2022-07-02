import React from 'react';

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
}

import './styles.css';

export function ScreenWrapper({
  children,
  className = '',
}: ScreenWrapperProps) {
  return <div className={`screen-wrapper ${className}`}>{children}</div>;
}
