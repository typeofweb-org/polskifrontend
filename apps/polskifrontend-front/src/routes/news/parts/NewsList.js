import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './NewsList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';

const NewsList = (props) => {
  return (
    <div>
      <Link className={styles.back} to="/">
        <i className="fa fa-arrow-left">
        </i>
        Strona główna
      </Link>
      <ResponsivePanel className={styles.container} header="Aktualności" description="Poniżej znajdziesz ostatnie aktulaności dotyczące serwisu">
        <p>Aktualności</p>
      </ResponsivePanel>
    </div>
  );
};

export default withStyles(styles)(NewsList);
