import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { forwardRef, memo } from 'react';

type LinkAnchorProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkAnchor = memo<LinkAnchorProps>(
  forwardRef<HTMLAnchorElement, LinkAnchorProps>(
    (
      { href, as, replace, scroll, shallow, passHref, prefetch, locale, children, ...anchorProps },
      ref,
    ) => {
      return (
        <Link
          href={href}
          as={as}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          passHref={passHref}
          prefetch={prefetch}
          locale={locale}
        >
          <a ref={ref} {...anchorProps}>
            {children}
          </a>
        </Link>
      );
    },
  ),
);

LinkAnchor.displayName = 'LinkAnchor';
