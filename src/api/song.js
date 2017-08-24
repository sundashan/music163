import {commonParams} from './config';
import axios from 'axios';

export function getLyric(songmid) {
	const url = '/api/lyric';

	const data = Object.assign({}, commonParams, {
		songmid: songmid,
		platform: 'yqq',
		needNewCode: 0,
		hostUin: 0,
		categoryId: 10000000,
		pcachetime: +new Date(),
		format: 'jsonp'
	});

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}
