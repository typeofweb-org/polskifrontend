export const Header = () => {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-3">
      <h2 className="text-center text-2xl font-black leading-[1.2] text-black md:text-4xl lg:text-6xl">
        Wszystkie <span className="text-primary-base">źródła informacji</span> w jednym miejscu, po
        polsku!
      </h2>

      {/* Divider */}
      <div className="mx-auto h-[2px] w-full min-w-[168px] max-w-[50%] bg-theme-secondary md:max-w-md"></div>

      <p className="text-center font-light text-gray-secondary md:text-2xl">
        Szukaj interesujących Cię tematów wśród setek artykułów, wpisów i filmów dostępnych na
        polskich blogach i kanałach o programowaniu.
      </p>
    </section>
  );
};
