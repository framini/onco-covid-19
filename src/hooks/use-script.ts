import React from 'react';

const isBrowser = typeof document !== 'undefined';

type ScriptStatus = 'idle' | 'loading' | 'loaded' | 'error';

export const useScript = (src: string): ScriptStatus => {
  const [status, setStatus] = React.useState<ScriptStatus>('idle');

  React.useEffect(() => {
    if (!isBrowser) return;

    setStatus('loading');

    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', src);

    const handleLoad = () => {
      setStatus('loaded');
    };
    const handleError = () => {
      setStatus('error');
    };

    scriptEl.addEventListener('load', handleLoad);
    scriptEl.addEventListener('error', handleError);

    document.body.appendChild(scriptEl);

    return () => {
      scriptEl.removeEventListener('load', handleLoad);
      scriptEl.removeEventListener('error', handleError);
    };
  }, [src]);

  return status;
};
