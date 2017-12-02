<template>
  <div class="home">
    <div class="fixed">
      <top></top>
      <content-view></content-view>
    </div>
    <div  class="view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Top from '../components/Top.vue'
  import ContentView from '../components/Content.vue'
  export default {
    name: 'home',
    data () {
      return {

      }
    },
    created(){

    },
    components:{ Top,ContentView },
    computed:{
    }
  }
</script>

<style scoped>
.fixed{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
}
.view{
  height: 86%;
  margin-top: 1.8rem;
}
.home{
  height: 100%;
}
</style>
