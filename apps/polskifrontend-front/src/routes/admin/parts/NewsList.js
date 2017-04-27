import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NewsList.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Loader from '../../../components/Indicators/Loader';

const NewsList = (props) => {
  const { newsList, newsListLoading } = props;
  const description = newsList.length > 0 ? 'Tutaj można usuwać i edytować dodane już aktualności' : 'Nie dodano jeszcze żadnych aktualności';

  return (
    <ResponsivePanel className={style.container} header="Lista aktualności" description={description}>
      <Loader isLoading={newsListLoading}>
        {newsList.length > 0 ? 'tu będzie lista' : null}
      </Loader>
    </ResponsivePanel>
  );
};

NewsList.propTypes = {
  newsList: PropTypes.array.isRequired,
  newsListLoading: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
  refreshLoading: PropTypes.bool.isRequired
};

export default withStyles(style)(NewsList);
