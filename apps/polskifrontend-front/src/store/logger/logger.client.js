import { createLogger } from 'redux-logger';

export default function logger() {
  return createLogger({
    collapsed: true
  });
}
