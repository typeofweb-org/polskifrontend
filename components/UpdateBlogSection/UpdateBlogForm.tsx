'use client';

import Clsx from 'clsx';
import { useRef, memo, useCallback, useEffect, useState } from 'react';

import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import { getBlog } from '../../utils/api/getBlog';
import { updateBlog } from '../../utils/api/updateBlog';
import { Button } from '../Button/Button';

import Styles from './updateBlogForm.module.scss';

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
    <form
      onSubmit={handleSubmit}
      className={Clsx(Styles.form, isLoading && Styles.formLoading)}
      ref={formRef}
    >
      <label className={Styles.label}>
        Nazwa bloga
        <input className={Styles.input} value={blog.name} type="text" name="name" readOnly />
      </label>
      <label className={Styles.label}>
        Href bloga
        <input
          className={Styles.input}
          value={fields.href}
          name="href"
          onChange={handleChange}
          placeholder="Podaj href bloga"
          required
          type="url"
        />
      </label>
      <label className={Styles.label}>
        Rss bloga
        <input className={Styles.input} value={blog.rss} name="rss" type="url" readOnly />
      </label>
      <label className={Styles.label}>
        Slug bloga
        <input className={Styles.input} value={blog.slug ?? ''} readOnly name="slug" type="text" />
      </label>
      <label className={Styles.label}>
        Favicon bloga
        <input
          className={Styles.input}
          value={blog.favicon ?? ''}
          name="favicon"
          type="url"
          readOnly
        />
      </label>
      <label className={Styles.label}>
        Email twórcy
        <input
          className={Styles.input}
          value={fields.creatorEmail ?? ''}
          name="creatorEmail"
          onChange={handleChange}
          placeholder="Podaj email twórcy"
          type="email"
        />
      </label>
      <label className={Styles.labelCheckbox}>
        <input
          className={Styles.inputCheckbox}
          checked={fields.isPublic}
          name="isPublic"
          onChange={handleInputCheckboxChange}
          type="checkbox"
        />
        Czy blog ma być pokazany na stronie?
      </label>
      <Button type="submit" disabled={!isValid} className={Styles.submitButton}>
        Zapisz
      </Button>
    </form>
  );
});
UpdateBlogForm.displayName = 'UpdateBlogForm';
