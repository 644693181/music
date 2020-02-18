<template>
  <transition name="slide">
    <music-list :songs="songList" :bg-img="bgImg" :title="title"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { createSong, wantSongList } from "@/common/js/song";

import musicList from "components/music/musicList";
export default {
  name: "singer_detail",
  //import引入的组件需要注入到对象中才能使用
  components: { musicList },
  data() {
    //这里存放数据
    return {
      songList: []
    };
  },
  computed: {
    ...mapGetters(["singer"]),
    title() {
      return this.singer.name;
    },
    bgImg() {
      return this.singer.avatar;
    }
  },

  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async wangSong(songList) {
      const that = this;
      let songs = [];
      let mid = [];
      let purl = [];
      songList.forEach(song => {
        // console.log(song.songInfo.mid);
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
    },

    getSong(singer) {
      if (!singer.id) {
        this.$router.push("/singer");
      }
      this.$axios
        .post("/music/song", {
          id: singer.id,
          num: 30
        })
        .then(res => {
          let ret = [];
          if (res.data && res.data.songList) {
            res.data.songList.forEach(songInfo => {
              ret.push(songInfo.songInfo);
            });
          }

          wantSongList(ret).then(res => {
            // console.log(res)

            this.songList = res;
          });
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getSong(this.singer);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>