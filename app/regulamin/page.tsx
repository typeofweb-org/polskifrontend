import React from 'react';

import { ButtonAsLink } from '../../components/ButtonAsLink/ButtonAsLink';

import Styles from './page.module.scss';

export default function TermsOfUsePage() {
  return (
    <section className={Styles.section}>
      <div className={Styles.buttons}>
        <ButtonAsLink href="/" icon="icon-arrow-left2">
          Strona Główna
        </ButtonAsLink>
      </div>
      <article className={Styles.note}>
        <h2 className={Styles.heading}>Regulamin polskifrontend.pl</h2>
        <p>Wersja z dnia 27. stycznia 2021r.</p>
        <ol className={Styles.ol}>
          <li className={Styles.li}>
            Postanowienia ogólne
            <ol className={Styles.ol}>
              <li>
                Niniejszy Regulamin (zwany dalej „Regulaminem”) określa zasady korzystania z serwisu
                polskifrontend.pl (zwanego dalej: „Serwisem”) dla użytkowników indywidualnych
                (zwanych dalej „Użytkownikami”).
              </li>
              <li>
                Administratorem Serwisu jest Michał Miszczyszyn prowadzący działalność gospodarczą
                pod firmą „Type of Web - Michał Miszczyszyn”, zarejestrowaną w&nbsp;Centralnej
                Ewidencji i&nbsp;Informacji o&nbsp;Działalności Gospodarczej pod adresem ul.
                Bażantowa 9/21, 80-175 Gdańsk, NIP: 6040080451 (zwany dalej: „Usługodawcą”). Adres
                do korespondencji: ul. Bażantowa 9/21, 80-175 Gdańsk; adres e-mail:
                hi@typeofweb.com.
              </li>
            </ol>
          </li>
          <li className={Styles.li}>
            Zasady korzystania z&nbsp;Serwisu
            <ol className={Styles.ol}>
              <li>
                Serwis służy do prezentacji najnowszych artykułów, podcastów lub filmów (zwanych
                dalej: „Artykułami”) z polskich blogów, podcastów i kanałów YouTube (zwanych dalej:
                „Blogami”) o tematyce frontendu. Usługodawca świadczy usługę polegającą na
                udostępnianiu infrastruktury teleinformatycznej celem dodawania
                i&nbsp;przechowywania zbioru Blogów jak i&nbsp;Artykułów, oraz ich wyświetlania.
              </li>
              <li>
                Korzystanie z&nbsp;Serwisu jest bezpłatne i&nbsp;nie wymaga logowania Użytkownika.
              </li>
              <li>
                Korzystanie z&nbsp;Serwisu wymaga przeglądarki internetowej z&nbsp;włączoną obsługą
                języka JavaScript. Usługodawca zastrzega sobie prawo do wspierania tylko wybranych,
                najpopularniejszych przeglądarek internetowych.
              </li>
              <li>
                Każdy Blog dodawany do Serwisu, przed umożliwieniem pobierania jego artykułów oraz
                ich wyświetlania, podlega weryfikacji przez Usługodawcę i&nbsp;może zostać
                zmodyfikowany lub usunięty. Okres od dodania Bloga, do jego opublikowania
                w&nbsp;Serwisie, może trwać kilka dni.
              </li>
              <li>
                Zgłaszając Bloga do Serwisu, Użytkownik:
                <ol className={Styles.ol}>
                  <li>ma obowiązek przestrzegania zasad kultury osobistej i&nbsp;netykiety;</li>
                  <li>
                    oświadcza, że przysługują mu prawa do publikacji dodawanych treści i&nbsp;wyraża
                    zgodę na ich wykorzystanie przez Usługodawcę w&nbsp;Serwisie, a&nbsp;także poza
                    nim, nie wyłączając celów komercyjnych;
                  </li>
                  <li>
                    ponosi pełną odpowiedzialność związaną z&nbsp;ewentualnym naruszeniem Regulaminu
                    i przepisów prawa, a&nbsp;w tym dóbr osobistych, praw własności intelektualnej,
                    umów o&nbsp;zachowaniu poufności i&nbsp;innych;
                  </li>
                  <li>
                    wyraża zgodę na modyfikowanie, moderowanie oraz odmowę publikacji treści przez
                    Usługodawcę, w&nbsp;celu utrzymania wysokiej jakości treści publikowanych w
                    Serwisie.
                  </li>
                </ol>
              </li>
              <li>
                Użytkownik nie może:
                <ol className={Styles.ol}>
                  <li>
                    wykorzystywać Serwisu, ani treści w&nbsp;nim zamieszczonych, do działalności
                    komercyjnej. Pod pojęciem działalności komercyjnej rozumie się jakąkolwiek
                    działalność marketingową, promocyjną lub wspomagającą te działania, na przykład
                    umieszczanie reklam w&nbsp;treściach dodawanych do Serwisu, lub dowolne inne
                    sposoby czerpania korzyści majątkowej z&nbsp;Serwisu;
                  </li>
                  <li>
                    dodawać do Serwisu treści o&nbsp;charakterze erotycznym, zawierających
                    wulgaryzmy lub z&nbsp;innych względów nieodpowiednich dla osób poniżej 18. roku
                    życia;
                  </li>
                  <li>
                    dodawać do Serwisu treści nawołujących do nienawiści na tle etnicznym, rasowym,
                    religijnym lub jakimkolwiek innym oraz propagujących faszyzm, nazizm, komunizm
                    oraz inne zbrodnicze ideologie;
                  </li>
                  <li>w nadmierny sposób obciążać serwera, na którym znajduje się Serwis;</li>
                </ol>
              </li>
              <li>
                Usługodawca ma prawo do usuwania treści z&nbsp;Serwisu bez podania przyczyny,
                a&nbsp;w szczególności w&nbsp;przypadku powzięcia wiarygodnej informacji
                o&nbsp;naruszeniu prawa lub Regulaminu.
              </li>
              <li>
                Jeśli zdaniem Użytkownika opublikowana w&nbsp;Serwisie treść narusza prawo,
                Regulamin lub zasady współżycia społecznego, Użytkownik może powiadomić Usługodawcę
                za pośrednictwem poczty elektronicznej na adres e-mail: abuse@polskifrontend.pl.
              </li>
            </ol>
          </li>
          <li className={Styles.li}>
            Odpowiedzialność i&nbsp;sankcje
            <ol className={Styles.ol}>
              <li>
                Użytkownik zobowiązuje się, że w&nbsp;momencie wystąpienia przez osoby trzecie z
                roszczeniami w&nbsp;stosunku do Usługodawcy z&nbsp;tytułu naruszenia jakichkolwiek
                praw tych osób trzecich przez treści zamieszczone przez Użytkownika, Użytkownik ten
                wstąpi do sprawy w&nbsp;miejsce Usługodawcy oraz przejmie na siebie w&nbsp;całości
                koszty ewentualnego postępowania sądowego, zasądzonych odszkodowań oraz inne.
              </li>
              <li>
                Naruszenie Regulaminu przez Użytkownika może skutkować zablokowaniem mu dostępu do
                Serwisu, a&nbsp;w przypadku gdy naruszone zostały przepisy prawa, również
                zawiadomieniem odpowiednich organów lub skierowaniem sprawy do sądu.
              </li>
              <li>
                Przez naruszenie Regulaminu rozumie się także namawianie innych osób do jego
                naruszenia, a&nbsp;także ułatwianie jego obchodzenia, jak również czerpanie korzyści
                majątkowych z&nbsp;tych czynności.
              </li>
            </ol>
          </li>
          <li className={Styles.li}>
            Wyłączenie odpowiedzialności i&nbsp;zastrzeżenia
            <ol className={Styles.ol}>
              <li>
                W&nbsp;najszerszym zakresie dopuszczalnym przez prawo, wyłączona zostaje
                odpowiedzialność Usługodawcy za:{' '}
                <ol>
                  <li>
                    szkody wynikające ze sposobu w&nbsp;jaki Użytkownicy korzystają z&nbsp;Serwisu,
                    niewłaściwego działania Serwisu, braku dostępu do Serwisu, jak również szkody
                    powstałe w&nbsp;wyniku działania siły wyższej;
                  </li>
                  <li>jakiekolwiek treści zamieszczone w&nbsp;Serwisie przez Użytkowników.</li>
                </ol>
              </li>
              <li>
                W&nbsp;najszerszym dopuszczalnym zakresie, Usługodawca ma prawo do:
                <ol className={Styles.ol}>
                  <li>zmiany parametrów oraz sposobu działania Serwisu;</li>
                  <li>wyłączania Serwisu bez wcześniejszego powiadomienia Użytkowników;</li>
                  <li>usuwania opublikowanych treści;</li>
                  <li>całkowitego zaprzestania świadczenia usług;</li>
                  <li>
                    przeniesienia wszelkich praw i&nbsp;obowiązków związanych ze świadczeniem usług
                    drogą elektroniczną w&nbsp;Serwisie na inny podmiot.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li className={Styles.li}>
            Informacje o&nbsp;zagrożeniach
            <ol className={Styles.ol}>
              <li>
                Podstawowym zagrożeniem każdego użytkownika Internetu, w&nbsp;tym osób
                korzystających z usług świadczonych drogą elektroniczną, jest możliwość
                zainfekowania systemu teleinformatycznego przez złośliwe oprogramowanie tworzone
                głównie w&nbsp;celu wyrządzania szkód, takie jak wirusy, robaki, czy konie
                trojańskie. Aby uniknąć zagrożeń z&nbsp;tym związanych, a&nbsp;w tym pojawiających
                się w&nbsp;momencie otwierania wiadomości e-mail, należy wyposażyć swoje urządzenia
                dostępowe w&nbsp;programy antywirusowe i&nbsp;pamiętać o&nbsp;ich bieżącej
                aktualizacji do najnowszych wersji. Korzystanie z&nbsp;usług świadczonych przez
                Internet wiąże się z&nbsp;możliwą działalnością hackerów, zmierzających do włamania
                się zarówno do Serwisu (np. ataki na witrynę lub serwer), jak i&nbsp;do systemu
                Użytkownika. Warto pamiętać, że mimo stosowania przez Usługodawcę różnorodnych,
                nowoczesnych technologii obronnych, nie istnieje w 100% skuteczne zabezpieczenie
                przed opisanymi wyżej niepożądanymi działaniami. Więcej na temat stosowanych przez
                Usługodawcę zasad ochrony danych znaleźć można w Polityce prywatności.
              </li>
            </ol>
          </li>
          <li className={Styles.li}>
            Ochrona danych osobowych
            <ol className={Styles.ol}>
              <li>
                Administratorem danych osobowych Użytkowników, jest Michał Miszczyszyn prowadzący
                działalność gospodarczą pod firmą „Type of Web - Michał Miszczyszyn”, zarejestrowaną
                w&nbsp;Centralnej Ewidencji i&nbsp;Informacji o&nbsp;Działalności Gospodarczej pod
                adresem ul. Bażantowa 9/21, 80-175 Gdańsk, NIP: 6040080451 (zwany dalej
                „Administratorem”). Adres do korespondencji: ul. Bażantowa 9/21, 80-175 Gdańsk;
                adres e-mail: hi@typeofweb.com
              </li>
              <li>
                Korzystanie z&nbsp;Serwisu wiąże się z&nbsp;przetwarzaniem danych osobowych
                Użytkowników w celu logowania Użytkownika - na podstawie art. 6 ust. 1 RODO, czyli
                zgody Użytkownika, przetwarzane są adres e-mail, imię i&nbsp;nazwisko oraz
                ewentualnie nazwa użytkownika.
              </li>
              <li>
                Dane osobowe nie są przetwarzane w&nbsp;celu zautomatyzowanego podejmowania decyzji
                bez wyraźnej zgody Użytkowników.
              </li>
              <li>
                Dane osobowe nie są przekazywane podmiotom trzecim i&nbsp;są przechowywane przez
                czas posiadania konta Użytkownika. W&nbsp;przypadku opublikowania komentarza przez
                zalogowanego Użytkownika, jego nazwa będzie widoczna dla wszystkich odwiedzających
                Serwis. Dane osobowe zgromadzone w&nbsp;związku z&nbsp;zamieszczeniem komentarza
                będą przechowywane przez czas wyświetlania tego komentarza, chyba że wcześniej
                Użytkownik poprosi o&nbsp;usunięcie komentarza.
              </li>
              <li>
                Zgodnie z&nbsp;RODO, Użytkownik ma następujące prawa w&nbsp;związku
                z&nbsp;przetwarzaniem jego danych osobowych:
                <ol className={Styles.ol}>
                  <li>Prawo do informacji, w&nbsp;jaki sposób dane osobowe są przetwarzane;</li>
                  <li>Prawo do dostępu i&nbsp;sprostowania danych osobowych;</li>
                  <li>
                    Prawo do usunięcia danych osobowych; Administrator może odmówić usunięcia
                    danych, co do których ma podstawę do ich dalszego przetwarzania (np. realizacja
                    obowiązku prawnego lub dochodzenia roszczeń lub obrony przed roszczeniami, które
                    mogą być kierowane przeciwko Administratorowi);
                  </li>
                  <li>Prawo do żądania ograniczenia przetwarzania danych osobowych;</li>
                  <li>
                    Prawo do zgłoszenia sprzeciwu co do przetwarzania danych osobowych, jeżeli
                    podstawą przetwarzania jest uzasadniony interes Administratora lub wykonywanie
                    zadań w&nbsp;interesie publicznym;
                  </li>
                  <li>
                    Prawo do cofnięcia zgody, jeżeli dane osobowe były przetwarzane na podstawie
                    zgody użytkownika;
                  </li>
                  <li>Prawo do przeniesienia danych osobowych.</li>
                </ol>
              </li>
              <li>
                Wszystkie powyższe prawa można zrealizować kontaktując się z&nbsp;Administratorem
                drogą elektroniczną pod adresem: hi@typeofweb.com. Zgłoszone żądania będą
                realizowane bez zbędnej zwłoki, nie później niż w&nbsp;terminie 30 dni od dnia
                otrzymania żądania. W&nbsp;tym terminie Administrator udzieli odpowiedzi lub
                poinformuje o&nbsp;ewentualnym wydłużeniu terminu i&nbsp;wyjaśni przyczyny. Jeżeli
                Administrator poweźmie wątpliwości co do tego, czy określone żądanie zostało
                zgłoszone przez osobę uprawnioną, może on zadać kilka dodatkowych pytań w&nbsp;celu
                weryfikacji tożsamości zgłaszającego.
              </li>
              <li>
                Administrator gwarantuje poufność wszelkich przekazanych mu danych osobowych.
                Administrator zapewnia podjęcie wszelkich środków bezpieczeństwa i&nbsp;ochrony
                danych osobowych wymaganych przez przepisy prawa. Dane osobowe są gromadzone
                z&nbsp;należytą starannością i&nbsp;odpowiednio chronione przed dostępem do nich
                przez osoby do tego nieupoważnione.
              </li>
              <li>
                Jeśli uważasz, że Administrator przetwarza dane osobowe niezgodnie z&nbsp;prawem,
                możesz wnieść skargę do właściwego organu, którym jest Prezes Urzędu Ochrony Danych
                Osobowych.{' '}
              </li>
            </ol>
          </li>
          <li className={Styles.li}>
            Postanowienia końcowe{' '}
            <ol className={Styles.ol}>
              <li>
                Usługodawca zastrzega sobie prawo do zmiany Regulaminu. O&nbsp;treści zmian
                Regulaminu Usługodawca poinformuje Użytkowników przez umieszczenie na stronie
                internetowej https://polskifrontend.pl/regulamin wiadomości o&nbsp;zmianie
                Regulaminu, zawierającej zestawienie zmian Regulaminu i&nbsp;utrzymanie tej
                informacji przez okres co najmniej 14 kolejnych dni kalendarzowych.{' '}
              </li>
              <li>
                Zmiany Regulaminu wchodzą w&nbsp;życie w&nbsp;terminie podanym wraz
                z&nbsp;informacją o&nbsp;jego zmianie, nie wcześniej jednak niż po upływie 14 dni
                kalendarzowych od momentu poinformowania o&nbsp;zmianach Regulaminu, z&nbsp;tym
                zastrzeżeniem, że zmieniony Regulamin będzie wiązać Użytkownika, o&nbsp;ile nie
                zaprzestanie on korzystania z&nbsp;Serwisu.
              </li>
              <li>
                Regulamin dostępny jest nieodpłatnie pod adresem https://polskifrontend.pl/regulamin
                w formie, która umożliwia pozyskanie, odtwarzanie i&nbsp;utrwalanie treści
                Regulaminu za pomocą systemu teleinformatycznego, którym posługuje się Użytkownik.
                Pod tym samym adresem dostępne są wszystkie archiwalne wersje Regulaminu wraz
                z&nbsp;informacją o ramach czasowych ich obowiązywania.
              </li>
            </ol>
          </li>
        </ol>
      </article>
    </section>
  );
}
