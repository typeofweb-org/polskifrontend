import { initialState as homeState } from '../../reducers/home';
import fetch from '../../core/fetch';
import { apiUrl } from '../../config';

export default async function getHomeInitialState(settings) {
  // set up settings stored in cookies
  homeState.isTilesOptionSelected = settings.tiles;
  homeState.isListOptionSelected = !settings.tiles;
  homeState.clickedLinks = settings.clickedLinks || [];

  const url = settings.tiles ? `${apiUrl}/blogs/all/1` : `${apiUrl}/articles/all/1`;
  const getData = async () => {
    const response = await fetch(url, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' });
    return await response.json();
  };

  const remoteData = await getData();
  if (remoteData.success) {
    if (settings.tiles) {
      homeState.blogList = remoteData.blogs;
      homeState.blogListNextPage = remoteData.nextPage;
    } else {
      homeState.allArticlesList = remoteData.articles;
      homeState.allArticlesNextPage = remoteData.nextPage;
    }
  }

  return homeState;
}
