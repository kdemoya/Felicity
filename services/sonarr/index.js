/**
 * Felicity | index.js
 *
 * @author Kelvin De Moya <http://github.com/kdemoya>.
 */
'use strict';

import * as _ from 'lodash';
import { sonarr } from '../../utils/triggers';
import { telegram } from '../../configs';


export default (data) => {
  const handleRequest = (data) => {
    const serie = _.pick(data, 'Series.Title');
    const episodeName = _.pick(data, 'Episodes.Title');
    const episodeNumber = _.pick(data, 'Episodes.EpisodeNumber');
    const seasonNumber = _.pick(data, 'Episodes.SeasonNumber');
    const message = `Hey guys, episode ${episodeNumber} (${episodeName}) from ${serie} season ${seasonNumber} was just downloaded.`;

    sonarr.downloaded(telegram, message);
  };

  handleRequest(data);
};