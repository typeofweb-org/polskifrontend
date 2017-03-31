import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';

class Home extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    homeState: PropTypes.object
  };

  componentDidMount() {
    const { actions: { getBlogList } } = this.props;
    getBlogList();
  }

  render() {
    let { homeState: { blogList } } = this.props;
    blogList = blogList || [];

    return (
      <div className={style.container}>
        {blogList.map((item, index) => {
          return (
            <div className={style['container__wrapper']}>
              <section key={index} className={style['container__blog']}>
                <h2 className={style.title}>
                  <a className={style['title__link']} href={item.href}>{item.name}</a>
                </h2>
                <section className={style.items}>
                  {(item.articles || []).map((article, artIndex) => {
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
