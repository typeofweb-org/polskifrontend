import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './TopHomePanel.styl';
import RetinaImage from 'react-retina-image';
import logo from '../../../public/polskifrontend_logo_black.png';
import logo2 from '../../../public/polskifrontend_black@2x.png';
import Link from '../Link/Link';

const TopHomePanel = (props) => {
  return (
    <div className={style.container}>
      <div className={style['container__green']}>
      </div>
      <div className={style.wrapper}>
        <h2>
          <Link to="/" title="Polski Front-End">
            <RetinaImage src={[logo, logo2]} alt="Polski Front-End Logo" />
          </Link>
        </h2>
        <hr />
        <h3 className={style['wrapper__title']}>Polskie serwisy na temat front-endu</h3>
      </div>
    </div>
  );
};

export default withStyles(style)(TopHomePanel);
