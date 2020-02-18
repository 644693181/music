<template>
  <transition name="disc_transition">
    <musiclist :songs="songs" :title="disc.dissname" :bgImg="disc.imgurl"></musiclist>
  </transition>
</template>

<script>
import musiclist from "components/music/musicList";
import { mapGetters } from "vuex";
import { createSong, wantSongList } from "common/js/song";
export default {
  name: "",
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
    ...mapGetters(["disc"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getDiscSongs() {
      if (!this.disc.dissid) {
        this.$router.push("/recommend");
        return;
      }

      this.$axios
        .post("/music/discsongs", {
          discId: this.disc.dissid
        })
        .then(res => {
          wantSongList(res.data.cdlist[0].songlist).then(res => {
            this.songs = res;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getDiscSongs();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.disc_transition-enter-active, .disc_transition-leave-active {
  transition: all 0.3s;
}

.disc_transition-entet, .disc_transition-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>