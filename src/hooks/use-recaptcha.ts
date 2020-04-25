import React from 'react';

import { useScript } from './use-script';

export const useRecaptcha = (action: string): (() => Promise<string>) => {
  const scriptStatus = useScript(
    `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_PUBLIC}`,
  );

  const getToken = React.useCallback(async () => {
    if (scriptStatus === 'loaded') {
      // @ts-ignore
      const grecaptcha = window.grecaptcha;

      return new Promise<string>((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(process.env.RECAPTCHA_PUBLIC, { action })
            .then((t: string) => {
              resolve(t);
            });
        });
      });
    } else if (scriptStatus === 'error') {
      return Promise.reject('error');
    } else if (scriptStatus === 'loading') {
      return Promise.resolve('loading');
    }

    return Promise.resolve('idle');
  }, [scriptStatus]);

  // const getToken = React.useCallback(() => {
  //   // @ts-ignore
  //   const grecaptcha = window.grecaptcha;

  //   grecaptcha.ready(() => {
  //     grecaptcha
  //       .execute(process.env.RECAPTCHA_PUBLIC, { action })
  //       .then((t: string) => {

  //         setToken(t);

  //       });
  //   });
  // }, [])

  // React.useEffect(() => {
  //   let ignore = false;

  //   if (scriptStatus === 'loaded') {
  //     // @ts-ignore
  //     const grecaptcha = window.grecaptcha;

  //     grecaptcha.ready(() => {
  //       grecaptcha
  //         .execute(process.env.RECAPTCHA_PUBLIC, { action })
  //         .then((token: string) => {
  //           if (!ignore) {
  //             console.log('token', token);

  //             setToken(token);
  //           }
  //         });
  //     });
  //   } else if (scriptStatus === 'error') {
  //     console.log('ALGO FUE MAL');
  //   }

  //   return () => {
  //     ignore = true;
  //   };
  // }, [scriptStatus]);

  return getToken;
};
