import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Loader from '../../../components/Indicators/Loader';

const BlogList = props => {
  const { blogList, onDeleteClick, onEditClick, blogListLoading, onRefreshClick } = props;
  const description = blogList.length === 0 ? 'Na razie nie dodano żadnych blogów...' : 'Poniżej można usuwać oraz edytować blogi';
  const refreshClass = props.refreshLoading ? style['buttons__item--disabled'] : '';

  const list = (
    <ul className={style.list}>
      {blogList.map((item, index) => {
        return (
          <li key={index} className={style.item}>
            <h3 className={style['item__title']}>{item.name}</h3>
            <p className={style['item__url']}><a target="_blank" href={item.href}>{item.href}</a></p>
            <p className={style['item__url']}><a target="_blank" href={item.rss}>{item.rss}</a></p>
            <div className={style.buttons}>
              <a className={`${style['buttons__item']} ${style['buttons__item--refresh']} ${refreshClass}`} onClick={onRefreshClick.bind(this, item['_id'])} href="#">
                <i className="fa fa-refresh">
                </i>
              </a>
              <a className={`${style['buttons__item']} ${style['buttons__item--special']} ${refreshClass}`} onClick={onDeleteClick.bind(this, item['_id'])} href="#">
                <i className="fa fa-trash-o">
                </i>
              </a>
              <a className={`${style['buttons__item']} ${refreshClass}`} onClick={onEditClick.bind(this, item['_id'])} href="#">
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
    <ResponsivePanel className={style.container} header="Lista blogów" description={description} >
      <Loader isLoading={blogListLoading}>
        {blogList.length > 0 ? list : null}
      </Loader>
    </ResponsivePanel>
  );
};

BlogList.propTypes = {
  blogList: PropTypes.array.isRequired,
  blogListLoading: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
  refreshLoading: PropTypes.bool.isRequired
};

export default withStyles(style)(BlogList);
