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
    <right-drawer :isOpen="isOpen" @toggle="toggle"></right-drawer>
  </div>
</template>

<script>
  import Top from '../components/Top.vue'
  import ContentView from '../components/Content.vue'
  import RightDrawer from '../components/RightDrawer.vue'
  export default {
    name: 'home',
    data () {
      return {
        isOpen: false,
      }
    },
    created(){

    },
    mounted() {
      this.setStyle();
      this.$store.state.reSize.push(this.setStyle);
    },
    components:{ Top, ContentView, RightDrawer },
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

</style>
