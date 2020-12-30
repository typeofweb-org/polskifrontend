import styles from './LoadingScreen.module.css';

export const LoadingScreen = () => {
  return (
    <section className={styles.loadingScreen}>
      <img src="/logo.svg" alt="Ładowanie..." width={320} height={100} />
    </section>
  );
};
