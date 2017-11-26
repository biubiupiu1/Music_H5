<template>
  <div class="bot-player">
    <audio :src="song.fileUrl" @ended="Next" @canplay="canPlay" @timeupdate="LoadPlayerProgress" id="CoreAudio" ref="CoreAudio"/>
    <div class="header float">
      <mu-list-item :title="song.name" :describeText="song.autho" disabled>
        <div slot="left" class="auto">
          <mu-circular-progress :size="40" class="loading centerXY" v-if="song.loading"/>
          <mu-avatar @click="ToPlayer":src="song.headerUrl" class="centerXY" v-else/>
        </div>
      </mu-list-item>
    </div>
    <div class="control float">
      <mu-icon-button @click="$emit('show-sheet')" class="iconfont icon-lists float"></mu-icon-button>
      <div class="float mid">
        <mu-circular-progress mode="determinate":strokeWidth="2" :size="40" class="center" color="#C3C1C2" :value="100"/>
        <mu-circular-progress mode="determinate" :value="player.playProgress" :size="40" :strokeWidth="2" class="center"/>
        <mu-icon-button :class="'iconfont center ' + midIcon " @click="TogglePlay"></mu-icon-button>
      </div>
      <mu-icon-button @click="Next" class="iconfont icon-Next float"></mu-icon-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'BotPlayer',
    data () {
        return {

        }
    },
    computed:{
      ...mapState(['song' , 'player' , 'songList' , 'state' , 'index' , 'autoPlay' , 'repeat']),
      midIcon(){
        return this.state ? 'icon-stop' : 'icon-start';
      },
    },
    mounted(){
      let dom = this.$refs.CoreAudio;
      dom.onprogress= this.LoadBufferProgress;
    },
    watch:{
      state(val){
        let dom = this.$refs.CoreAudio;
        val ? dom.play() : dom.pause();
      },
      repeat(val){
        let dom = this.$refs.CoreAudio;
        dom.loop = val;
      }
    },
    methods:{
      ToPlayer(event){
        this.$emit('toPlayer');
      },
      TogglePlay(){
        this.$store.commit('TogglePlayerState');
      },
      canPlay(){
        if(this.autoPlay){
          let dom = this.$refs.CoreAudio;
          this.$store.state.state = true;
          dom.play();
        }
      },
      LoadPlayerProgress(){
        let dom = this.$refs.CoreAudio;
        let player = this.$store.state.player;
        player.playProgress =dom.currentTime / dom.duration * 100;
        player.nowTime = dom.currentTime.toFixed(2);
        player.totalTime = parseInt( dom.duration );
        this.$store.state.player = Object.assign({},this.$store.state.player);
//        console.log(dom.buffered.end(dom.buffered.length - 1) /  dom.duration)
      },
      LoadBufferProgress(){
        let dom = this.$refs.CoreAudio;
        this.$store.state.player.bufferProgress = ( dom.buffered.end(dom.buffered.length - 1) /  dom.duration ) *100;
      },
      Next(){
          if(this.repeat){
              return;
          }
          this.$store.commit('Next');
      }
    }
}
</script>

<style scoped>
.bot-player{
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 1.15rem;
  z-index: 10000;
  background-color: #f2f0f1;
}
.header{
  width: 55%;
  position: relative;
}
.header .loading{
  padding: 0;
}
.control{
  width: 40%;
  height: 1.15rem;
}
.control .float{
  width: 32%;
  height: 70px;
}
.control button{
  font-size: 0.4rem;
  padding: 0;
  display: block;
  width: 0.95rem;
}
.control .midicon{
  font-size: 0.6rem;
}
.control .mid{
  position: relative;
}
.control .mu-circular-progress{
  padding: 0;
}

</style>
