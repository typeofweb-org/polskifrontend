import { initialState as adminBlogsState } from '../../reducers/adminBlogs';
import fetch from '../../core/fetch';
import { apiUrl } from '../../config';

export default async function getAdminInitialState(authCookie) {
  const getData = async () => {

    const headers = {
      'x-access-token': authCookie,
      'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw=='
    };
    const response = await fetch(`${apiUrl}/admin/blogs`, { headers });
    return await response.json();
  };

  try {
    const remoteData = await getData();

    if (remoteData.success === false && (remoteData.reason === 'bad-token' || remoteData.reason === 'no-token')) {
      return {
        tokenExpired: true,
        adminBlogsState
      };
    }

    adminBlogsState.blogList = remoteData.blogs;
    adminBlogsState.blogListLoading = false;

    return {
      tokenExpired: false,
      adminBlogsState
    };
  } catch(error) {
    console.log(error);
  }
}
