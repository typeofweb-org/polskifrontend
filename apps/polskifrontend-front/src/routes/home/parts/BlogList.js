import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';
import Loader from '../../../components/Indicators/Loader';
import dateFormat from 'dateformat';
import { decode } from 'he';
import Waypoint from 'react-waypoint';
import ReactImageFallback from 'react-image-fallback';
import noImage from '../../../../public/no_image.png';
import * as dateHelper from '../../../core/helpers/dateHelper';

const BlogList = props => {
  return (
    <ResponsivePanel className={styles.container} header="Wszystkie artykuły" description="">
      <Loader isLoading={props.isLoading}>
        {props.children}
        {props.articles.map((item, index) => {
          const isTodayArticle = dateHelper.isToday(new Date(item.date));
          const clicked = props.clickedArticles.find(art => art.url === item.href);
          let itemClass = `${styles.item} ${isTodayArticle ? styles['item--today'] : ''}`;
          let buttonItemClass = `${styles['buttons__item']} ${isTodayArticle ? styles['buttons__item--today'] : ''}`;
          let tagClass = `${styles['item__new']} ${isTodayArticle ? styles['item__new--visible'] : ''}`;
          itemClass = `${itemClass} ${clicked ? styles['item--clicked'] : ''}`;
          buttonItemClass = `${buttonItemClass} ${clicked ? styles['buttons__item--clicked'] : ''}`;
          tagClass = `${tagClass} ${clicked ? styles['item__new--clicked'] : ''}`;

          const description = item.description ? decode(item.description.replace(/(<([^>]+)>)/ig, '')) : '';

          return (
            <div className={itemClass} key={index}>
              <div className={styles.article}>
                <h3 className={styles['article__header']}>
                  <span className={tagClass}>Nowe</span>
                  <Link to={`/artykuly/${item.slug}`}
                        onMouseUp={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                        onTouchStart={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                  >{item.title}</Link>
                </h3>
                <div className={styles['meta']}>
                  <p className={styles['meta__date']}>
                    <ReactImageFallback src={item._blog.favicon} fallbackImage={noImage} initialImage={noImage} />
                    <span>
                      <a href={item._blog.href} target="_blank" title={item._blog.name}>{item._blog.name}</a>
                    </span> | {dateFormat(item.date, 'dd-mm-yyyy')}
                  </p>
                  <p className={styles['meta__description']}>
                    {description}
                  </p>
                </div>
              </div>
              <div className={styles.buttons}>
                <div className={styles['buttons__container']}>
                  <div className={styles['buttons__wrapper']}>
                    {isTodayArticle && !clicked
                      ? <a href=""
                           className={buttonItemClass}
                           onMouseUp={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                           onTouchStart={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                           onClick={(event) => event.preventDefault()}
                      >
                        <i className="icon-ok-circled">
                        </i>
                        <span className={styles['buttons__text']}>Czytany</span>
                      </a>
                      : null}
                    <Link className={buttonItemClass}
                          to={`/artykuly/${item.slug}`}
                          onMouseUp={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                          onTouchStart={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                    >
                      <i className="icon-folder-open">
                      </i>
                      <span className={styles['buttons__text']}>Otwórz</span>
                    </Link>
                    <a href={item.href}
                       className={buttonItemClass}
                       rel="nofollow"
                       target="_blank"
                       onMouseUp={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                       onTouchStart={props.onArticleClicked.bind(this, item.href, isTodayArticle)}
                    >
                      <i className="icon-link-ext-alt">
                      </i>
                      <span className={styles['buttons__text']}>Oryginał</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.clear}>
              </div>
            </div>);
        })}
      </Loader>
      {props.nextPage !== -1 ? (
        <Loader isLoading={props.isLoadingMore}>
          <Waypoint onEnter={props.onScrolledBottom} scrollableAncestor="window" />
        </Loader>
      ) : null}
    </ResponsivePanel>
  );
};

BlogList.propTypes = {
  articles: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  clickedArticles: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  nextPage: PropTypes.number.isRequired,
  onArticleClicked: PropTypes.func.isRequired,
  onScrolledBottom: PropTypes.func.isRequired
};

export default withStyles(styles)(BlogList);
