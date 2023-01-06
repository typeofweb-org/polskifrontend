export const Header = () => {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-2">
      <h2 className="text-center text-6xl font-black text-black">
        Wszystkie <span className="text-primary-base">źródła informacji</span> w jednym miejscu, po
        polsku!
      </h2>

      {/* Divider */}
      <div className="mx-auto h-[2px] w-full min-w-[168px] max-w-md bg-[#E3E3E3]"></div>

      <p className="text-center text-2xl font-light text-gray-light">
        Szukaj interesujących Cię tematów wśród setek artykułów, wpisów i filmów dostępnych na
        polskich blogach i kanałach o programowaniu.
      </p>
    </section>
  );
};
