import { initialState as newsState } from '../../reducers/news';
import fetch from '../../core/fetch';
import { apiUrl } from '../../config';

export default async function getNewsInitialState() {
  const url = `${apiUrl}/news/1`;
  const getData = async () => {
    const response = await fetch(url, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' });
    return await response.json();
  };

  const remoteData = await getData();
  if (remoteData.success) {
    newsState.newsList = remoteData.newses;
    newsState.newsListNextPage = remoteData.nextPage;
  }

  return newsState;
}
