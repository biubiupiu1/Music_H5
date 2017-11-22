<template>
  <div class="player">
    <div class="covebg" :style="{'background': 'url(' + bgUrl + ')'}"></div>

    <page-top :data="{title: song.name, describe: song.autho, fun: ToHome}"></page-top>
    <div class="comments" v-show="isComment">
      <div style="overflow-y: auto;height: 100%">
        <div class="comment" v-for="n in 5">
          <mu-list-item title="皇试试的" describeText="Jan 9, 2014" disabled>
            <mu-avatar src="http://p1.music.126.net/r4OXsQQn_JIvEKklzQBV_w==/2271591023036753.jpg" slot="leftAvatar"/>
            <span slot="right">6666</span>
            <i class="iconfont icon-dianzan1"  slot="right"></i>
          </mu-list-item>
          <p class="comment_content">commentcommentcommentcommentcommentcommentcomment</p>
        </div>
      </div>
    </div>

    <div class="group" v-show="!isComment">
      <transition-group name="fade" >
        <div v-show="!isLyric" @click="ToggleLyric" key="group1">
          <div class="content">
            <div class="img center">
              <img class="center" :src="song.headerUrl" alt="">
            </div>
          </div>
          <div class="Lyric">
            <p>{{}}</p>
          </div>
        </div>

        <lyric v-show="isLyric" key="group2"></lyric>

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
  let timer ,timerOut;
  import { mapState } from 'vuex'
  import scroll_To from '../libs/scroll'
  import slider from '../libs/slider/Index.vue'
  import pageTop from '../components/PageTop.vue'
  import lyric from '../components/Lyric.vue'
  export default {
    components:{ slider, pageTop, lyric},
    data () {
      return {
        isLyric: true,
        isComment: false
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
      bgUrl(){
        let reg = /.*\/(\d+)\..*/;
        let id = this.song.headerUrl.replace(reg, "$1");
        return "http://music.163.com/api/img/blur/" + id;
      }
    },
    watch:{

    },
    methods:{
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
.group ,.comments{
  height: 8.5rem;
  overflow: hidden;
}
.comments{
  padding: 30px 0;
  overflow-y: auto;
}
.comment{
  width: 96%;
  margin: 0 auto;
  border-bottom: 1px solid #8c8c8c;
}
.comment p{
  width: 98%;
  margin: 0 auto;
  color: #d9d9d9;
  word-wrap:break-word;
  padding-bottom: 15px;
}
.comment_content{
  color: #fff;
}
</style>
