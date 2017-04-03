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
