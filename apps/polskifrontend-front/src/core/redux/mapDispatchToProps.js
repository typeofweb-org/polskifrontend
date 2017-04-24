import _ from 'lodash';
import { bindActionCreators } from 'redux';
import actions from '../../actions/actions';

export default function mapDispatchToProps(dispatch) {
  const merged = _.merge(...actions);
  const creators = _.pickBy(merged, value => typeof value === 'function');

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}
