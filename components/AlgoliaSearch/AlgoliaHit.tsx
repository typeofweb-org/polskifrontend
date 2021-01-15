export type Hit = {
  readonly objectID: string;
  readonly blogId: string;
  readonly href: string;
  readonly publishedAt: string;
  readonly slug?: string;
  readonly description?: string;
  readonly title: string;
};

type HitProps = {
  readonly hit: Hit;
};

export const AlgoliaHit = ({ hit }: HitProps) => (
  <>
    <h3>{hit.title}</h3>
    <a href={hit.href} target="_blank" rel="noreferrer noopener">
      Przejdź do artykułu
    </a>
  </>
);
AlgoliaHit.displayName = 'AlogliaHit';
