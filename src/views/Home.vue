<template>
  <div class="home">

    <div class="copy">
      <h3>1.v-copy:</h3>
      <input type="text" v-model="copyText" />
      <button v-copy="copyText">点我复制输入框里的内容</button>
      <p class="code">这是你的验证码：<span>{{verificationCode}}</span></p>
      <button @click="getCode">点击生成验证码</button>
      <button v-copy="verificationCode">点击复制验证码</button>
    </div>

    <div class="long-press">
      <h3>2.v-longprees</h3>
      <button v-longpress="longpress">长按</button>
    </div>

    <div class="debounce">
      <h3>3.v-debounce</h3>
      <input type="text" v-debounce="debounce">
      <button v-debounce="debounce">debounce防抖</button>
    </div>

    <div class="clickOut">
      <h3>4.v-clickOut</h3>
      <button @click="isImgShow = true">展示弹窗</button>
    </div>
    <div v-clickOut="clickImgOut" v-if="isImgShow" class="pop">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg" alt="">
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
    </div>

    <div class="scrollPop">
      <h3>5.v-scrollPop</h3>
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
      <h3>6.v-waterMarker</h3>
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
      <h3>7.v-draggable</h3>
    </div>

    <div class="sensor">
      8.v-sensor
      <button @click="clickme" v-sensor="{el:'sensor_element',elClick:'sensor_element'}">点击上报神策</button>
      <p v-if="isSensorShow" >上报</p>
    </div>
    <!-- 蒙层 -->
    <div class="obscuration" v-if="isScrollPopShow" v-dir></div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      copyText: '',
      verificationCode:'',
      isImgShow: false,
      isScrollPopShow: false,
      isSensorShow:false,
    }
  },
  methods:{
    getCode(){
      let code = ''
      for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random()*10)
        code += random
      }
      this.verificationCode = code
    },
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
    clickme(){
      window.location.href = 'https://www.baidu.com'
      this.isSensorShow = true
    }
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
    .code {
      span {
        color: red;
      }
    }
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
      width: 60%;
      height: 70%;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 1;
      .close {
        border: none;
        border-radius: 50%;
        position: absolute;
        top: -40px;
        right: -40px;
        font-size: 30px;
        z-index:1;
      }
      .content {
        width: 100%;
        height: 100%;
        margin: 0 auto;
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
    color: #fff;
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
