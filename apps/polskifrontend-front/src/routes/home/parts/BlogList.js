import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogList.styl';
import Loader from '../../../components/Indicators/Loader';

const BlogList = props => {
  return (
    <div className={style.container}>
      <Loader isLoading={props.isLoading}>
        {props.blogList.map((item, index) => {
          return (
            <div className={style['container__wrapper']} key={index}>
              <section className={style['container__blog']}>
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
        <div className={style['container__clear']}>
        </div>
      </Loader>
    </div>
  );
};

BlogList.propTypes = {
  blogList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(style)(BlogList);
