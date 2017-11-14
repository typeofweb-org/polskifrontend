import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ogImage from '../../../public/polskifrontend_og.png';

const HeaderSettings = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:url" content={`http://www.polskifrontend.pl${props.currentPath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`http://www.polskifrontend.pl${ogImage}`} />
    </Helmet>
  );
};

HeaderSettings.propTypes = {
  currentPath: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default HeaderSettings;
