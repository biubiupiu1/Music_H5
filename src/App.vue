<template>
  <div id="app">
    <keep-alive>
      <router-view v-show="isRoute"></router-view>
    </keep-alive>
    <bot-player v-show="isRoute && isBot" @toPlayer="isRoute = false" @show-sheet="OpenSheet"></bot-player>
    <transition name="slide-top">
      <Player v-show="!isRoute" @toHome="isRoute = true" @show-sheet="OpenSheet" ref="player"></Player>
    </transition>
    <player-lists ref="playerlists" :state="isSheet" @hide-sheet="isSheet = false"></player-lists>
  </div>
</template>

<script>
import BotPlayer from './components/BotPlayer.vue'
import Player from './components/Player.vue'
import PlayerLists from './components/PlayerLists.vue'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data(){
      return{
        isRoute: true,
        isBot: false,
        isSheet: false,
      }
  },
  components:{ BotPlayer  , Player , PlayerLists },
  computed:{
    ...mapState([ 'songList' ]),
  },
  created(){
  },
  watch:{
    songList(val){
      this.isBot = val.length > 0 ? 1 : 0;
    }
  },
  methods:{
    OpenSheet(){
      this.isSheet = true;
    },
  }
}
</script>

<style lang="less">
@import './assets/css/theme-light';
body{
  font-size: .25rem;
}
.lucky{
  .change();
  overflow: hidden;
}
.float{
  float: left;
}
a{
  color: #000 !important;
}
.center{
  position: absolute !important;
  margin: auto !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.centerXY{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% , -50%);
}
.centerX{
  position: absolute;
  left: 50%;
  transform: translate(-50% , 0%);
}
.centerY{
  position: absolute;
  top: 50%;
  transform: translate(0% , -50%);
}

.covebg{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("https://p1.music.126.net/Bt3dFUR9xWCd8wJlmrsgXg==/3429376768564696.jpg?param=500y500");
  z-index: -1;
  top: 0;
  left: 0;
  background-repeat:no-repeat;
  background-size:cover;
  background-position:50%,50%;
  /*-webkit-filter:blur(50px);*/
  /*filter:blur(40px);*/
}





.slide-right-enter-active {
  transition: all .6s ease;
}
.slide-right-leave-active {
  /*transition: all .5s ease;*/
}
.slide-right-enter, .slide-right-leave-active {
  transform: translateX(60px);
  opacity: 0;
}
.slide-left-enter-active {
  transition: all .6s ease;
}
.slide-left-leave-active {
  /*transition: all .5s ease;*/
}
.slide-left-enter, .slide-fade-leave-active {
  transform: translateX(-60px);
  opacity: 0;
}

.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.slide-left-enter-active {
  transition: all .3s ease;
}
.slide-left-leave-active {
  transition: all .2s ease-out;
}
.slide-left-enter, .slide-left-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}

.slide-top-enter-active {
  transition: all .2s ease;
}
.slide-top-leave-active {
  transition: all .2s ease-out;
}
.slide-top-enter, .slide-top-leave-active {
  transform: translateY(200px);
  opacity: 0;
}
</style>
