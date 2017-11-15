/**
 * Created by biubiupiu on 2017/8/3.
 */
function scroll_To(tar_y , dom){ //tar_y 即滑动条顶端 距离页面最上面的距离
  //console.log('oooooooo')
  let timer = setTimeout(function(){
    let tdom = typeof (dom) === 'object' ? dom : document.querySelector(dom);
    let current_y = tdom.scrollTop;
    //console.log(current_y)
    let step = 40; //步长系数 即剩余的距离除以40 每1ms 移动一段距离
    if (tar_y>current_y){ //tar_y > current_y 即向下滚动
      let dist = Math.ceil((tar_y-current_y)/step);
      let next_y = current_y+dist;
      if(next_y<tar_y){  //向上滚动和向下滚动判定的区别 是这里！！
        tdom.scrollTop = next_y;
        scroll_To(tar_y , dom);
      }
      else{
        tdom.scrollTop = tar_y;
        clearTimeout(timer)
      }
    }
    else{ //tar_y < current_y 即向上滚动
      let dist = Math.floor((tar_y-current_y)/step);
      let next_y = current_y+dist;
      if(next_y>tar_y){
        tdom.scrollTop = next_y;
        scroll_To(tar_y , dom);
      }
      else{
        tdom.scrollTop = tar_y;
        clearInterval(timer)
      }
    }
  },1)
}

export default scroll_To;
