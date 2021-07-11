import { withAsync, withAuth, withMethods } from '../../../api-helpers/api-hofs';

export default withAsync(
  withAuth()(
    withMethods({
      async GET(req) {
        const user = req.session.user;
        const member = await req.db.member.findUnique({ where: { id: user.id } });
        return { data: { user, member } };
      },
    }),
  ),
);
