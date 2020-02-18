<template>
  <div class="wrap">
    <div class="progress_line" ref="progressBar" @click="clickProgress">
      <div class="progress_cover" ref="progressCover"></div>
      <div
        class="progress_button"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd"
        ref="progressBtn"
      ></div>
    </div>
  </div>
</template>

<script>
// const progressBtnWidth = this.$refs.progressBtn.clientWidth;
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  //方法集合
  methods: {
    touchStart(e) {
      this.touch.init = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progressCover.clientWidth;
      // this.setOffset(e.touches[0].pageX);
      // this.triggerPercent();
    },
    touchMove(e) {
      if (!this.touch.init) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth,
        Math.max(0, deltaX + this.touch.left)
      );
      this.setOffset(offsetWidth);
    },
    touchEnd(e) {
      this.touch.init = false;
      this.triggerPercent();
    },
    clickProgress(e) {
      this.setOffset(e.offsetX);
      this.triggerPercent();
    },
    setOffset(offsetWidth) {
      this.$refs.progressCover.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[
        "transform"
      ] = `translate3d(${offsetWidth}px,0,0)`;
    },
    triggerPercent() {
      const percent =
        this.$refs.progressCover.clientWidth /
        this.$refs.progressBar.clientWidth;
      this.$emit("percentChange", percent);
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent > 0 && !this.touch.init) {
        const barWidth = this.$refs.progressBar.clientWidth;
        const offsetWidth = newPercent * barWidth;
        this.setOffset(offsetWidth);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.touch = {};
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.wrap {
  flex: 1;
}

.progress_line {
  position: relative;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);
  flex: 1;

  .progress_cover {
    position: absolute;
    width: 0;
    background: yellow;
    height: 4px;
  }

  .progress_button {
    position: absolute;
    width: 16px;
    height: 16px;
    left: -5px;
    top: -6px;
    transform: translateX(-50%);
    background: yellow;
    border: 3px white solid;
    box-sizing: border-box;
    border-radius: 50%;
  }
}
</style>