import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './About.styl';
import ResponsivePanel from '../../components/Responsive/ResponsivePanel';
import Link from '../../components/Link/Link';
import HeaderSettings from '../../components/Layout/HeaderSettings';

const About = (props) => {
  return (
    <div className={styles.container}>
      <HeaderSettings description={props.description} title={props.title} currentPath={props.context.path}/>
      <ResponsivePanel header="O serwisie" description="">
        <div className={styles.nav}>
          <Link className={styles.back} to="/">
            <i className="icon-left-big">
            </i>
            Strona główna
          </Link>
        </div>
        <div className={styles.message}>
          <h3>Po co jest ten serwis?</h3>
          <p className={styles.text}>Serwis <strong>Polski Front-End</strong> powstał w celu zebrania w jednym miejscu jak największej liczby stron, serwisów oraz blogów na temat szeroko rozumianego front-end developmentu. Co ważne, wszystkie zgromadzone tutaj serwisy tworzone są <strong>w języku polskim</strong>!</p>
          <p className={styles.text}>Autorem tej strony jestem ja, czyli <strong>Bartek Dybowski</strong>. Oprócz tego serwisu prowadzę również bloga <a href="https://nafrontendzie.pl" target="_blank" title="Na Frontendzie">Na Frontendzie</a>, na którym piszę na temat technologii webowych (a także świata IT ogólnie). Temat ten jest mi więc szczególnie bliski i stąd właśnie pomysł na stworzenie tego serwisu.</p>
          <p className={styles.text}>Podstawowym założeniem "Polskiego Front-Endu" było zebranie tutaj <strong>całych blogów</strong>, a nie pojedynczych artykułów. Z tego powodu selekcji treści mogę dokonywać jedynie na etapie dodawania danej strony do serwisu. Jako, że nie każdy pisze tylko i wyłącznie o front-endzie, to czasem może się tutaj pojawić wpis na temat, na przykład, PHP... Wydaje mi się jednak, że każdy blog czy strona, która pisze <strong>dużo o front-endzie</strong>, czy ogólniej o web developmencie, zasługuje by się tutaj znaleźć... Nawet jeśli front-end to nie jedyny poruszany tam temat.</p>
          <p className={styles.text}>Jeżeli więc znasz (lub sam prowadzisz) jakiś blog, serwis lub stronę w <strong>języku polskim</strong>, której tutaj nie ma, a uważasz, że powinna się tu znaleźć - <strong>zapraszam do zgłoszenia</strong> go przez specjalnie do tego celu <Link to="/zglos-serwis">przygotowany formularz</Link>. Obiecuję, że przejrzę każde zgłoszenie i jeśli uznam, że dana strona się nadaje - dodam ją do serwisu!</p>
          <p className={styles.text}>A jeśli podoba Ci się moja idea i sam prowadzisz bloga o front-endzie, to oprócz zgłoszenia zachęcam również, do <strong>polecania tej strony</strong> swoim czytelnikom! Im większy ruch tutaj <strong>tym większy ruch do Twojego bloga</strong>...</p>
        </div>
      </ResponsivePanel>
    </div>
  );
};

export default withStyles(styles)(About);
