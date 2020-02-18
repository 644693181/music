<template>
  <ul class="songlist">
    <li class="item" v-for="(song,index) in songs" :key="index" @click="selectItem(song,index)">
      <div class="content">
        <h2>{{song.name}}</h2>
        <p>{{songInfo(song)}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    songInfo(song) {
      // return `${song.singer[0].name}~${song.album}`;
      return `${song.singer}~${song.album}`;
    },
    selectItem(item, index) {
      this.$emit("select", item, index);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
// @import url(); 引入公共css类
.songlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  .item {
    width: 100%;
    align-items: flex-start;
    // flex: 1;
    height: 64px;
    box-sizing: border-box;

    .content {
      flex-direction: column;
      color: white;
      line-height: 20px;
      font-size: 14px;

      p {
        color: rgba(255, 255, 255, 0.3);
        padding-top: 5px;
      }
    }
  }
}
</style>