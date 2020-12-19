import { Footer } from './Footer/Footer';
import { MainHeader } from './MainHeader/MainHeader';
import { MainNavigation } from './MainNavigation/MainNavigation';

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header>
        <MainNavigation />
        <MainHeader />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};
