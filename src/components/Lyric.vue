<template>
  <div class="group">
    <transition-group name="fade" >
      <div v-show="!isLyric" @click="ToggleLyric" key="group1">
        <div class="content">
          <div class="img center">
            <img class="center" :src="song.headerUrl" alt="">
          </div>
        </div>
        <div class="Lyric">
          <p>{{lyric}}</p>
        </div>
      </div>

      <div class="allLyric" v-show="isLyric" key="group2" @click="ToggleLyric">
        <div ref="lyrics" @touchmove="TouchMove">

          <p ref="lyric" v-for="( item , _index ) in lyrics" :class="{ active: _index == index - 1 }">
            <span class="centerXY">{{isRoll ? item.content : item}}</span>
          </p>
          <p v-for="item in 4"></p>

        </div>
      </div>

    </transition-group>
  </div>

</template>

<script>
  let timer ,timerOut;
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        lyrics: [],
        index: 0,
        isRoll: false,
        isTouch: false,
        isLyric: false,
        tNow: 0,
      }
    },
    created(){

    },
    computed: {
      ...mapState(['song' , 'player' , 'songList' , 'state' , 'repeat' ]),
      lyric(){
        if( !this.$empty(this.lyrics) ){

          if( !this.isRoll ) return "暂不支持滚动@__@";
          let s = Number(this.player.nowTime);
          let diff = s - this.tNow;
          let begain = diff >= 0 ? this.index : 0;
          let end = diff >= 0 ? this.lyrics.length : this.index;
          for( var i = begain; i < end; i++ ){
            if(Number( this.lyrics[i].time) > s){
              this.index = i;
              break;
            }
          }
          if(i === end)
            this.index = this.lyrics.length;
          this.tNow = s;
          return this.lyrics[this.index - 1 > 0 ? this.index-1 : 0].content;
        } else {
          return {contet: '加载中....'};
        }
      },
    },
    watch: {
      index(val , oldVal){
        let _this = this;
        let dom = this.$refs.lyrics;
        if(this.$refs.lyric && !this.isTouch){
          let tScrollTop = Number ( ( val - 4 ) * window.fontsize );
          tScrollTop = tScrollTop >=0 ? tScrollTop : 0;
          clearInterval(timer);
          timer = setInterval(function () {

            let iScrollTop = dom.scrollTop;
            let tS = tScrollTop - iScrollTop;

            if( tS >= 0){
              dom.scrollTop += Math.ceil(tS / 10);
              if(dom.scrollTop >= tScrollTop){
                dom.scrollTop = tScrollTop;
                clearInterval(timer);
              }
            } else {
              dom.scrollTop += Math.floor(tS / 10) ;
              if(dom.scrollTop <= tScrollTop ){
                dom.scrollTop = tScrollTop;
                clearInterval(timer);
              }
            }
          },20)
        }
      },
      song(){
        clearInterval(timer);
        this.index = 0;
        this.tNow = 0;
        this.isRoll = false;
        this.$refs.lyrics.scrollTop = 0;
        this.LoadLyrics();
      },
    },
    methods: {
      ToggleLyric(){
        this.isLyric = !this.isLyric;
      },
      LoadLyrics(){
        let lrcArr = [];
        if( !this.song.lyric ) return;

        let lyrics = this.song.lyric.split('\n');
        lyrics.pop();
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let autho = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let index = 1;
        for(let i = 0 ; i < lyrics.length ; i++){
          let time = lyrics[i].match(timeReg);
          let content = lyrics[i].replace(timeReg, '');
          if(time && content){
            if(!this.isRoll) this.isRoll = true;
            let min = Number ( String(time[0].match(/\[\d*/i)).slice(1) );
            let sec = Number ( String(time[0].match(/\:\d*(\.\d*)?/g)).slice(1));
            let TimeS = min * 60 + sec;
            let obj = {time: TimeS ,content: content};
            lrcArr.push(obj);
          }
        }
        this.lyrics = !this.isRoll ? lyrics : lrcArr;
      },
      TouchMove(e){
        this.isTouch = true;
        let _this = this;
        clearTimeout(timerOut);
        timerOut = setTimeout(function () {
          _this.isTouch = false;
        },3000)
      },
    }
  }
</script>

<style scoped>
.content{
  position: relative;
  height: 7rem;
}
.content .img{
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 2rem;
  overflow: hidden;
  background: url("../assets/img/play_bg.png") no-repeat 50%;
  background-size: contain;
}
.content .img img{
  width: 68%;
  display: block;
  z-index: -1;
}
.control{
  width: 70%;
  margin: 0 auto;
  bottom: .3rem;
}
.Lyric{
  width: 100%;
  height: 1.5rem;
}
.Lyric p{
  width: 80%;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  font-size: .28rem;
}
.allLyric{
  color: #fff;
  height:7rem;
  text-align: center;
  margin: .75rem 0;
  overflow: hidden;
  position: relative;
}
.allLyric>div{
  overflow-y: auto;
  transition: all .3s;
  /*position: absolute;*/
  /*top: 0;*/
  width: 100%;
  height: 7rem;
  /*transform: translate( 0 , 0);*/
}
.allLyric>div p{
  width: 70%;
  margin: 0 auto;
  height: 1rem;
  position: relative;
}
.allLyric>div p span{
  width: 100%;
}
</style>
