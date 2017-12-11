<template>
  <div class="comments_all">
    <page-top :data="title"></page-top>

    <div class="comments">
      <mu-circular-progress :size="60" v-if="isLoading"/>
      <div style="overflow-y: auto;height: 100%;padding-bottom: 1.1rem" v-show="!isLoading" ref="scroller">
        <div class="colum">精彩评论</div>
        <comment-lists :comments="hotComments"></comment-lists>
        <div class="colum">最新评论</div>
        <comment-lists :comments="newComments"></comment-lists>
        <mu-infinite-scroll :scroller="scroller" :loading="isLoadMore" :loadingText="loadingText" @load="loadMore"/>
      </div>
    </div>

  </div>
</template>

<script>
  import pageTop from '../components/PageTop.vue'
  import CommentLists from '../components/CommentLists.vue'
  import API from '../config/api'
  export default {
    data() {
      return {
        hotComments: [],
        newComments: [],
        total: null,
        songName: '',
        scroller: null,
        isLoading: true,
        isLoadMore: false,
        num: 10,
        loadingText: '加载中.....',
        id: 0,
      }
    },
    created(){

    },
    mounted(){
      this.scroller = this.$refs.scroller;
      this.setStyle();
      this.$store.state.reSize.push(this.setStyle);
    },
    beforeRouteEnter (to, from, next) {
      next( vm => {
        if(vm.id !== to.params.id){
          vm.num = 10;
          vm.isLoading = true;
          vm.loadComments(vm.num, false);
          vm.loadSongName();
        }else {
          vm.scroller.scrollTop = vm.$store.state.scroll.comments;
        }
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.state.scroll.comments = this.scroller.scrollTop;
      next();
    },
    computed:{
      title() {
        if(!this.$empty(this.total))
            return {title: `${this.songName}(${this.total})`, funLeft: () => this.$router.go(-1)};
        else
            return {title: '评论'}
      },
    },
    components: {pageTop, CommentLists},
    methods: {
      loadMore () {
        this.num += 10;
        this.isLoadMore = true;
        if(this.num > 100){
            this.num = 100;
            this.loadingText = '我是有底线的@_@';
            return;
        }
        this.loadComments(this.num, true);
        console.log('loadMore')
      },
      setStyle(){
        document.querySelector('.comments').style.height = window.screen.height - 1 * window.fontsize + 'px';
      },
      loadComments(limit, isLoadMore) {
        this.id = this.$route.params.id;
        this.$http.get(API.getComments(this.id, limit)).then(res => {
          if(res.data.code === 200){
              if(!isLoadMore){
                this.total = res.data.total;
                this.hotComments = res.data.hotComments;
                this.isLoading = false;
              }else
                this.isLoadMore = false;
              this.newComments = res.data.comments;
          }else {

          }
        })
      },
      loadSongName() {
        if(!this.$empty(this.$route.params.name)){
          this.songName = this.$route.params.name;
          return;
        }
        else {
          this.$http.get(API.getSongDetail(this.$route.params.id)).then(res => {
            if(res.data.code === 200)
              this.songName = res.data.songs[0].name;
            else {

            }
          }).catch((error) => {
          })
        }
      },

    },
    filters:{

    }
  }
</script>

<style scoped>

.colum{
  background: #f3f3f3;
  font-size: .23rem;
  padding: .07rem .2rem;
}
.comments{
  height: 11.5rem;
  overflow-y: auto;
}
</style>
