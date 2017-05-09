import fetch from '../../core/fetch';
import { apiUrl } from '../../config';

export default async function getArticlesInitialState(slug, state) {
  const url = `${apiUrl}/articles/${slug}`;
  const getData = async () => {
    const response = await fetch(url, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' });
    return await response.json();
  };

  const remoteData = await getData();
  if (remoteData.success) {
    state.article = remoteData.article;
    state.articleLoaded = true;
    state.articleLoading = false;
    state.articleError = false;
  } else {
    state.articleError = true;
  }

  return state;
}
