import clsx from 'clsx';

import styles from './Loading.module.css';

export const Loading = () => {
  return <span className={clsx(styles.spinner, 'icon-spinner')}></span>;
};
