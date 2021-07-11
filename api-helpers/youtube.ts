import * as Googleapis from 'googleapis';

import { getConfig } from './config';

const DEFAULT_AVATAR = 'https://www.youtube.com/s/desktop/d743f786/img/favicon_48.png';

export const getYouTubeChannelFavicon = async ({
  channelId,
  username,
}: {
  readonly channelId?: string;
  readonly username?: string;
}) => {
  if (!channelId && !username) {
    return DEFAULT_AVATAR;
  }

  const yt = Googleapis.google.youtube('v3');

  const where = channelId ? { id: [channelId] } : { forUsername: username };

  const result = await yt.channels.list({
    ...where,
    key: getConfig('YOUTUBE_API_KEY'),
    part: ['snippet'],
  });

  return result.data.items?.[0].snippet?.thumbnails?.default?.url || DEFAULT_AVATAR;
};
