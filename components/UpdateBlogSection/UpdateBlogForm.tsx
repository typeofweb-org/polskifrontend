'use client';

import Clsx from 'clsx';
import { useRef, memo, useCallback, useEffect, useState } from 'react';

import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import { getBlog } from '../../utils/api/getBlog';
import { updateBlog } from '../../utils/api/updateBlog';
import { Button } from '../Button/Button';

import type { BlogIdRequestBody } from '../../pages/api/blogs/[blogId]';
import type { ChangeEventHandler, FormEvent } from 'react';

type Props = {
  readonly blogId: string;
};

export const UpdateBlogForm = memo<Props>(({ blogId }) => {
  const { mutate, status } = useMutation((body: BlogIdRequestBody) => updateBlog(blogId, body));
  const { value: blog, status: queryStatus } = useQuery(
    useCallback(() => getBlog(blogId), [blogId]),
  );
  const [fields, setFields] = useState<BlogIdRequestBody>({
    href: '',
    creatorEmail: null,
    isPublic: false,
  });
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setIsValid(formRef.current?.checkValidity() ?? false);
  }, [fields]);

  useEffect(() => {
    if (queryStatus === 'success' && blog) {
      setFields(blog);
    }
  }, [queryStatus, blog]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ currentTarget }) => {
    setFields((fields) => ({ ...fields, [currentTarget.name]: currentTarget.value }));
  }, []);

  const handleInputCheckboxChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ currentTarget }) => {
      setFields((fields) => ({ ...fields, [currentTarget.name]: currentTarget.checked }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void mutate(fields);
    },
    [mutate, fields],
  );

  if (!blog) {
    return null;
  }

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className={Clsx(isLoading && 'cursor-wait')} ref={formRef}>
      <label className="my-4 block text-black">
        Nazwa bloga
        <input
          className="my-1 w-full rounded-md bg-theme-secondary py-3 px-4"
          value={blog.name}
          type="text"
          name="name"
          readOnly
        />
      </label>

      <label className="my-4 block text-black">
        Href bloga
        <input
          className="my-1 w-full rounded-md border-[1px] border-gray-primary py-3 px-4"
          value={fields.href}
          name="href"
          onChange={handleChange}
          placeholder="Podaj href bloga"
          required
          type="url"
        />
      </label>

      <label className="my-4 block text-black">
        Rss bloga
        <input
          className="my-1 w-full rounded-md bg-theme-secondary py-3 px-4"
          value={blog.rss}
          name="rss"
          type="url"
          readOnly
        />
      </label>

      <label className="my-4 block text-black">
        Slug bloga
        <input
          className="my-1 w-full rounded-md bg-theme-secondary py-3 px-4"
          value={blog.slug ?? ''}
          readOnly
          name="slug"
          type="text"
        />
      </label>

      <label className="my-4 block text-black">
        Favicon bloga
        <input
          className="my-1 w-full rounded-md bg-theme-secondary py-3 px-4"
          value={blog.favicon ?? ''}
          name="favicon"
          type="url"
          readOnly
        />
      </label>

      <label className="my-4 block text-black">
        Email twórcy
        <input
          className="my-1 w-full rounded-md border-[1px] border-gray-primary py-3 px-4"
          value={fields.creatorEmail ?? ''}
          name="creatorEmail"
          onChange={handleChange}
          placeholder="Podaj email twórcy"
          type="email"
        />
      </label>

      <label className="flex items-center">
        <input
          className="mr-3 flex h-5 w-5"
          checked={fields.isPublic}
          name="isPublic"
          onChange={handleInputCheckboxChange}
          type="checkbox"
        />
        Czy blog ma być pokazany na stronie?
      </label>

      <Button type="submit" disabled={!isValid} className="mt-7">
        Zapisz
      </Button>
    </form>
  );
});
UpdateBlogForm.displayName = 'UpdateBlogForm';
