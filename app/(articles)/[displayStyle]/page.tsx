import HomePage from './[page]/page';

export default HomePage;

export const generateStaticParams = () => {
  return [{ displayStyle: 'grid' }, { displayStyle: 'list' }];
};
