import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TilesArticles.styl';
import dateFormat from 'dateformat';
import he from 'he';
import * as dateHelper from '../../../core/helpers/dateHelper';

const TilesArticles = props => {
  const oneDay = 60 * 60 * 24 * 1000; // ms
  return (
    <section className={styles.items}>
      {(props.articles || []).map((article, artIndex) => {
        const isTodayArticle = dateHelper.isToday(new Date(article.date));
        const itemClass = `${styles.item} ${isTodayArticle ? styles['item--today'] : ''}`;
        const tagClass = `${styles['item__new']} ${isTodayArticle ? styles['item__new--visible'] : ''}`;

        return (
          <div className={itemClass} key={artIndex}>
            <a className={styles['item__link']} target="_blank" href={article.href}>
              <span className={tagClass}>Nowość</span>
              {article.title}
            </a>
            <span className={styles['meta']}>
              <p className={styles['meta__date']}>{dateFormat(article.date, 'dd-mm-yyyy')}</p>
              <p className={styles['meta__description']}>
                {`${he.decode(article.description.replace(/(<([^>]+)>)/ig, ''))} [...]`}
              </p>
            </span>
          </div>
        )
      })}
    </section>
  );
};

TilesArticles.propTypes = {
  articles: PropTypes.array.isRequired
};

export default withStyles(styles)(TilesArticles);
