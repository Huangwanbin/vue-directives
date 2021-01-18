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
    <div class="permission">
      4.v-permission -- 待完善
      当前权限{{permission}}
      <p v-permission="permission" >权限为1的，可看</p>
      <p v-permission="permission">权限为4的，可看</p>
      <p v-permission="permission">权限为10的，不可看</p>
      <button @click="changePermission(1)">点击+权限</button>
      <button @click="changePermission(-1)">点击-权限</button>
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
        <img v-if="isImgShow" v-clickOut="clickImgOut" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg" alt="">
    </div>
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
      permission:'4',
      isImgShow: true,
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
    changePermission(val){
      let permission = this.permission*1 + val
      this.permission = permission+''
      console.log(this.permission);
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
  .draggable {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, .6);
  }
</style>
