import Image from 'next/image';

import Styles from './LoadingScreen.module.css';

export const LoadingScreen = () => {
  return (
    <section className={Styles.loadingScreen}>
      <Image src="/logo.svg" alt="Ładowanie..." width={320} height={114} />
    </section>
  );
};
