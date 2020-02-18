<template>
  <div class="songlist">
    <header></header>
  </div>
</template>

<script>
export default {
  name: "songList",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化

  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
// @import url(); 引入公共css类
.songlist {
  position: fixed;
  top: 0;
  bottom: 0;
  background: #000;

  header {
    background: #fff;
    text-align: center;
    height: 88px;

    span {
      position: absolute;
      left: 5%;
      top: 2%;
    }
  }
}
</style>