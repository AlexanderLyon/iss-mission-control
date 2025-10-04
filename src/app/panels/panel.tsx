import React from 'react';
import { Tile, SkeletonPlaceholder } from '@carbon/react';
import { ErrorBoundary } from 'react-error-boundary';
import { WarningAltFilled } from '@carbon/icons-react';

interface IPanelProps {
  children: React.ReactElement;
  isLoading?: boolean;
  className?: string;
}

export const Panel: React.FC<IPanelProps> = ({ children, isLoading, className }) => {
  const classes = [
    'clip-angled-corners border-1 border-[var(--cds-border-subtle)]',
    isLoading ? 'Panel__Loading' : '',
    className || '',
  ]
    .join(' ')
    .trim();

  const ErrorComponent = () => (
    <div className="flex gap-2 justify-center items-center h-full w-full text-red-300">
      <WarningAltFilled />
      <p>Failed to load panel content</p>
    </div>
  );

  if (isLoading) {
    return <SkeletonPlaceholder className={classes} />;
  }

  return (
    <Tile className={classes}>
      <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary>
    </Tile>
  );
};
