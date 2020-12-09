import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import styles from "./Footer.styl";

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();

    return (
      <div className={styles.footer}>
        <p>
          {`Copyright@2017&nbsp;-&nbsp;${currentYear}`}
          <a
            className={styles["footer__link"]}
            target="_blank"
            href="https://nafrontendzie.pl"
          >
            Na Frontendzie
          </a>
        </p>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
