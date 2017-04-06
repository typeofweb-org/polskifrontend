import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogList.styl';
import Loader from '../../../components/Indicators/Loader';
import dateFormat from 'dateformat';
import he from 'he';

const BlogList = props => {
  return (
    <div className={style.container}>
      <Loader isLoading={props.blogListLoading}>
        {props.blogList.map((item, index) => {
          return (
            <div className={style['container__wrapper']} key={index}>
              <section className={style['container__blog']}>
                <h2 className={style.title}>
                  <a className={style['title__link']} href={item.href}>{item.name}</a>
                </h2>
                <section className={style.items}>
                  {(item.articles || []).map((article, artIndex) => {
                    return (
                      <div className={style.item}>
                        <a className={style['item__link']} key={artIndex} href={article.href}>{article.title}</a>
                        <span className={style['meta']}>
                          <p className={style['meta__date']}>{dateFormat(article.date, 'dd-mm-yyyy')}</p>
                          <p className={style['meta__description']}>
                            {`${he.decode(article.description.replace(/(<([^>]+)>)/ig, '').substring(0, 80))} [...]`}
                          </p>
                        </span>
                      </div>
                    )
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
  blogListLoading: PropTypes.bool.isRequired
};

export default withStyles(style)(BlogList);
