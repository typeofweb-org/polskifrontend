// https://github.com/Jason3S/rx-stream/blob/4c715e38924a44e65ed8c5aed883c2ca61dca1b1/src/streamToRx.ts
import type { Duplex } from 'stream';

import type { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { logger } from './logger';

export function streamToRx<S extends Duplex = Duplex, T = ReturnType<S['read']>>(
  stream: S,
  pauser?: Observable<boolean>,
): Observable<T> {
  stream.pause();

  return new Observable<T>((subscriber) => {
    const endHandler = () => {
      logger.debug('END HANDLER');
      return subscriber.complete();
    };
    const errorHandler = (e: Error) => subscriber.error(e);
    const dataHandler = (data: T) => subscriber.next(data);

    stream.addListener('end', endHandler);
    stream.addListener('close', endHandler);
    stream.addListener('error', errorHandler);
    stream.addListener('data', dataHandler);

    let pauseSubscription: Subscription | undefined;
    if (pauser) {
      pauseSubscription = pauser.pipe(distinctUntilChanged()).subscribe((b) => {
        if (b === false) {
          stream.resume();
        } else if (b === true) {
          stream.pause();
        }
      });
    }

    stream.resume();

    return () => {
      stream.removeListener('end', endHandler);
      stream.removeListener('close', endHandler);
      stream.removeListener('error', errorHandler);
      stream.removeListener('data', dataHandler);

      if (pauseSubscription) {
        pauseSubscription.unsubscribe();
      }
    };
  });
}
