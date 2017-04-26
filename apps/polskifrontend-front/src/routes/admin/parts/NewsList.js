import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NewsList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';

const NewsList = (props) => {
  return (
    <ResponsivePanel className={style.container} header="Lista aktywności" description="Tutaj można usuwać i edytować dodane już aktualności">
      Aktualności
    </ResponsivePanel>
  );
};

export default withStyles(style)(NewsList);
