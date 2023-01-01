import { AuthGuard } from '../AuthGuard/AuthGuard';
import { Table } from '../Table/Table';

import { ChangeBlogsList } from './ChangeBlogsList';
import Styles from './adminBlogsList.module.scss';

import type { AdminTableBlogsRow, TypeOfBlogs } from '../../types';

type AdminBlogsListProps = {
  readonly blogs: readonly AdminTableBlogsRow[];
  readonly type: TypeOfBlogs;
};

export const AdminBlogsList = ({ blogs, type }: AdminBlogsListProps) => {
  return (
    <AuthGuard userRole="ADMIN">
      <section className={Styles.section}>
        <h2 className={Styles.heading}>Admin Panel - Blogi</h2>
        <ChangeBlogsList type={type} />

        {blogs.length > 0 && <Table data={blogs} />}
      </section>
    </AuthGuard>
  );
};
