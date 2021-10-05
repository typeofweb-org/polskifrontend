import Image from 'next/image';

import styles from './LoadingScreen.module.css';

export const LoadingScreen = () => {
  return (
    <section className={styles.loadingScreen}>
      <Image src="/logo.svg" alt="Ładowanie..." width={320} height={114} />
    </section>
  );
};
