import type * as React from 'react';

declare global {
  interface Window {
    google: typeof google;
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'gmp-map-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          mode?: string;
          range?: string;
          tilt?: string;
          heading?: string;
          'min-altitude'?: string;
          defaultUIDisabled?: boolean;
        };
      }
    }
  }
}

export {};
