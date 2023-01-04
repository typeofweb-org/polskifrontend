import { AddContentCreatorForm } from '../../components/AddContentCreatorForm/AddContentCreatorForm';
import { ButtonAsLink } from '../../components/ButtonAsLink/ButtonAsLink';

import Styles from './page.module.scss';

export default function AddContentCreatorPage() {
  return (
    <section className={Styles.section}>
      <h2 className={Styles.heading}>Zgłoś Serwis</h2>

      <ButtonAsLink href="/" icon="icon-arrow-left2">
        Strona Główna
      </ButtonAsLink>

      <AddContentCreatorForm />
    </section>
  );
}
