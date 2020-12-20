import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, RefObject } from 'react';
import { forwardRef, memo } from 'react';

type AnchorRef =
  | string
  | RefObject<HTMLAnchorElement>
  | ((instance: HTMLAnchorElement | null) => void)
  | null
  | undefined;

type LinkAnchorProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkAnchor = memo<LinkAnchorProps>(
  forwardRef(
    (
      { href, as, replace, scroll, shallow, passHref, prefetch, locale, children, ...anchorProps },
      ref: AnchorRef,
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
