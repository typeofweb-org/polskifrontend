import styles from './AlgoliaHit.module.css';

export type Hit = {
  readonly objectID: string;
  readonly href: string;
  readonly publishedAt: string;
  readonly slug?: string;
  readonly description?: string;
  readonly title: string;
  readonly blog: {
    readonly name: string;
    readonly href: string;
    readonly favicon?: string;
  };
};

type HitProps = {
  readonly hit: Hit;
};

export const AlgoliaHit = ({ hit }: HitProps) => (
  <>
    <h3 className={styles.heading}>{hit.title}</h3>
    <span>
      <img
        loading="lazy"
        src={hit?.blog?.favicon || undefined}
        alt=""
        className={styles.favicon}
        height={16}
        width={16}
      />
      {hit?.blog?.name}
    </span>
    <a className={styles.articleRef} href={hit.href} target="_blank" rel="noreferrer noopener">
      Przejdź do artykułu
    </a>
  </>
);
AlgoliaHit.displayName = 'AlogliaHit';
