import { CookiesPopup } from './CookiesPopup/CookiesPopup';
import { Footer } from './Footer/Footer';
import { MainHeader } from './MainHeader/MainHeader';
import { MainNavigation } from './MainNavigation/MainNavigation';
import styles from './layout.module.scss';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header>
        <MainNavigation />
        <MainHeader />
      </header>
      <main>{children}</main>
      <Footer />
      <CookiesPopup />
    </div>
  );
};
