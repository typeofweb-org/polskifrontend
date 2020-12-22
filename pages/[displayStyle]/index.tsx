import HomePage from './[cursor]';

export { getStaticProps } from './[cursor]';

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
