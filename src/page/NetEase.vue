<template>
  <div class="netease">
    <div class="title">
      <span>推荐歌单</span>
    </div>
    <mu-circular-progress :size="60" v-if="isLoading"/>
    <div class="song-sheet" v-else="">
      <mu-flexbox wrap="wrap" justify="space-around" :gutter="0">
        <mu-flexbox-item basis="40%" @click.native="ToSongList(item)" v-for="(item , index) in songLists" :key="item.id" class="sheet">
          <div class="sheet_top">
            <i class="iconfont icon-music"></i>{{item.playCount}}
            <i class="iconfont icon-play"></i>
          </div>
          <img :src="item.imgUrl + '?param=300y300'">
          <div class="sheet_title">{{item.title}}</div>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NetEase',
    data () {
      return {
        songLists: [],
        isLoading: true
      }
    },
    created(){
      this.$http.get(this.$api.getSongSheet('hot',10)).then((res) => {
        this.LoadLists(res.data.playlists)
      });
    },
    methods:{
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
          _this.songLists.push(obj);
        });
        this.isLoading = false;
      },
      ToSongList(obj){
        this.$router.push({ name: 'SongList', params: {id: obj.id , data: obj }})
      }
    }
  }
</script>

<style scoped>
.netease{
  padding: 10px;
}
.title{
  height: 40px;
  line-height: 40px;
  padding: 5px;
}
.title span{
  border-left: 3px solid;
  padding-left: 10px;
}
.sheet{
  position: relative;
  padding: 0px 4px;
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
</style>
