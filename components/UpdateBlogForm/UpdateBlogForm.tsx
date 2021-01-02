import clsx from 'clsx';
import type { ChangeEvent, FormEvent } from 'react';
import { useRef, memo, useCallback, useEffect, useState } from 'react';

import { useMutation } from '../../hooks/useMutation';
import type { Blog } from '../../utils/api/getBlog';
import { getBlog } from '../../utils/api/getBlog';
import type { BlogBody as BlogPutRequestBody } from '../../utils/api/updateBlog';
import { updateBlog } from '../../utils/api/updateBlog';
import { FormStatus } from '../AddContentCreatorForm/FormStatus';
import { Button } from '../Button/Button';

import styles from './updateBlogForm.module.scss';

type Props = {
  readonly blogId: string;
};

const INITIAL_VALUES: BlogPutRequestBody = {
  name: '',
  href: '',
  rss: '',
  slug: '',
  favicon: '',
  creatorEmail: '',
  isPublic: false,
};

export const UpdateBlogForm = memo<Props>(({ blogId }) => {
  const { mutate, status, errorCode } = useMutation((body: BlogPutRequestBody) =>
    updateBlog(blogId, body),
  );
  const [blog, setBlog] = useState<Blog | null>(null);
  const [fields, setFields] = useState<BlogPutRequestBody>(INITIAL_VALUES);
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setIsValid(formRef.current?.checkValidity() ?? false);
  }, [fields, formRef]);

  useEffect(() => {
    void getBlog(blogId).then((blog) => {
      setBlog(blog);
      setFields(blog);
    });
  }, [blogId]);

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
          type="text"
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
          type="text"
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
        Email influencera
        <input
          className={styles.input}
          value={fields.creatorEmail}
          name="creatorEmail"
          onChange={handleChange}
          placeholder="Podaj email influencera"
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
        />
      </label>
      <Button type="submit" disabled={!isValid}>
        Zgłoś
      </Button>
      <FormStatus status={status} errorCode={errorCode} />
    </form>
  );
});
UpdateBlogForm.displayName = 'UpdateBlogForm';
