export type BlogBody = {
  readonly name: string;
  readonly href: string;
  readonly rss: string;
  readonly slug?: string;
  readonly favicon?: string;
  readonly creatorEmail?: string;
  readonly isPublic: boolean;
};

export const updateBlog = (blogId: string, body: BlogBody) => {
  return fetch(`/api/blogs/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};
