import React from 'react';
import News from './News';
import Layout from '../../components/Layout/Layout';
import * as settingsHelper from '../../core/helpers/settingsHelper';

export default {
  path: '/aktualnosci',
  async action() {
    // update visit date to check if there are new items
    const settings = settingsHelper.getSettings();
    settings.lastNewsVisit = Date.now();
    settingsHelper.saveSettings(JSON.stringify(settings));

    return {
      title: 'Aktualności | Polski Front-End',
      description: 'Aktualności dotyczące serwisu Polski Front-End - dowiedz się, co nowego!',
      component: <Layout><News /></Layout>
    };
  }
};
