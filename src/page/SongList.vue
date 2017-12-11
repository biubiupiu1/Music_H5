<template>
  <div class="song-list">
    <div class="details">
      <div class="covebg" :style="{'background-image':'url(' + info.imgUrl + '?param=300y300)'}"></div>
      <div class="title">
        <mu-appbar :title="title" :zDepth="zDepth">
          <mu-icon-button slot="left" class="iconfont icon-fanhui" @click="Back"></mu-icon-button>
        </mu-appbar>
      </div>
      <div class="details_content">
        <div class="img all">
          <img :src="info.imgUrl" alt="">
          <div class="info">
            <i class="iconfont icon-music"></i>{{info.playCount}}
          </div>
        </div>
        <div class="right all">
          <mu-list-item  :title="info.autho" disabled class="white">
            <mu-avatar slot="left" :src="info.header"/>
          </mu-list-item>
          <p class="info">{{info.title}}</p>
        </div>
      </div>
    </div>
    <div class="lists">
      <mu-list>
        <mu-list-item v-for="(item,index) in lists" :key="index" :title="item.name" :describeText="item.autho" :afterText="item.about"  @click.native="PlayMusic(index)" >
          <p slot="left" class="index">{{index+1}}</p>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '歌单歌单',
        id: '',
        zDepth: 0,
        info:{},
        lists:[],
      }
    },
    computed:{
      routerData(){
          return this.$route.params;
      }
    },
    created() {
        console.log("created");
    },
    beforeRouteEnter (to, from, next) {
      console.log("beforeRouteEnter");
        next( vm => {
          vm.SetAlpha();
          if(vm.info.id !== to.params.id){
            vm.LoadInfo();
            vm.GetData();
          }
        });

    },
    beforeRouteLeave(to, from, next){
      console.log("beforeRouteLeave")
      this.$el.onscroll = null;
      next();
    },
    methods:{
        LoadInfo(res){
          console.log('LoadInfo');
          if(this.routerData.data){
            this.info = this.routerData.data;
          } else if(res){
            let data = res.playlist;
            this.info.imgUrl = data.coverImgUrl;
            this.info.title = data.name;
            this.info.autho = data.creator.nickname;
            this.info.header = data.creator.avatarUrl;
            this.info.playCount = data.playCount>10000 ? parseInt(data.playCount / 10000) + '万' : data.playCount;
            this.info = Object.assign({},this.info);
          }
        },
        LoadLists(res){
            console.log("LoadLists" , res);
            let _this = this;
            this.title = res.playlist.name;
            this.lists = [];
            let data = res.playlist.tracks;
            for(let i=0,length=data.length; i<20 ;i++){
              let obj = {};
              obj.name = data[i].name;
              obj.id = data[i].id;
              obj.about = data[i].alia[0];
              obj.headerUrl = data[i].al.picUrl;
              let str = '';
              data[i].ar.forEach(function (e) {
                str += ' '+ e.name;
              });
              obj.autho = str;
              _this.lists.push(obj)
            }
        },
        GetData(callback){
          this.$http.get(this.$api.getSongSheetDetail(this.routerData.id)).then((res) => {
            this.LoadLists(res.data);
            if(typeof callback === 'function')
                callback();
            //console.log(res.data);
            if(!this.routerData.data){
                this.LoadInfo(res.data);
            }
          })
        },
        Back(){
          this.$router.go(-1)
        },
        SetAlpha(){
          console.log("SetAlpha");
          this.$el.scrollTop  = 0;
          HTMLElement.prototype.__defineGetter__("currentStyle", function () {
            return this.ownerDocument.defaultView.getComputedStyle(this, null);
          });
          let regexp = /\d+/g;
          let dom = document.querySelector('.mu-appbar');
          let rgb = dom.currentStyle.backgroundColor.match(regexp);
          dom.style.backgroundColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0`;
          this.$el.onscroll = () => {
            this.handleScroll(rgb)
          };
        },
        handleScroll(rgb){
          let alpha = this.$el.scrollTop / 350;
          document.querySelector('.mu-appbar').style.backgroundColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
        },
        PlayMusic(index){
          this.$store.state.songList = this.lists.concat();
          this.$store.commit("SetIndex" , index);
        }
    }
  }
</script>

<style scoped>
.song-list{
  height: 100%;
  overflow: auto;
}
.mu-appbar{

}
.title{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.details{
  padding: 50px 0;
  position: relative;
}
.details_content{
  display: flex;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  z-index: 2;
  position: relative;
}
.details_content .img img{
  width: 100%;
}
.details_content .img .info{
  height: 20px;
  position: absolute;
  top: 0;
  width: 100%;
  background: rgba(0,0,0,0.5);
}
.details_content .img{
  width: 45%;
  position: relative;
}
.details_content .right{
  padding-left: 10px;
}
.details_content .all{
  box-sizing: border-box;
}
.lists{
  background: #fff;
  padding-bottom: 1.1rem;
}
.lists .index{
  font-size: 20px;
  font-weight: bold;
}
</style>
