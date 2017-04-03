import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Add.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

class Add extends React.Component {
  render() {
    return (
      <div className={style.container}>
        Tutaj będzie dodawanie
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Add));
