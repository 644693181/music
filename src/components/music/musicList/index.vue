<template>
  <div class="musiclist">
    <header :style="bgimg" ref="head">
      <!-- <a @click="back">返回</a> -->
      <a @click="back">
        <i class="iconfont icon-zuojiantou"></i>
      </a>
      <h1 v-html="title"></h1>
    </header>
    <div class="list" ref="list">
      <div class="bglayer" ref="bglayer"></div>
      <scroll
        @scroll="scroll"
        :probe-type="3"
        :listen-scroll="true"
        ref="scroll"
        :data="songs"
        class="listwrap"
      >
        <songlist :songs="songs" @select="selectItem"></songlist>
      </scroll>
    </div>
  </div>
</template>

<script>
import scroll from "@/base/scroll/scroll";
import songlist from "@/base/songlist";
import { mapActions } from "vuex";
export default {
  name: "musicList",
  //import引入的组件需要注入到对象中才能使用
  components: { scroll, songlist },
  data() {
    //这里存放数据
    return {
      scrollY: 0
    };
  },
  props: {
    songs: {
      type: Array,
      default: []
    },
    bgImg: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  //监听属性 类似于data概念
  computed: {
    bgimg() {
      return `background-image:url(${this.bgImg})`;
    }
  },
  //监控data中的数据变化
  watch: {
    scrollY(newY) {
      let transLateY = Math.max(this.minHeight + 40, newY);
      let zIndex = 0;
      const percent = Math.abs(newY / this.headHeight);
      let scale = 1;
      this.$refs.bglayer.style[
        "transform"
      ] = `translate3d(0,${transLateY}px,0)`;
      if (newY > 0) {
        scale = 1 + percent;
        zIndex = 1;
      }
      if (newY < transLateY) {
        zIndex = 1;
        this.$refs.head.style.paddingTop = 0;
        this.$refs.head.style.height = "40px";
      } else {
        zIndex = 0;
        this.$refs.head.style.paddingTop = "70%";
      }

      this.$refs.head.style.zIndex = zIndex;
      // this.$refs.head.style["transform"] = `scale(${scale})`;
    }
  },
  //方法集合
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    async selectItem(song, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    ...mapActions(["selectPlay"])
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.headHeight = this.$refs.head.clientHeight;
    this.minHeight = -this.headHeight;
    this.$refs.list.style.top = `${this.headHeight}px`;
  }
};
</script>
<style lang='stylus' scoped>
// @import url(); 引入公共css类
.musiclist {
  position: fixed;
  top: 0;
  bottom: 0;
  background: #000;
  width: 100%;
  max-width: 750px;
  z-index: 20;

  header {
    position: relative;
    text-align: center;
    width: 100%;
    padding-top: 70%;
    line-height: 40px;
    background-size: cover;

    h1 {
      color: #fff;
      position: absolute;
      left: 10%;
      top: 0;
      text-align: center;
      width: 80%;
    }

    a {
      position: absolute;
      left: 4%;
      top: 0;
      z-index: 30;
    }
  }

  .list {
    position: fixed;
    bottom: 0px;
    left: 0;
    // top: 40%;
    width: 100%;
    background: #000;

    .bglayer {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #000;
    }

    .listwrap {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      padding: 20px 30px;
      box-sizing: border-box;
    }

    li {
      line-height: 150px;
    }
  }
}

.icon-zuojiantou {
  font-size: 20px;
}
</style>