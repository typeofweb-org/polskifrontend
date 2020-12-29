import { AboutSection } from '../components/AboutSection/AboutSection';
import { Layout } from '../components/Layout';
import type { InferGetStaticPropsType2 } from '../types';

export type AboutPageProps = InferGetStaticPropsType2<typeof getStaticProps>;

export default function AboutPage({ date }: AboutPageProps) {
  return (
    <Layout title="O serwisie" date={date}>
      <AboutSection />
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
