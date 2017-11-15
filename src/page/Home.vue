<template>
  <div class="home">
    <div class="fixed">
      <top></top>
      <content-view></content-view>
    </div>
    <div :style="style" class="view">
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
          style: {
            'padding-bottom': '70px'
          }
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
    width: 100%;
    top: 0;
    z-index: 2;
  }
  .view{
    margin-top: 104px;
  }
</style>
