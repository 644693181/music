<template>
  <scroll class="suggestWrap" :data="result" pullup="pullup" @scrollToEnd="searchMore">
    <ul>
      <li class="suggestItem" v-for="(item,index) in result" :key="index">
        <div>
          <span class="icon" v-html="getIcon(item)">图标</span>
          <span class="text">{{item.singerName?item.singerName:item.title}}</span>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
import scroll from "base/scroll/scroll";
const SINGER_TYPE = "singer";
export default {
  name: "suggest",
  //import引入的组件需要注入到对象中才能使用
  components: { scroll },
  data() {
    //这里存放数据
    return {
      page: 1,
      result: [],
      hasMore: true,
      pullup: true
    };
  },
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    query(newQuery) {
      if (newQuery == "") {
        return;
      }
      this.search({ word: newQuery });
    }
  },
  //方法集合
  methods: {
    search(obj) {
      this.$axios.post("/music/search", { word: obj.word }).then(res => {
        console.log(res.data);
        this.result = this.genResult(res.data.data);
      });
    },
    genResult(data) {
      let result = [];
      if (data.zhida && data.zhida.zhida_singer) {
        result.push({ ...data.zhida.zhida_singer, ...{ type: SINGER_TYPE } });
      }

      if (data.song && data.song.list.length) {
        result = result.concat(data.song.list);
      }
      console.log(result);
      return result;
    },
    searchMore() {},
    getIcon(item) {
      if (item.type === SINGER_TYPE) {
        return "歌手";
      }
      return "歌曲";
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='stylus' scoped>
.suggestWrap {
  height: 100%;
  overflow: hidden;

  // background: #000;
  .suggestItem {
    padding: 0 20px;
    color: rgba(255, 255, 255, 0.5);
    padding-bottom: 20px;
    display: flex;

    .icon {
      flex: 0 0 35px;
      width: 35px;
      margin: 0 10px;
    }

    .text {
      flex: 1;
    }
  }
}
</style>