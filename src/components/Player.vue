<template>
  <div class="player">
    <div class="covebg" :style="{'background': 'url(' + bgUrl + ')'}"></div>

    <page-top :data="{title: song.name, describe: song.autho, icon: 'icon-41', funLeft: ToHome, funRight: ToComments}"></page-top>

    <lyric></lyric>

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
  import slider from '../libs/slider/Index.vue'
  import pageTop from '../components/PageTop.vue'
  import lyric from '../components/Lyric.vue'
  export default {
    components:{ slider, pageTop, lyric},
    data () {
      return {
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
      ToComments(){
        if(!this.$empty(this.song.id)){
          this.ToHome();
          this.$router.push({ name: 'Comments', params: {id: this.song.id, name: this.song.name }});
        }

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
