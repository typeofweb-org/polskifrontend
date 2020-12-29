export const addTrackingToLink = (
  href: string,
  {
    utm_source = 'polskifrontend',
    utm_medium,
  }: { readonly utm_source?: string; readonly utm_medium?: string } = {},
) => {
  try {
    const url = new URL(href);
    if (utm_source) {
      url.searchParams.set('utm_source', utm_source);
    } else {
      url.searchParams.delete('utm_source');
    }
    if (utm_medium) {
      url.searchParams.set('utm_source', utm_medium);
    } else {
      url.searchParams.delete('utm_medium');
    }
    return url.toString();
  } catch {
    return href;
  }
};
