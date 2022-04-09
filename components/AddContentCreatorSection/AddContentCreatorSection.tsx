import Link from 'next/link';

import { AddContentCreatorForm } from '../AddContentCreatorForm/AddContentCreatorForm';
import { Button } from '../Button/Button';

import Styles from './addContentCreatorSection.module.css';

export const AddContentCreatorSection = () => {
  return (
    <section className={Styles.section}>
      <h2 className={Styles.heading}>Zgłoś Serwis</h2>
      <Link href="/" passHref>
        <Button as="a" icon="icon-arrow-left2">
          Strona główna
        </Button>
      </Link>
      <AddContentCreatorForm />
    </section>
  );
};
