<template >
  <div class="singer">
    <listview :data="singerList" @select="selectSinger"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
const HOTE_NAME = "热门";
const HOTE_SIZE = 10;
import singer from "@/common/js/singer";
import listview from "@/base/listview/listview";
import { mapMutations } from "vuex";
export default {
  name: "singer",
  data() {
    return {
      msg: "歌手列表",
      singerList: []
    };
  },
  components: { listview },

  mounted() {
    this.getSingerList();
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
      // console.log(mapMutations)
    },
    getSingerList() {
      this.$axios.get("/music/singer").then(res => {
        this.singerList = this.wantList(res.data);
      });
    },
    wantList(list) {
      let map = {
        hot: {
          title: HOTE_NAME,
          items: []
        }
      };

      list.forEach((item, index) => {
        if (index < HOTE_SIZE) {
          map.hot.items.push(
            new singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        const key = item.Findex;

        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      //处理对象成有序数组
      let hot = [];
      let letter = [];
      for (let key in map) {
        let temp = map[key];
        if (temp.title.match(/[a-zA-Z]/)) {
          letter.push(temp);
        } else if (temp.title === HOTE_NAME) {
          hot.push(temp);
        }
      }
      letter.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(letter);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  }
};
</script>

<style scope lang='stylus'>
.singer {
  position: fixed;
  top: 12%;
  bottom: 0;
  width: 100%;
  max-width: 750px;
}
</style>