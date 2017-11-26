<template>
  <div class="top">
    <mu-appbar>
      <mu-icon-button class="iconfont icon-fanhui" slot="left" @click="_funL"></mu-icon-button>
      <mu-icon-button v-if="data.icon" :class="`iconfont ${data.icon}`" slot="right" @click="_funR" />
      <mu-list-item :title="data.title || '无标题'" :describeText="data.describe"></mu-list-item>
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
    methods: {
      _funL() {
          if(!this.$empty(this.data.funLeft) && typeof this.data.funLeft === 'function')
              this.data.funLeft();
          else
              console.log('undefined data.funLeft')
      },
      _funR(){
          if(!this.$empty(this.data.funRight) && typeof this.data.funRight === 'function')
            this.data.funRight();
          else
            console.log('undefined data.funRight')
      }
    }
  }
</script>

<style scoped>
  .top .mu-appbar{
    background: rgba(0,0,0,0);
  }
</style>
