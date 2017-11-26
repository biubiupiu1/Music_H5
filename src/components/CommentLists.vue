<template>
  <div>
    <div class="comment" v-for="item in comments">
      <mu-list-item :title="item.user.nickname" :describeText="loadDate(item.time)" disabled>
        <mu-avatar :src="item.user.avatarUrl" slot="leftAvatar"/>
        <span slot="right">{{item.likedCount}}</span>
        <i class="iconfont icon-dianzan1"  slot="right"></i>
      </mu-list-item>
      <div class="comment_content">
        <template v-if="item.beReplied.length !== 0">
          回复<span>@{{item.beReplied[0].user.nickname}}</span>:
        </template>
        {{item.content}}
        <template v-if="item.beReplied.length !== 0">
          <div class="beReplied">
            <span>@{{item.beReplied[0].user.nickname}}</span>:
            {{item.beReplied[0].content}}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
    }
  },
  props:['comments'],
  created(){
    this.time = new Date();
  },
  methods:{
    loadDate(val) {
      let old_date = new Date(parseInt(val));
      let now_date = this.time;
      let y = old_date.getFullYear();
      let m = old_date.getMonth();
      let d = old_date.getDate();
      if(y === now_date.getFullYear()){
        if(m === now_date.getMonth()){
          switch (now_date.getDate() - d){
            case 0:
              return old_date.toTimeString().match(/\d*:\d*/i)[0];break;
            case 1:
              return `昨天 ${old_date.toTimeString().match(/\d*:\d*/i)[0]}`;break;
            case 2:
              return `前天 ${old_date.toTimeString().match(/\d*:\d*/i)[0]}`;break;
            default:
              return `${m}月${d}日`;
          }
        }else
          return `${m}月${d}日`;
      }else
        return `${y}年${m}月${d}日`;
    }
  }
}
</script>

<style scoped="">
  .comment{
    width: 96%;
    margin: 0 auto;

  }
  .comment .comment_content{
    width: 98%;
    margin: 0 auto;
    color: #000000;
    line-height: .5rem;
    word-wrap:break-word;
    padding: .1rem 0 .3rem  0.8rem;
    font-size: .26rem;
    border-bottom: 1px solid #f0f0f0;
  }
  .comment_content{
    color: #fff;
  }
  .comment_content span{
    color: #1976d2;
  }
  .beReplied{
    border: 1px solid #dfdfdf;
    padding: .15rem;
  }
</style>
