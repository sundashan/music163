import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';

export function getmusicList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    tpl: 3,
    type: 'top',
    topid: 4
  });
  return jsonp(url, data, options);
}