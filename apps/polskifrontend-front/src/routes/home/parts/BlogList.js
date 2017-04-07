import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogList.styl'
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Loader from '../../../components/Indicators/Loader';
import dateFormat from 'dateformat';
import he from 'he';

const BlogList = props => {
  return (
    <Loader isLoading={props.isLoading}>
      <ResponsivePanel className={styles.container} header="Wszystkie artykuły" description="">
        {props.articles.map((item, index) => {
          const isTodayArticle = dateFormat(item.date, 'dd-mm-yyyy') === dateFormat(Date.now(), 'dd-mm-yyyy');
          const itemClass = `${styles.item} ${isTodayArticle ? styles['item--today'] : ''}`;
          const tagClass = `${styles['item__new']} ${isTodayArticle ? styles['item__new--visible'] : ''}`;

          return (
            <section key={index}>
              <div className={itemClass}>
                <a className={styles['item__link']} href={item.href}>
                  <span className={tagClass}>Nowość</span>
                  <img src={item._blog.favicon} />
                  {item.title}
                </a>
                <span className={styles['meta']}>
                  <p className={styles['meta__date']}>
                    <a href={item._blog.href}>{item._blog.name}</a> | {dateFormat(item.date, 'dd-mm-yyyy')}
                  </p>
                  <p className={styles['meta__description']}>
                    {he.decode(item.description.replace(/(<([^>]+)>)/ig, ''))}
                  </p>
                </span>
              </div>
            </section>);
        })}
      </ResponsivePanel>
    </Loader>
  );
};

BlogList.propTypes = {
  articles: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(BlogList);
