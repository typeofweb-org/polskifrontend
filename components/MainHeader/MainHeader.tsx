import Image from 'next/image';
import Link from 'next/link';

import Styles from './mainHeader.module.scss';

export const MainHeader = () => {
  return (
    <section className={Styles.headerSection}>
      <Link href="/" title="Przejdź na stronę główną" className={Styles.headerLink}>
        <h1 className={Styles.title}>
          <span className="sr-only">Polski frontend</span>
          <Image
            src="/logo.svg"
            alt=""
            width={480}
            height={171}
            priority
            className={Styles.headerLogo}
          />
        </h1>
      </Link>
    </section>
  );
};
