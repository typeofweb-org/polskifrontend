import clsx from 'clsx';
import type { ChangeEvent, FormEvent } from 'react';
import { useRef, memo, useCallback, useEffect, useState } from 'react';

import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import type { BlogIdRequestBody } from '../../pages/api/blogs/[blogId]';
import { getBlog } from '../../utils/api/getBlog';
import { updateBlog } from '../../utils/api/updateBlog';
import { Button } from '../Button/Button';

import styles from './updateBlogForm.module.scss';

type Props = {
  readonly blogId: string;
};

const INITIAL_VALUES: BlogIdRequestBody = {
  name: '',
  href: '',
  rss: '',
  slug: '',
  favicon: '',
  creatorEmail: '',
  isPublic: false,
};

export const UpdateBlogForm = memo<Props>(({ blogId }) => {
  const { mutate, status } = useMutation((body: BlogIdRequestBody) => updateBlog(blogId, body));
  const { value: blog, status: queryStatus } = useQuery(() => getBlog(blogId));
  const [fields, setFields] = useState<BlogIdRequestBody>(INITIAL_VALUES);
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (queryStatus === 'success' && blog) {
      setFields(blog);
    }
  }, [queryStatus, blog]);

  useEffect(() => {
    setIsValid(formRef.current?.checkValidity() ?? false);
  }, [fields, formRef]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({ ...fields, [e.currentTarget.name]: e.currentTarget.value }));
  }, []);

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
      className={clsx(styles.form, isLoading && styles.formLoading)}
      ref={formRef}
    >
      <label className={styles.label}>
        Nazwa bloga
        <input
          className={styles.input}
          value={fields.name}
          name="name"
          onChange={handleChange}
          placeholder="Podaj nazwę bloga"
          required
          type="text"
        />
      </label>
      <label className={styles.label}>
        Href bloga
        <input
          className={styles.input}
          value={fields.href}
          name="href"
          onChange={handleChange}
          placeholder="Podaj href bloga"
          required
          type="url"
        />
      </label>
      <label className={styles.label}>
        Rss bloga
        <input
          className={styles.input}
          value={fields.rss}
          name="rss"
          onChange={handleChange}
          placeholder="Podaj rss bloga"
          required
          type="url"
        />
      </label>
      <label className={styles.label}>
        Slug bloga
        <input
          className={styles.input}
          value={fields.slug}
          name="slug"
          onChange={handleChange}
          placeholder="Podaj slug bloga"
          type="text"
        />
      </label>
      <label className={styles.label}>
        Favicon bloga
        <input
          className={styles.input}
          value={fields.favicon}
          name="favicon"
          onChange={handleChange}
          placeholder="Podaj url dla favicon"
          type="url"
        />
      </label>
      <label className={styles.label}>
        Email twórcy
        <input
          className={styles.input}
          value={fields.creatorEmail}
          name="creatorEmail"
          onChange={handleChange}
          placeholder="Podaj email twórcy"
          type="email"
        />
      </label>
      <label className={styles.label}>
        Czy blog ma być pokazany na stronie?
        <input
          className={styles.input}
          checked={fields.isPublic}
          name="isPublic"
          onChange={handleChange}
          type="checkbox"
          required
        />
      </label>
      <Button type="submit" disabled={!isValid}>
        Zapisz
      </Button>
    </form>
  );
});
UpdateBlogForm.displayName = 'UpdateBlogForm';
