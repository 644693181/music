<template>
  <div class="searchBox">
    <i class="iconfont icon-sousuo"></i>
    <input v-model="query" :placeholder="placeholder" type="text" />
    <i @click="clear" v-show="query" class="iconfont icon-shanchu"></i>
  </div>
</template>

<script>
import Util from "common/js/util";
export default {
  name: "searchbox",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      query: ""
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲,歌手"
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    clear() {
      this.query = "";
    },
    setQuery(query) {
      this.query = query;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$watch(
      "query",
      Util.cutoff(newQuery => {
        this.$emit("query", newQuery);
      }, 300)
    );
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.searchBox {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 6px;
  height: 40px;
  background: #333;
  border-radius: 6px;

  input {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: #333;
    color: #fff;
    font-size: 14px;
    outline: 0;
  }
}

.icon-sousuo {
  font-size: 22px;
  color: #222;
}
</style>