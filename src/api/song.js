import {commonParams} from './config';
import axios from 'axios';

export function getLyric() {
	const url = '/api/lyric';

	const data = Object.assign({}, commonParams, {
		songmid: '003tbRjy4V1wRt',
		platform: 'yqq',
		needNewCode: 0,
		hostUin: 0,
		categoryId: 10000000,
		format: 'json'
	});

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}
