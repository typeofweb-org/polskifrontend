import { AddContentCreatorSection } from '../components/AddContentCreatorSection/AddContentCreatorSection';
import { Layout } from '../components/Layout';
import type { InferGetStaticPropsType2 } from '../types';

export type AddContentCreatorPageProps = InferGetStaticPropsType2<typeof getStaticProps>;

export default function AddContentCreatorPage({ date }: AddContentCreatorPageProps) {
  return (
    <Layout title="Zgłoś serwis" date={date}>
      <AddContentCreatorSection />
    </Layout>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      date: new Date().toISOString(),
    },
  };
};
