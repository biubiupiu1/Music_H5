/**
 * Created by biubiupiu on 2017/7/16.
 */
const TEMP = 'http://39.108.53.123:3000';

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
  getComments(id, limit){
    return `${TEMP}/comment/music?id=${id}&limit=${limit}`
  },
  getSongDetail(id) {
    return `${TEMP}/song/detail?ids=${id}`
  },
  getPersonalized() {
    return `${TEMP}/personalized`
  }
}

