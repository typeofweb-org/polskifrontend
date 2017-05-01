import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './NewsList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';
import Loader from '../../../components/Indicators/Loader';
import Waypoint from 'react-waypoint';
import dateFormat from 'dateformat';
import * as dateHelper from '../../../core/helpers/dateHelper';

const NewsList = (props) => {
  return (
    <div>
      <Link className={styles.back} to="/">
        <i className="fa fa-arrow-left">
        </i>
        Strona główna
      </Link>
      <ResponsivePanel className={styles.container} header="Aktualności" description="Poniżej znajdziesz ostatnie aktulaności dotyczące serwisu">
        {props.newsList.map((item, index) => {
          const isTodayArticle = dateHelper.isToday(new Date(item.date));
          const newClass = `${styles['item__new']} ${isTodayArticle ? styles['item__new--visible'] : ''}`;

          return (
            <div key={index}>
              <div className={styles.item}>
                <h2 className={styles['item__header']}>
                  <span className={newClass}>Nowe</span>
                  {item.title}
                </h2>
                <div className={styles['meta']}>
                  <p className={styles['meta__date']}>
                    {dateFormat(item.date, 'dd-mm-yyyy hh:MM')}
                  </p>
                  <pre className={styles['meta__message']}>
                    {item.message}
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
        {props.nextPage !== -1 ? (
          <Loader isLoading={props.isLoadingMore}>
            <Waypoint onEnter={props.onScrolledBottom} scrollableAncestor="window" />
          </Loader>
        ) : null}
      </ResponsivePanel>
    </div>
  );
};

NewsList.propTypes = {
  newsList: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  onScrolledBottom: PropTypes.func.isRequired
};

export default withStyles(styles)(NewsList);
