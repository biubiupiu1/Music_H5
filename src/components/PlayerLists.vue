<template>
  <div class="playerlists">
    <mu-bottom-sheet :open="state" @close="$emit('hide-sheet')" @show="SetScroll" sheetClass="playerlists">
      <mu-list-item title="播放列表" disabled>
        <mu-icon-button @click="dialog = true" slot="right" class="iconfont icon-shanchuall"></mu-icon-button>
        <span slot="after">清空</span>
      </mu-list-item>
      <mu-list ref="list">
        <mu-list-item v-if="reset" ref="lists" @click="PlayMusic(Index)" :class="{active: Index == index}" :title="item.name" v-for="(item , Index) in songList" :key="item.id">
          <mu-icon-button @click="DelSong( $event , Index)" slot="right" class="iconfont icon-shanchu"></mu-icon-button>
          <mu-icon-button v-if="Index == index" class="iconfont icon-shengyin centerY"></mu-icon-button>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <mu-dialog :open="dialog" title="提示" @close="CloseDialog">
      确定要清空播放列表吗？
      <mu-flat-button slot="actions" @click="CloseDialog" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="DelAll" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        reset: true,
      }
    },
    props:['state'],
    computed:{
      ...mapState([ 'songList' , 'index' , 'song']),
    },
    created(){
      //console.log(this.songList);
    },
    methods:{
      ShowSheet(){

      },
      HideSheet(){

      },
      DelSong(e , index){
        e.stopPropagation();
        this.$store.commit('DelSong' , index);
      },
      DelAll(){
        this.$store.state.state = false;
        this.$store.state.songList = [];
        this.dialog = false;
      },
      CloseDialog(){
          this.dialog = false;
      },
      SetScroll(){
        let len = this.$refs.lists.length;
        let tScroll = this.index / len * this.$refs.lists[0].$el.clientHeight * len;
        this.$refs.list.$el.scrollTop = tScroll;
      },
      PlayMusic(index){
        this.$store.commit("SetIndex" , index);
        this.reset = false;
        this.reset = true;
      }
    }
  }
</script>

<style scoped>
.mu-list{
  height: 5.5rem;
  overflow-y: auto;
}

</style>
