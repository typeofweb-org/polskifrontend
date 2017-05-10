import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RetinaImage from 'react-retina-image';
import styles from './Header.styl';
import Link from '../Link/Link';
import logo from '../../../public/polskifrontend_logo_black.png';
import logo2 from '../../../public/polskifrontend_black@2x.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scrolled: false };
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll(event) {
    // how pixels is to top
    const target = event.target || event.srcElement;
    const scrollTop = target.documentElement.scrollTop || target.body.scrollTop || 0;
    const scrolled = scrollTop > 250;

    this.setState({ scrolled });
  }

  render() {
    const containerStyle = `${styles.header} ${this.state.scrolled ? styles['header--scrolled'] : ''}`;

    return (
      <div className={containerStyle}>
        <Link className={styles['header__link']} to="/">
          <h1 className={styles['header__title']}>
            <RetinaImage src={[logo, logo2]} alt="Polski Front-End Logo" />
            <span className={styles['header--hidden']}>Polski Front-End - serwisy na temat front-endu w jednym miejscu!</span>
          </h1>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
