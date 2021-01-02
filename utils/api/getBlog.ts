export type Blog = {
  readonly id: string;
  readonly name: string;
  readonly href: string;
  readonly rss: string;
  readonly slug: string;
  readonly lastUpdateDate?: string;
  readonly favicon: string;
  readonly creatorEmail: string;
  readonly isPublic: boolean;
  readonly lastArticlePublishedAt?: string;

  readonly createdAt: string;
  readonly updatedAt: string;
};

export const getBlog = async (blogId: string): Promise<Blog> => {
  const response = await fetch(`/api/blogs/${blogId}`);
  const data = (await response.json()) as Blog;
  return data;
};
