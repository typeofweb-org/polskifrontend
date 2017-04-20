import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TilesArticles.styl';
import dateFormat from 'dateformat';
import he from 'he';
import * as dateHelper from '../../../core/helpers/dateHelper';

const TilesArticles = props => {
  return (
    <div className={styles.items}>
      {(props.articles || []).map((article, artIndex) => {
        const isTodayArticle = dateHelper.isToday(new Date(article.date));
        const clicked = props.clickedArticles.find(art => art.url === article.href);
        let itemClass = `${styles.item} ${isTodayArticle ? styles['item--today'] : ''}`;
        let tagClass = `${styles['item__new']} ${isTodayArticle ? styles['item__new--visible'] : ''}`;
        itemClass = `${itemClass} ${clicked ? styles['item--clicked'] : ''}`;
        tagClass = `${tagClass} ${clicked ? styles['item__new--clicked'] : ''}`;

        const description = article.description ? he.decode(article.description.replace(/(<([^>]+)>)/ig, '')) : '';

        return (
          <div className={itemClass} key={artIndex}>
            <a className={styles['item__link']} target="_blank" href={article.href} rel="nofollow" onMouseDown={props.onArticleClicked.bind(this, article.href, isTodayArticle)}>
              <span className={tagClass}>Nowość</span>
              {article.title}
            </a>
            <div className={styles['meta']}>
              <p className={styles['meta__date']}>{dateFormat(article.date, 'dd-mm-yyyy')}</p>
              <p className={styles['meta__description']}>
                {`${description} [...]`}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  );
};

TilesArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  clickedArticles: PropTypes.array.isRequired,
  onArticleClicked: PropTypes.func.isRequired
};

export default withStyles(styles)(TilesArticles);
