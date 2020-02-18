<template>
  <transition name="slide">
    <musiclist :title="topListItem.title" :bgImg="bgImg" :songs="songs"></musiclist>
  </transition>
</template>

<script>
import musiclist from "components/music/musicList";
import { mapGetters } from "vuex";
import { createSong } from "common/js/song";
export default {
  name: "topList",
  //import引入的组件需要注入到对象中才能使用
  components: { musiclist },
  data() {
    //这里存放数据
    return {
      songs: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    bgImg() {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return "";
    },
    topListItem() {
      return this.topList.find(item => {
        return item.topId == this.$route.params.id;
      });
    },
    ...mapGetters(["topList"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getTopListSongs() {
      const that = this;
      this.$axios
        .post("/music/rankdetail", { rankId: parseInt(this.$route.params.id) })
        .then(res => {
          // console.log(this.$route.params.id);
          wangSong(res.data.songInfoList).then(res => {
            this.songs = res;
            // console.log(res);
          });
        });

      async function wangSong(list) {
        let songs = [];
        let mid = [];
        let purl = [];
        list.forEach(song => {
          // console.log(song);
          mid.push(song.mid);
          songs.push(createSong(song));
        });
        purl = await getpurl(mid);
        for (let i = 0; i < songs.length; i++) {
          if (!purl[i].purl) {
            songs[i].canPlay = false;
          }
          songs[i].url = `http://dl.stream.qqmusic.qq.com/${purl[i].purl}`;
        }
        // console.log(songs)
        return songs;

        async function getpurl(mid) {
          let purl = [];
          await that.$axios.post("/music/getsong", { mid }).then(res => {
            purl = res.data.req_0.data.midurlinfo;
            // console.log(purl)
          });
          return purl;
        }
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTopListSongs();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>