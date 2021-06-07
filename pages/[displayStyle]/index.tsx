import HomePage from './[page]';

export { getStaticProps } from './[page]';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { displayStyle: 'grid' as const } },
      { params: { displayStyle: 'list' as const } },
    ],
    fallback: false,
  };
};

export default HomePage;
