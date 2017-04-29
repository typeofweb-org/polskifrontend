import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NewsList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Loader from '../../../components/Indicators/Loader';
import dateFormat from 'dateformat';

const NewsList = (props) => {
  const { newsList, newsListLoading, onDeleteClick, onEditClick } = props;
  const description = newsList.length > 0 ? 'Tutaj można usuwać i edytować dodane już aktualności' : 'Nie dodano jeszcze żadnych aktualności';

  const list = (
    <ul className={style.list}>
      {newsList.map((item, index) => {
        return (
          <li key={index} className={style.item}>
            <h3 className={style['item__title']}>{item.title}</h3>
            <span className={style['item__date']}>{dateFormat(item.date, 'dd-mm-yyyy hh:MM')}</span>
            <p className={style['item__message']}>{item.message}</p>
            <div className={style.buttons}>
              <a className={`${style['buttons__item']} ${style['buttons__item--special']}`} onClick={onDeleteClick.bind(this, item['_id'])} href="#">
                <i className="fa fa-trash-o">
                </i>
              </a>
              <a className={`${style['buttons__item']}`} onClick={onEditClick.bind(this, item['_id'])} href="#">
                <i className="fa fa-pencil-square-o">
                </i>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <ResponsivePanel className={style.container} header="Lista aktualności" description={description}>
      <Loader isLoading={newsListLoading}>
        {newsList.length > 0 ? list : null}
      </Loader>
    </ResponsivePanel>
  );
};

NewsList.propTypes = {
  newsList: PropTypes.array.isRequired,
  newsListLoading: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};

export default withStyles(style)(NewsList);
