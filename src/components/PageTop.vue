<template>
  <div class="top">
    <mu-appbar>
      <mu-icon-button class="iconfont icon-fanhui" slot="left" @click.nativ="data.fun"></mu-icon-button>
      <mu-icon-button class="iconfont icon-41" slot="right"/>
      <mu-list-item :title="data.title" :describeText="data.describe"></mu-list-item>
    </mu-appbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props:['data'],
  }
</script>

<style scoped>
  .top .mu-appbar{
    background: rgba(0,0,0,0);
  }
</style>
