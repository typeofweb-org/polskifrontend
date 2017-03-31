import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Add.styl';

class Add extends React.Component {
  render() {
    return (
      <div className={style.container}>
        Tutaj będzie dodawanie
      </div>
    );
  }
}

export default withStyles(style)(Add);
