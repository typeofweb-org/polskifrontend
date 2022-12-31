import Link from 'next/link';

import { ButtonAsLink } from '../../components/ButtonAsLink/ButtonAsLink';

import Styles from './page.module.scss';

export default function AboutPage() {
  return (
    <section className={Styles.section}>
      <h2 className={Styles.heading}>O serwisie</h2>
      <div className={Styles.buttons}>
        <ButtonAsLink href="/" icon="icon-arrow-left2">
          Strona Główna
        </ButtonAsLink>
      </div>
      <article className={Styles.note}>
        <h3>Po co jest ten serwis?</h3>
        <p>
          Serwis <strong>Polski Frontend</strong> powstał w celu zebrania w jednym miejscu jak
          największej liczby stron, serwisów oraz blogów na temat szeroko rozumianego frontend
          developmentu. Co ważne, wszystkie zgromadzone tutaj serwisy tworzone są{' '}
          <strong>w języku polskim</strong>!
        </p>
        <p>
          Podstawowym założeniem „Polskiego Frontendu” było zebranie tutaj{' '}
          <strong>całych blogów</strong>, a nie pojedynczych artykułów. Z tego powodu selekcji
          treści mogę dokonywać jedynie na etapie dodawania danej strony do serwisu. Jako, że nie
          każdy pisze tylko i wyłącznie o frontendzie, to czasem może się tutaj pojawić wpis na
          temat, na przykład, PHP… Wydaje mi się jednak, że każdy blog czy strona, która pisze{' '}
          <strong>dużo o frontendzie, czy ogólniej o web developmencie</strong>, zasługuje by się
          tutaj znaleźć… Nawet jeśli frontend to nie jedyny poruszany tam temat.
        </p>
        <p>
          Jeżeli więc znasz (lub sam prowadzisz) jakiś blog, serwis lub stronę{' '}
          <strong>w języku polskim</strong>, której tutaj nie ma, a uważasz, że powinna się tu
          znaleźć - zapraszam do zgłoszenia go przez specjalnie do tego celu{' '}
          <Link href="/zglos-serwis">przygotowany formularz</Link>. Obiecuję, że przejrzę każde
          zgłoszenie i jeśli uznam, że dana strona się nadaje - dodam ją do serwisu!
        </p>
        <p>
          A jeśli podoba Ci się moja idea i sam prowadzisz bloga o frontendzie, to oprócz zgłoszenia
          zachęcam również, do <strong>polecania tej strony</strong> swoim czytelnikom! Im większy
          ruch tutaj <strong>tym większy ruch do Twojego bloga…</strong>
        </p>
        <p>
          Od 2020 portal jest własnością <a href="https://typeofweb.com">Type of Web</a> i jest
          rozwijany jako{' '}
          <a href="https://github.com/typeofweb/polskifrontend">Open Source na GitHubie</a>!
        </p>
      </article>
    </section>
  );
}
