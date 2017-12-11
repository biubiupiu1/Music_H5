<template>
  <div class="top">
    <mu-appbar title="Dou@ya Music" titleClass="top_title">
      <i class="iconfont icon-qinglv"  slot="right" @click="toggle"></i>
    </mu-appbar>
  </div>
</template>

<script>
  import "../assets/css/font.css"
  export default {
    name: 'top',
    data () {
      return {
      }
    },
    methods: {
      toggle() {
          this.$emit("toggle");
      }
    }
  }
</script>

<style scoped>
.top{
  font-family: 'ChannelSlanted2dc53f189b19aa7';
  height: 60%;
}
.top i{
  font-size: 35px;
  color: #fff;
}
</style>
