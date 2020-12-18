import { Footer } from './Footer/Footer';
import { MainHeader } from './MainHeader/MainHeader';

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
