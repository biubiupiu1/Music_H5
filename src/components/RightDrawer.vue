<template>
  <mu-drawer right :open="isOpen" :docked="false" @close="toggle()">
    <mu-appbar>
      <i class="iconfont icon-zhuti-copy">主题替换</i>
    </mu-appbar>
    <div class="header">
      <img src="../assets/img/header.jpeg" alt="">
    </div>
    <div class="list">
      <mu-list>
        <mu-list-item :title="item.name" v-for="item in themes" @click="setTheme(item.name)" :key="item.name">
          <i class="iconfont icon-zhuti-" :style="{color: item.color}" slot="left"></i>
          <i class="iconfont icon-zhengque" :style="{color: item.color}" slot="right" v-show="themeName === item.name"></i>
        </mu-list-item>
      </mu-list>
    </div>
    <div class="about csse40a2b41819aa7">
      created by biubiupiu
    </div>
  </mu-drawer>
</template>

<script>
  export default {
    data() {
      return {
        themes: [{name: "default", color: "#ff4081"}, {name: "dark", color: "#1565c0"}, {name: "light", color:"#2196f3"},
          {name: "green", color: "#00c853"}, {name: "carbon", color: "#474a4f"}],
        themeName: '',
      }
    },
    props: ["isOpen"],
    created() {
      console.log()
    },
    mounted() {
      this.getThemeName();
    },
    methods: {
      getThemeName() {
        if(!this.$empty(localStorage.getItem("theme")))
          this.themeName = localStorage.getItem("theme").split("_")[1];
        else
          this.themeName = document.body.className.split("_")[1];
      },
      toggle() {
        this.$emit("toggle");
      },
      setTheme(name) {
        document.body.className = "style_" + name;
        localStorage.setItem("theme", "style_" + name);
        this.getThemeName();
      }
    }
  }
</script>

<style scoped>
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
    font-size: .35rem;
  }
  .iconfont::before{
    padding-right: 5px;
  }
  .list{
    width: 85%;
    margin: 0 auto;
    padding-top: 30px;
  }
  .about{
    font-size: .4rem;
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 100px;
  }
</style>
