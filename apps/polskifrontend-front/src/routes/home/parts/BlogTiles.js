import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogTiles.styl';
import Loader from '../../../components/Indicators/Loader';
import TilesArticles from './TilesArticles';

const BlogTiles = props => {
  return (
    <div className={style.container}>
      <Loader isLoading={props.blogListLoading}>
        {props.blogList.map((item, index) => {
          return (
            <div className={style['container__wrapper']} key={index}>
              <section className={style['container__blog']}>
                <h2 className={style.title}>
                  <a className={style['title__link']} target="_blank" href={item.href}>
                    {item.favicon !== '' ? <img className={style['title__favicon']} src={item.favicon} /> : null}
                    {item.name}
                    </a>
                </h2>
                <TilesArticles articles={item.articles || []} />
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

BlogTiles.propTypes = {
  blogList: PropTypes.array.isRequired,
  blogListLoading: PropTypes.bool.isRequired
};

export default withStyles(style)(BlogTiles);
