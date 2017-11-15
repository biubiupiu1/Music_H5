<template>
  <div class="player">
    <div class="covebg" :style="{'background': 'url(' + bgUrl + ')'}"></div>

    <div class="top">
      <mu-appbar>
        <mu-icon-button class="iconfont icon-fanhui" slot="left" @click.nativ="ToHome"></mu-icon-button>
        <mu-icon-button icon="expand_more" slot="right"/>
        <mu-list-item :title="song.name" :describeText="song.autho"></mu-list-item>
      </mu-appbar>
    </div>

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

        <div class="allLyric" v-show="isLyric" @click="ToggleLyric" key="group2">
          <div ref="lyrics" @touchmove="TouchMove">
            <p ref="lyric" v-for="( item , _index ) in lyrics" :class="{ active: _index == index - 1 }">
              <span class="centerXY">{{isRoll ? item.content : item}}</span>
            </p>
            <p v-for="item in 4"></p>
          </div>
        </div>

      </transition-group>
    </div>

    <div class="progress">
      <span>{{player.nowTime | timeOut}}</span>
      <div class="sliders">
        <mu-linear-progress mode="determinate" :size="2" color="gray" :value="player.bufferProgress" class="buffer"/>
        <slider v-model="player.playProgress" @change="ChangeTime" class="slider"/>
      </div>
      <span>{{player.totalTime | timeOut}}</span>
    </div>

    <div class="control">
      <div class="btn">
        <mu-icon-button :class="`iconfont ${repeatIcon} float`" @click="ToggleRepeat"></mu-icon-button>
        <mu-icon-button @click="Prev" class="iconfont icon-icon-playerprev float"></mu-icon-button>
        <mu-icon-button @click="TogglePlay" :class="`iconfont ${midIcon} float mid`"></mu-icon-button>
        <mu-icon-button @click="Next" class="iconfont icon-icon-playernext float"></mu-icon-button>
        <mu-icon-button @click="$emit('show-sheet')" class="iconfont icon-liebiao float"></mu-icon-button>
        <div style="clear: both"></div>
      </div>
    </div>

  </div>
</template>

<script>
  let timer;
  import { mapState } from 'vuex'
  import scroll_To from '../libs/scroll'
  import slider from '../libs/slider/Index.vue'
  export default {
    components:{ slider  },
    data () {
      return {
        tNow: 0,
        isLyric: false,
        isTouch: false,
        isRoll: false,
        index: 0,
        timeEr: null,
        lyrics: []
      }
    },
    created(){

    },
    computed:{
      ...mapState(['song' , 'player' , 'songList' , 'state' , 'repeat' ]),
      midIcon(){
        return this.state ? 'icon-icon-playerstop' : 'icon-icon-playerstart';
      },
      StoIndex(){
        return this.$store.state.index;
      },
      repeatIcon(){
        return this.repeat ? 'icon-icon-repeat' : 'icon-icon-order';
      },

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
      bgUrl(){
        let reg = /.*\/(\d+)\..*/;
        let id = this.song.headerUrl.replace(reg, "$1");
        return "http://music.163.com/api/img/blur/" + id;
      }
    },
    watch:{
      song(){
          clearInterval(timer);
          this.index = 0;
          this.tNow = 0;
          this.isRoll = false;
          this.$refs.lyrics.scrollTop = 0;
          this.LoadLyrics();
      },
      StoIndex(){

      },
      lyrics(val){
        //console.log(val);
      },
      isTouch(val){
        //console.log(val);
      },
      index(val , oldVal){
        let _this = this;
        let dom = this.$refs.lyrics;
        if(this.$refs.lyric && !this.isTouch){
          let tScrollTop = Number ( ( val - 4 ) * window.fontsize );
          tScrollTop = tScrollTop >=0 ? tScrollTop : 0;
          console.log(tScrollTop);
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
      }
    },
    methods:{
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
      ToHome(){
          this.$emit('toHome');
      },
      TogglePlay(){
        this.$store.commit('TogglePlayerState');
      },
      ChangeTime(val){
        let dom = document.querySelector('#CoreAudio');
        dom.currentTime = ( val / 100 ) * dom.duration;
      },
      Next(){
        this.$store.commit('Next');
      },
      Prev(){
        this.$store.commit('Prev');
      },
      ToggleRepeat(){
        this.$store.state.repeat = !this.$store.state.repeat;
      },
      TouchMove(e){
        this.isTouch = true;
        let _this = this;
        setTimeout(function () {
          _this.isTouch = false;
        },3000)
      },
      ToggleLyric(){
        this.isLyric = !this.isLyric;
      }
    },
    filters:{
      timeOut(val){
        let sec =( Array(2).join(0) + Math.floor( val % 60 ) ).slice(-2);
        let min =( Array(2).join(0) + Math.floor( val/60 ) ).slice(-2);
        return `${min}:${sec}`
      },
    }
  }
</script>

<style scoped>
.player{
  position: absolute;
  z-index: 99;
  background: #000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.sliders{
  position: relative;
  width: 70%;
}
.top .mu-appbar{
  background: rgba(0,0,0,0);
}
.player .covebg{
  opacity: 0.3;
}
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
  transition: all .3s;
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
.control{

}
.control .float{
  width: 20%;
  height: 100%;
  font-size: .5rem;
  display: block;
}
.control .mid{
  font-size: .7rem;
}
.control .btn{
  height: 1.5rem;
}
.progress{
  display: flex;
  bottom: 1.8rem;
  width: 80%;
  margin: 0 auto;
}
.progress span{
  width: 15%;
  line-height: 24px;
  text-align: center;
}
.buffer{
  position: absolute;
  top: 11px;
  z-index: 2;
}
.group{
  height: 8.5rem;
  overflow: hidden;
}
</style>
