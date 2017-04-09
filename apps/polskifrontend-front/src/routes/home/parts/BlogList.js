import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogList.styl'
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Loader from '../../../components/Indicators/Loader';
import dateFormat from 'dateformat';
import he from 'he';
import Waypoint from 'react-waypoint';
import ReactImageFallback from 'react-image-fallback';
import noImage from '../../../../public/no_image_light.png';
import * as dateHelper from '../../../core/helpers/dateHelper';

const BlogList = props => {
  return (
    <ResponsivePanel className={styles.container} header="Wszystkie artykuły" description="">
      <Loader isLoading={props.isLoading}>
        {props.articles.map((item, index) => {
          const isTodayArticle = dateHelper.isToday(new Date(item.date));
          const itemClass = `${styles.item} ${isTodayArticle ? styles['item--today'] : ''}`;
          const tagClass = `${styles['item__new']} ${isTodayArticle ? styles['item__new--visible'] : ''}`;

          return (
            <section key={index}>
              <div className={itemClass}>
                <a className={styles['item__link']} href={item.href} target="_blank">
                  <span className={tagClass}>Nowość</span>
                  <ReactImageFallback src={item._blog.favicon} fallbackImage={noImage} />
                  {item.title}
                </a>
                <span className={styles['meta']}>
                  <p className={styles['meta__date']}>
                    <a href={item._blog.href} target="_blank">{item._blog.name}</a> | {dateFormat(item.date, 'dd-mm-yyyy')}
                  </p>
                  <p className={styles['meta__description']}>
                    {he.decode(item.description.replace(/(<([^>]+)>)/ig, ''))}
                  </p>
                </span>
              </div>
            </section>);
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
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  onScrolledBottom: PropTypes.func.isRequired,
  nextPage: PropTypes.number.isRequired
};

export default withStyles(styles)(BlogList);
