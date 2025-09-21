import React from 'react';
import { Tile } from '@carbon/react';
import { ErrorBoundary } from 'react-error-boundary';
import { WarningAltFilled } from '@carbon/icons-react';

interface IPanelProps {
  children: React.ReactElement;
  className?: string;
}

export const Panel: React.FC<IPanelProps> = ({ children, className }) => {
  const classes = ['border-1 border-[var(--cds-border-subtle)]', className || ''].join(' ').trim();

  const ErrorComponent = () => (
    <div className="flex gap-2 justify-center items-center h-full w-full text-red-300">
      <WarningAltFilled />
      <p>Failed to load panel content</p>
    </div>
  );

  return (
    <Tile className={classes}>
      <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary>
    </Tile>
  );
};
