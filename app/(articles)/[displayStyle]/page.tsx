import HomePage from './[page]/page';

export default HomePage;

export const generateStaticParams = () => {
  return [{ displayStyle: 'grid' as const }, { displayStyle: 'list' as const }];
};
