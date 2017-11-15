/**
 * Created by biubiupiu on 2017/7/16.
 */
const TEMP = '/api';

export default {
  getSongSheet( order , limit ){
    return `${TEMP}/top/playlist?limit=${limit}&order=${order}`;
  },
  getSongSheetDetail(id) {
    return `${TEMP}/playlist/detail?id=${id}`
  },
  getSong(id){
    return `${TEMP}/music/url?id=${id}`
  },
  getLyric(id){
    return `${TEMP}/lyric?id=${id}`
  },
}
