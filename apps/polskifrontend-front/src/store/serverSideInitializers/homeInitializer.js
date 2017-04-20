import cookie from 'react-cookie';
import { initialState as homeState } from '../../reducers/home';
import fetch from '../../core/fetch';
import { apiUrl } from '../../config';

export default async function getHomeInitialState(settings) {
  // set up settings stored in cookies
  homeState.isTilesOptionSelected = settings.tiles;
  homeState.isListOptionSelected = !settings.tiles;
  homeState.clickedLinks = settings.clickedLinks || [];

  const url = settings.tiles ? `${apiUrl}/blogs/1` : `${apiUrl}/articles/all/1`;
  const getData = async () => {
    const response = await fetch(url, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' });
    return await response.json();
  };

  const getArticles = async (blogId) => {
    const response = await fetch(`${apiUrl}/articles/${blogId}`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' });
    return await response.json();
  };

  const remoteData = await getData();
  if (remoteData.success) {
    if (settings.tiles) {
      homeState.blogList = remoteData.blogs;
      homeState.blogListNextPage = remoteData.nextPage;
      for (let blog of homeState.blogList) {
        const articlesData = await getArticles(blog._id);
        blog.articles = await articlesData.success ? articlesData.articles : [];
      }
    } else {
      homeState.allArticlesList = remoteData.articles;
      homeState.allArticlesNextPage = remoteData.nextPage;
    }
  }

  return homeState;
}
