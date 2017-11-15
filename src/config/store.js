/**
 * Created by biubiupiu on 2017/7/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import API from '../config/api'
import Axios from 'axios'
import Toast from '../libs/toast/src/toast'

const store = new Vuex.Store({
  state: {
    state: false,
    index: '',
    songList: [],
    autoPlay: true,
    repeat: false,
    song: {
      loading: false,
      id: '',
      name: '歌曲名称',
      autho: '作者',
      headerUrl: '',
      imgUrl: '',
      fileUrl: '',
      lyric: '',
      lyricUser: '',
    },
    player: {
      nowTime: '',
      totalTime: '',
      playProgress: 0,
      bufferProgress: 0
    },

  },
  mutations: {
    TogglePlayerState(state){
      if(state.songList.length !== 0){
        state.state = !state.state;
      } else {
        Toast({
          message: '播放列表还没有歌曲哦(＠_＠)',
          position: 'bottom',
        });
      }
    },
    GetSong (state, index) {
      let tIndex = index || state.index;
      copyObj(state.song ,state.songList[tIndex]);
      state.song.loading = true;
      Axios.get(API.getSong(state.songList[tIndex].id)).then(res => {
        let url = res.data.data[0].url;
        if(res.data.data[0].code === 200){
          state.song.fileUrl = url;
          state.song.loading = false;
          store.commit("GetLyric" , tIndex);
        }else {
          LoadError();
        }
      })
      .catch((error) => {
        LoadError();
      })
    },
    GetLyric(state , tIndex){
      Axios.get(API.getLyric(state.songList[tIndex].id)).then(res => {
        if(res.data.code === 200 && !empty(res.data.lrc)){
          if(res.data.lyricUser)
            state.song.lyricUser = res.data.lyricUser.nickname;
          state.song.lyric = res.data.lrc.lyric;
        } else {
          state.song.lyric = "暂无歌词@^^@";
        }
        state.song = Object.assign({},state.song);
      })
    },
    SetIndex(state , index){
      state.autoPlay = true;
      if(state.index === index){
        return
      }
      state.state = false;
      state.index = index;
      store.commit("GetSong");
    },
    Next(state){
      state.autoPlay = true;
      if(++state.index === state.songList.length){
        state.index = 0;
      }
      store.commit("GetSong");
    },
    Prev(state){
      state.autoPlay = true;
      if(state.index-- === 0){
        state.index = state.songList.length - 1;
      }
      store.commit("GetSong");
    },
    DelSong(state , index){
      state.songList.splice(index , 1);
      if(state.index > index){
        state.index--;
        return;
      }
      if(index === state.index){
        state.autoPlay = state.state ? 1 : 0;
        store.commit("GetSong");
      }
    }
  }

});


export default store;

let empty = function (obj) {// 判断传入的值是否为空
  return typeof (obj) === "undefined" || obj === "" || obj === null;
};
function LoadError() {
  toastBot("抱歉加载失败！！");
  store.commit('Next');
}

function copyObj( to ,from ) {
  for (let item in to){
    if( !empty(from[item]) ){
      to[item] = from[item];
    }
  }
}

function toastBot( str ) {
  Toast({
    message: str,
    position: 'bottom',
  });
}
