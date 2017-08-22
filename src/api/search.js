import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';

export function getHotkey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  });
  return jsonp(url, data, options);
}
