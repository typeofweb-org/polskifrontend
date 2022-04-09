import Image from 'next/image';
import Link from 'next/link';

import Styles from './mainHeader.module.scss';

export const MainHeader = () => {
  return (
    <section className={Styles.headerSection}>
      <Link href="/">
        <a title="Przejdź na stronę główną" className={Styles.headerLink}>
          <h1 className={Styles.title}>
            <span className="sr-only">Polski frontend</span>
            <Image src="/logo.svg" alt="" width={480} height={171} />
          </h1>
        </a>
      </Link>
    </section>
  );
};
