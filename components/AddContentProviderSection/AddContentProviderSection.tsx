import Link from 'next/link';

import { AddContentProviderForm } from '../AddContentProviderForm/AddContentProviderForm';
import { Button } from '../Button/Button';

import styles from './addContentProviderSection.module.css';

export const AddContentProviderSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Zgłoś Serwis</h2>
      <Link href="/" passHref>
        <Button as="a" icon="icon-arrow-left2">
          Strona główna
        </Button>
      </Link>
      <AddContentProviderForm />
    </section>
  );
};
