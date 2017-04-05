import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Confirm.styl';
import ResponsivePanel from '../../components/Responsive/ResponsivePanel';

const Confirm = props => {
  const containerClass = `${styles.container} ${props.isVisible ? styles['container--visible'] : ''}`;
  const header = props.header ? props.header : 'Prośba o potwierdzenie';

  return (
    <div className={containerClass}>
      <div className={styles['container__background']}>
      </div>
      <div className={styles.wrapper}>
        <ResponsivePanel className={styles.panel} header={header} description={props.question}>
          <div className={styles['panel__buttons']}>
            <button className={`${styles['panel__button']} ${styles['panel__button--cancel']}`} onClick={props.onCancelClick} type="button">Anuluj</button>
            <button className={styles['panel__button']} type="button" onClick={props.onConfirmClick}>Potwierdź</button>
          </div>
        </ResponsivePanel>
      </div>
    </div>
  );
};

Confirm.propTypes = {
  header: PropTypes.string,
  question: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default withStyles(styles)(Confirm);
