import Link from 'next/link';

import { AddContentCreatorForm } from '../AddContentCreatorForm/AddContentCreatorForm';
import { Button } from '../Button/Button';

import styles from './addContentCreatorSection.module.css';

export const AddContentCreatorSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Zgłoś Serwis</h2>
      <Link href="/" passHref>
        <Button as="a" icon="icon-arrow-left2">
          Strona główna
        </Button>
      </Link>
      <AddContentCreatorForm />
    </section>
  );
};
