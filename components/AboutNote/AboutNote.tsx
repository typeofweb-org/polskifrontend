import Link from 'next/link';

import styles from './aboutNote.module.scss';

export const AboutNote = () => (
  <article className={styles.wrapper}>
    <h2>Po co jest ten serwis?</h2>
    <p>
      Serwis <strong>Polski Front-End</strong> powstał w celu zebrania w jednym miejscu jak
      największej liczby stron, serwisów oraz blogów na temat szeroko rozumianego front-end
      developmentu. Co ważne, wszystkie zgromadzone tutaj serwisy tworzone są{' '}
      <strong>w języku polskim</strong>!
    </p>
    <p>
      Podstawowym założeniem "Polskiego Front-Endu" było zebranie tutaj{' '}
      <strong>całych blogów</strong>, a nie pojedynczych artykułów. Z tego powodu selekcji treści
      mogę dokonywać jedynie na etapie dodawania danej strony do serwisu. Jako, że nie każdy pisze
      tylko i wyłącznie o front-endzie, to czasem może się tutaj pojawić wpis na temat, na przykład,
      PHP... Wydaje mi się jednak, że każdy blog czy strona, która pisze{' '}
      <strong>dużo o front-endzie, czy ogólniej o web developmencie</strong>, zasługuje by się tutaj
      znaleźć... Nawet jeśli front-end to nie jedyny poruszany tam temat.
    </p>
    <p>
      Jeżeli więc znasz (lub sam prowadzisz) jakiś blog, serwis lub stronę{' '}
      <strong>w języku polskim</strong>, której tutaj nie ma, a uważasz, że powinna się tu znaleźć -
      zapraszam do zgłoszenia go przez specjalnie do tego celu{' '}
      <Link href="/zglos-serwis">
        <a>przygotowany formularz</a>
      </Link>
      . Obiecuję, że przejrzę każde zgłoszenie i jeśli uznam, że dana strona się nadaje - dodam ją
      do serwisu!
    </p>
    <p>
      A jeśli podoba Ci się moja idea i sam prowadzisz bloga o front-endzie, to oprócz zgłoszenia
      zachęcam również, do <strong>polecania tej strony</strong> swoim czytelnikom! Im większy ruch
      tutaj <strong>tym większy ruch do Twojego bloga...</strong>
    </p>
  </article>
);
