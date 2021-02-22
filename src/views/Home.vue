<template>
  <div class="home">
    <div class="copy">
      <p>1.v-copy:</p>
      <input type="text" v-model="copyText" />
      <button v-copy="copyText">点我复制输入框里的内容</button>
    </div>
    <div class="long-press">
      2.v-longprees
      <button v-longpress="longpress">长按</button>
    </div>
    <div class="debounce">
      3.v-debounce
      <button v-debounce="debounce">debounce防抖</button>
    </div>
    <div class="scrollPop">
      4.v-scrollPop
      <button @click="isScrollPopShow = true">点击打开弹窗</button>
      <div class="scroll-pop" v-if="isScrollPopShow" v-scrollPop>
        <button class="close" @click="isScrollPopShow = false">X</button>
        <div class="content">
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
          <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
        </div>
      </div>
    </div>
    <div class="waterMarker" v-waterMarker="{text:'QSC版权所有',textColor:'rgba(180, 180, 180, 0.4)'}">
      5.v-waterMarker
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
    </div>
    <div class="draggable" v-draggable>
      6.v-draggable
    </div>
    <div class="clickOut">
        7.v-clickOut
        <button @click="isImgShow = true">展示弹窗</button>
    </div>
    <div v-clickOut="clickImgOut" v-if="isImgShow" class="pop" v-scrollPop>
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg" alt="">
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
    </div>
    <!-- <div class="countdown">
      8.v-countdown
      <span v-countdown="12000000" formatter='HH小时mm分ss秒'></span>
    </div> -->
    <div class="obscuration" v-if="isScrollPopShow"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return {
      copyText: '',
      note: '',
      isImgShow: false,
      isScrollPopShow:false
    }
  },
  methods:{
    clickImgOut(){
      console.log('点击图片外部')
      this.isImgShow = false
    },
    longpress(){
      console.log('press');
    },
    debounce(){
      console.log('debounce 防抖')
    },
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
  .home{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .copy {
    margin-bottom: 50px;
  }
  .long-press {
    margin-bottom: 50px;
  }
  .debounce {
    margin-bottom: 50px;
  }
  .waterMarker {
    margin-bottom: 50px;
  }
  .scrollPop {
    margin-bottom: 50px;
    .scroll-pop {
      width: 400px;
      height: 600px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 1;
      // overflow: auto;
      .close {
        position: absolute;
        top: -50px;
        right: -50px;
        font-size: 30px;
        z-index:1;
      }
      .content {
        width: 100%;
        height: 100%;
        overflow: scroll;
        background-color: #fff;
      }
    }
  }
  .clickOut {
    margin-bottom: 50px;
  }
  .draggable {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, .6);
  }
  .pop {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.7);
    overflow: scroll;
  }
  //8.倒计时
  // .countdown {
  //   span{
  //     display: block;
  //     width: 200px;
  //     height: 50px;
  //     color: #000;
  //     font-size: 20px;
  //   }
  // }
  .obscuration {
      position: fixed;
      top:0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
      height: 100%;
      width: 100%;
  }
</style>
