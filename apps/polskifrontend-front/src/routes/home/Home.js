import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';

class Home extends React.Component {
  render() {
    const blogs = [
      {
        name: 'Na Frontendzie',
        href: '#',
        articles: [
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
        ]
      },
      {
        name: 'DevCorner',
        href: '#',
        articles: [
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
        ]
      },
      {
        name: 'Ferrante',
        href: '#',
        articles: [
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
        ]
      },
      {
        name: 'devstyle',
        href: '#',
        articles: [
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
        ]
      },
      {
        name: 'Blog title',
        href: '#',
        articles: [
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
        ]
      },
      {
        name: 'Blog title',
        href: '#',
        articles: [
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
        ]
      },
      {
        name: 'Blog title',
        href: '#',
        articles: [
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
          { title: 'Super tytuł', href: '#' },
        ]
      },
    ];

    return (
      <div className={style.container}>
        {blogs.map((item, index) => {
          return (
            <div className={style['container__wrapper']}>
              <section key={index} className={style['container__blog']}>
                <h2 className={style.title}>
                  <a className={style['title__link']} href={item.href}>{item.name}</a>
                </h2>
                <section className={style.items}>
                  {item.articles.map((article, artIndex) => {
                    return <a className={style['items__link']} key={artIndex} href={article.href}>{article.title}</a>
                  })}
                </section>
              </section>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(style)(Home);
