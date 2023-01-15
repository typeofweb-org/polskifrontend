import Image from 'next/image';

export const LoadingScreen = () => {
  return (
    <section className="absolute inset-0 flex items-center justify-center bg-white">
      <Image src="/logo.svg" alt="Ładowanie..." width={320} height={114} />
    </section>
  );
};
