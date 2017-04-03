import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';

const BlogList = props => {
  return (
    <ResponsivePanel className={style.container} header="Lista blogów" description="Poniżej można usuwać oraz edytować blogi" >
      <ul className={style.list}>
        <li className={style.item}>
          <h3 className={style['item__title']}>Nazwa 1</h3>
          <p className={style['item__url']}><a href="#">http://link-do-bloga.pl</a></p>
          <p className={style['item__url']}><a href="#">http://adres-kanału-rss.xml</a></p>
        </li>
          <li className={style.item}>
          <h3 className={style['item__title']}>Nazwa 1</h3>
          <p className={style['item__url']}><a href="#">http://link-do-bloga.pl</a></p>
          <p className={style['item__url']}><a href="#">http://adres-kanału-rss.xml</a></p>
        </li>
          <li className={style.item}>
          <h3 className={style['item__title']}>Nazwa 1</h3>
          <p className={style['item__url']}><a href="#">http://link-do-bloga.pl</a></p>
          <p className={style['item__url']}><a href="#">http://adres-kanału-rss.xml</a></p>
        </li>
          <li className={style.item}>
          <h3 className={style['item__title']}>Nazwa 1</h3>
          <p className={style['item__url']}><a href="#">http://link-do-bloga.pl</a></p>
          <p className={style['item__url']}><a href="#">http://adres-kanału-rss.xml</a></p>
        </li>
          <li className={style.item}>
          <h3 className={style['item__title']}>Nazwa 1</h3>
          <p className={style['item__url']}><a href="#">http://link-do-bloga.pl</a></p>
          <p className={style['item__url']}><a href="#">http://adres-kanału-rss.xml</a></p>
        </li>
      </ul>
    </ResponsivePanel>
  );
};

export default withStyles(style)(BlogList);
