import { HeadTags } from '../../../components/HeadTags';

import type { DisplayStyle } from '../../../utils/types/types';

type HeadProps = {
  readonly params: {
    readonly displayStyle?: DisplayStyle;
    readonly page: string;
  };
};

export const displayStyleTitle: Record<DisplayStyle, string> = {
  grid: 'siatka',
  list: 'lista',
} as const;

export default function Head({ params }: HeadProps) {
  return (
    <HeadTags
      title={`Polski Frontend – ${
        displayStyleTitle[params.displayStyle ?? 'list']
      } artykułów z polskich blogów frontendowych`}
    />
  );
}
