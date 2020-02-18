<template >
  <div class="search">
    <div class="searchBoxWarp">
      <searchbox @query="queryChange" ref="searchBox"></searchbox>
    </div>
    <div class="hotWord" v-show="!query">
      <div class="hotKey">
        <h1>热门搜索</h1>
        <ul>
          <li class="item" @click="addQuery(item.k)" v-for="item in hotkey" :key="item.n">{{item.k}}</li>
        </ul>
      </div>
    </div>
    <div class="suggest" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
import searchbox from "base/searchbox";
import suggest from "components/music/suggest";
export default {
  data() {
    return {
      msg: "搜索",
      query: "",
      hotkey: []
    };
  },
  components: {
    searchbox,
    suggest
  },
  methods: {
    queryChange(query) {
      this.query = query;
    },

    getHotKey() {
      this.$axios.get("/music/hotkey").then(res => {
        this.hotkey = res.data.slice(0, 15);
        // console.log(this.hotkey);
      });
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    }
  },

  mounted() {},
  created() {
    this.getHotKey();
  }
};
</script>

<style scope lang='stylus'>
.searchBoxWarp {
  margin: 20px;
}

.search {
  position: fixed;
  top: 12%;
  bottom: 0;
  width: 100%;
  max-width: 750px;

  .hotWord {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .hotKey {
      height: 100%;
      overflow: hidden;
      margin: 20px;
      margin-top: 0;

      h1 {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 20px;
      }

      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
        background: #333;
      }
    }
  }

  .suggest {
    position: fixed;
    top: 178px;
    width: 100%;
    max-width: 750px;
    bottom: 0;
  }
}
</style>