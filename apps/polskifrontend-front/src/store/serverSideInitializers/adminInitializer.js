import { initialState as adminState } from '../../reducers/admin';
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
      adminState.tokenExpired = true;
      return adminState;
    }

    adminState.blogList = remoteData.blogs;
    adminState.blogListLoading = false;
    return adminState;
  } catch(error) {
    console.log(error);
  }
}
