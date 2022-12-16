import { AddContentCreatorForm } from '../AddContentCreatorForm/AddContentCreatorForm';
import { ButtonAsLink } from '../ButtonAsLink/ButtonAsLink';

import Styles from './addContentCreatorSection.module.css';

export const AddContentCreatorSection = () => {
  return (
    <section className={Styles.section}>
      <h2 className={Styles.heading}>Zgłoś Serwis</h2>
      <ButtonAsLink href="/" icon="icon-arrow-left2">
        Strona Główna
      </ButtonAsLink>
      <AddContentCreatorForm />
    </section>
  );
};
