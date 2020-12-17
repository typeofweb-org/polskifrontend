import { MainHeader } from './MainHeader/MainHeader';

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};
