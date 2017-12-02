<template>
  <div class="netease">
    <div class="title">
      <div class="select" >
        <span @click="toggleSel">{{option === "hot" ? "热门歌单" : "新歌歌单"}}</span>
        <i class="iconfont icon-select"></i>
        <div class="hide" v-show="isSelect">
          <p :class="{active: option === 'hot'}" @click="choose('hot')">热门歌单</p>
          <p :class="{active: option === 'new'}" @click="choose('new')">新歌歌单</p>
        </div>
      </div>
    </div>
    <mu-circular-progress :size="60" v-if="isLoading"/>
    <div class="song-sheet" v-else="">
      <mu-flexbox wrap="wrap" justify="space-around" :gutter="0">
        <mu-flexbox-item basis="40%" @click.native="ToSongList(item)" v-for="(item , index) in data[option].songLists" :key="item.id" class="sheet">
          <div class="sheet_top">
            <i class="iconfont icon-music"></i>{{item.playCount}}
            <i class="iconfont icon-play"></i>
          </div>
          <img :src="item.imgUrl + '?param=300y300'">
          <div class="sheet_title">{{item.title}}</div>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <mu-infinite-scroll v-if="isDestroy" :scroller="scroller" :loading="isLoadMore" :loadingText="loadingText" @load="loadMore"/>
  </div>
</template>

<script>
  export default {
    name: 'NetEase',
    data () {
      return {
        songLists: [],
        isLoading: true,
        num: 10,
        scroller: null,
        isLoadMore: false,
        isDestroy: true,
        option: 'hot',
        loadingText: '加载中。。。',
        isSelect: false,
        data: {hot: {num: 10, songLists: []}, new: {num: 10, songLists: []}}
      }
    },
    created(){
      console.log("created");
      this.loadData();
    },
    beforeRouteEnter (to, from, next) {
      next( vm => {
        vm.isDestroy = true;
      });
    },
    beforeRouteLeave(to, from, next){
      this.isDestroy = false;
      next();
    },
    mounted(){
      console.log(document.body);
      this.scroller = window;
    },
    watch: {
      option(val) {
        if(this.data[val].songLists.length === 0){
          this.isLoading = true;
          this.loadData();
        }
        console.log(val);
      }
    },
    methods:{
      loadData() {

        let opt = this.option
        this.$http.get(this.$api.getSongSheet(opt, this.data[opt].num)).then((res) => {
          //this.songLists = res.data.playlists
          console.log(res.data.playlists)
          this.LoadLists(res.data.playlists.slice(-10));
          this.isLoading = false;
          this.isLoadMore = false;
          this.data[opt].num += 10;
        });
      },
      loadMore() {
        this.isLoadMore = true;
        if(this.data[this.option].num > 100){
            this.loadingText = '我是有底线的@_@'
        } else
            this.loadData();
      },
      LoadLists(data){
        let _this = this;
        data.forEach(function (e) {
          let obj = {};
          obj.title = e.name;
          obj.imgUrl = e.coverImgUrl;
          obj.id = e.id;
          obj.playCount =e.playCount>10000 ? parseInt(e.playCount / 10000) + '万' : e.playCount;
          obj.autho = e.creator.nickname;
          obj.description = e.description;
          obj.header = e.creator.avatarUrl;
          _this.data[_this.option].songLists.push(obj);
        });
        this.isLoading = false;
      },
      choose(val) {
        this.option = val;
        this.isSelect = false;
      },
      ToSongList(obj){
        this.$router.push({ name: 'SongList', params: {id: obj.id , data: obj }})
      },
      toggleSel() {
        this.isSelect = !this.isSelect;
      }
    }
  }
</script>

<style scoped>
.netease{
  padding: .1rem;
  height: 100%;
  overflow-y: auto;
  min-height: 5rem;
}
.title{
  height: .7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.select{
  width: 25%;
  height: .5rem;
  position: relative;
}
.select i{
  font-size: .1rem;
  color: #929292;
}
.select>span{
  border-left: 3px solid;
  padding-left: 10px;
  height: .4rem;
  line-height: .4rem;
}

.hide{
  padding-left: 13px;
  position: absolute;
  z-index: 5;
  background: #fff;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}
.sheet{
  position: relative;
  margin: 0 4px;
}
.song-sheet img{
  width: 100%;
  display: block;
  margin: 0;
}
.song-sheet .sheet_title{
  box-sizing: border-box;
  padding: 5px;
  height: 50px;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.song-sheet .sheet_top{
  width: 100%;
  position: absolute;
  height: 30px;
  line-height: 30px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  bottom: 50px;
}
.song-sheet .sheet_top .icon-play{
  float: right;
  padding-right: 10px;
}
select{
  width: 20%;
  border: none;
  outline: none;
  background: #fff;
}

select option[selected]{
}
</style>
