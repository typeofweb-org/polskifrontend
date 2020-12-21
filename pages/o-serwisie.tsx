import Link from 'next/link';

import { AboutNote } from '../components/AboutNote/AboutNote';
import { Button } from '../components/Button/Button';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section/Section';

export default function AboutPage() {
  return (
    <Layout>
      <Section
        title="O serwisie"
        buttons={
          <Link href="/" passHref>
            <Button icon="icon-back">Strona Główna</Button>
          </Link>
        }
      >
        <AboutNote />
      </Section>
    </Layout>
  );
}
