import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ArticleView.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';
import dateFormat from 'dateformat';
import Loader from '../../../components/Indicators/Loader';

const ArticleView = (props) => {
  return (
    <div>
      <Link className={styles.back} to="/">
        <i className="fa fa-arrow-left">
        </i>
        Strona główna
      </Link>
      <ResponsivePanel className={styles.container}
                       header={props.blogName}
                       description=""
                       image={props.blogIcon}
                       showImage
                       href={props.blogHref}
      >
        <Loader isLoading={props.isLoading}>
          <div className={styles.item}>
            <h2 className={styles['item__header']}>
              <a href={props.href} target="_blank" rel="nofollow" title={props.title}>{props.title}</a>
            </h2>
            <div className={styles['meta']}>
              <p className={styles['meta__date']}>
                {dateFormat(props.date, 'dd-mm-yyyy')}
              </p>
              <pre className={styles['meta__message']}>
                {props.description}
              </pre>
            </div>
          </div>
          <div className={styles.more}>
            <h3 className={styles['more__header']}>Chcesz więcej? Przeczytaj w oryginale!</h3>
            <a className={styles['more__link']} href={props.href} target="_blank" rel="nofollow" title={props.title}>
              <i className="fa fa-link">
              </i>
              Przejdź do artykułu
            </a>
          </div>
        </Loader>
      </ResponsivePanel>
    </div>
  );
};

ArticleView.propTypes = {
  blogName: PropTypes.string.isRequired,
  blogIcon: PropTypes.string.isRequired,
  blogHref: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isLoading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(ArticleView);
