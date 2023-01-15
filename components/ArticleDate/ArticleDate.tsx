import { formatDate } from '../../utils/date-utils';

type ArticleDateProps = {
  readonly publishedAt: Date;
};

export const ArticleDate = ({ publishedAt }: ArticleDateProps) => {
  const dateTime = publishedAt.toISOString();
  const readableDate = formatDate(publishedAt);

  return (
    <time className="text-sm text-[#797979]" dateTime={dateTime}>
      {readableDate}
    </time>
  );
};
