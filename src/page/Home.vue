<template>
  <div class="home">
    <div class="fixed">
      <top @toggle="toggle"></top>
      <content-view></content-view>
    </div>
    <div  class="view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <mu-drawer right :open="isOpen" @close="toggle()">
      <mu-appbar>
        <i class="iconfont icon-zhuti-copy"></i>主题替换
      </mu-appbar>
      <div class="header">
        <img src="../assets/img/header.png" alt="">
      </div>
      <mu-list>
        <mu-list-item :title="item" v-for="item in themes"/>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
  import Top from '../components/Top.vue'
  import ContentView from '../components/Content.vue'
  export default {
    name: 'home',
    data () {
      return {
        isOpen: false,
        themes: ["default", "dark"]
      }
    },
    created(){

    },
    mounted() {
      this.setStyle();
      this.$store.state.reSize.push(this.setStyle);
    },
    components:{ Top,ContentView },
    methods: {
      setStyle() {
        document.querySelector('.view').style.paddingTop = window.screen.height * 0.14 + 'px';
      },
      toggle() {
        this.isOpen = !this.isOpen;
      }
    },
    computed:{
    }
  }
</script>

<style scoped>
.fixed{
  position: absolute;
  top: 0;
  width: 100%;
  height: 14%;
  z-index: 3;
}
.view{
  height: 100%;
}
.home{
  height: 100%;
  position: relative;
}
.header{
  width: 50%;
  margin: 0 auto;
  border-radius: 50%;
  margin-top: 30px;
  overflow: hidden;
}
.header img{
  display: block;
  width: 100%;
  height: 100%;
}
.iconfont {
  font-size: .8rem;
}
</style>
