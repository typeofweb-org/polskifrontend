import HomePage from './[page]/page';

export const revalidate = 900; // 15 minutes

export default HomePage;

export const generateStaticParams = () => {
  return [{ displayStyle: 'grid' }, { displayStyle: 'list' }];
};
