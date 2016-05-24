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
    const serie = _.get(data, 'Series.Title');
    const episodeName = _.get(data, 'Episodes[0].Title');
    const episodeNumber = _.get(data, 'Episodes[0].EpisodeNumber');
    const seasonNumber = _.get(data, 'Episodes[0].SeasonNumber');
    const message = `Hey guys, episode "${episodeName}" (${episodeNumber}) from "${serie}" season "${seasonNumber}" was just downloaded.`;

    sonarr.downloaded(telegram, message);
  };

  handleRequest(data);
};