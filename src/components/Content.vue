<template>
  <div class="content">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="NetEase" title="网易"/>
      <mu-tab value="QQ" title="扣扣"/>
      <mu-tab value="XiaMi" title="虾米"/>
      <mu-tab value="Search" title="搜索"/>
    </mu-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    computed:{
      activeTab(){
        return this.$route.name;
      }
    },
    methods:{
      handleTabChange(val){
        this.activeTab = val;
        this.$router.push({name: val});
      },
    }
  }
</script>

<style scoped>
.mu-tabs{
  background-color: #fff;
}
</style>
