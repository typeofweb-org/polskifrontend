import { REVALIDATION_TIME } from '../../../constants';

import HomePage from './[page]/page';

export const revalidate = REVALIDATION_TIME;

export default HomePage;

export const generateStaticParams = () => {
  return [{ displayStyle: 'grid' }, { displayStyle: 'list' }];
};
