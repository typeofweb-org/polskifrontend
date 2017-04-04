import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';

const BlogList = props => {
  const { blogList } = props;

  return (
    <ResponsivePanel className={style.container} header="Lista blogów" description="Poniżej można usuwać oraz edytować blogi" >
      <ul className={style.list}>
        {blogList.map((item, index) => {
          return (
            <li key={index} className={style.item}>
              <h3 className={style['item__title']}>{item.name}</h3>
              <p className={style['item__url']}><a target="_blank" href={item.href}>{item.href}</a></p>
              <p className={style['item__url']}><a target="_blank" href={item.rss}>{item.rss}</a></p>
              <div className={style.buttons}>
                <a className={`${style['buttons__item']} ${style['buttons__item--special']}`} href="#">
                  <i className="fa fa-trash-o">
                  </i>
                </a>
                <a className={style['buttons__item']} href="#">
                  <i className="fa fa-pencil-square-o">
                  </i>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </ResponsivePanel>
  );
};

BlogList.propTypes = {
  blogList: PropTypes.array.isRequired,
  blogListLoading: PropTypes.bool.isRequired
};

export default withStyles(style)(BlogList);
