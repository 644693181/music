<template>
  <scroll
    :data="data"
    class="listview"
    ref="listview"
    :listenScroll="true"
    :probeType="3"
    @scroll="scroll"
  >
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="group">
        <h2>{{group.title}}</h2>
        <ul>
          <li
            v-for="(item, index) in group.items"
            :key="index"
            @click="selectItem(item)"
            class="list-group-item"
          >
            <img v-lazy="item.avatar" alt />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="side">
      <li
        v-for="(item,index) in shortTitle"
        :key="index"
        ref="shortCourt"
        @touchstart="onShortcutClick(index,$event)"
        @touchmove.stop.prevent="onShortcutMove"
        :class="{'active': currentIndex === index}"
      >{{item}}</li>
    </ul>
  </scroll>
</template>

<script>
import scroll from "@/base/scroll/scroll";
export default {
  name: "listview",
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    };
  },
  methods: {
    selectItem(item) {
      this.$emit("select", item);
    },
    onShortcutClick(index, e) {
      // console.log(index, e);
      this.scrollY = -this.listHeight[index];
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.height = e.target.offsetHeight;
      this.touch.startIndex = index;
      this.$refs.listview.scrollToElement(this.$refs.group[index], 0);
    },
    onShortcutMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / this.touch.height) | 0;
      let anchorIndex = this.touch.startIndex + delta;
      this.$refs.listview.scrollToElement(this.$refs.group[anchorIndex], 0);
      this.scrollY = -this.listHeight[anchorIndex];
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    computHeight() {
      this.listHeight = [];
      const list = this.$refs.group;
      // console.log(list)
      let height = 0;
      this.listHeight.push(height);

      list.forEach(item => {
        height += item.offsetHeight;
        this.listHeight.push(height);
      });
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.computHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      //滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      //在中间滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let lowHeight = listHeight[i];
        let topHeight = listHeight[i + 1];
        if (-newY >= lowHeight && -newY < topHeight) {
          this.currentIndex = i;

          return;
        }
      }
      //底部

      this.currentIndex = listHeight.length - 2;
    }
  },
  computed: {
    shortTitle() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: { scroll },
  created() {
    this.touch = {};
    this.listHeight = [];
  }
};
</script>
<style lang='stylus' scoped>
.listview {
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 750px;
  overflow: hidden;
  background: #222;

  .list-group {
    padding-bottom: 30px;

    h2 {
      background: #666;
      color: #ddd;
      line-height: 30px;
      font-size: 14px;
      padding-left: 25px;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: middle;
      }

      span {
        color: rgba(255, 255, 255, 0.5);
        margin-left: 15px;
      }
    }
  }
}

.side {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  right: 0;
  top: 53%;
  transform: translateY(-50%);
  z-index: 1;
  background: #000;
  height: 60%;
  width: 20px;
  font-size: 12px;
  border-radius: 10px;
  padding: 20px 0;
  color: rgba(255, 255, 255, 0.5);

  li {
    text-align: center;
    flex: 1;
    // height 18px
    // box-sizing border-box
  }

  .active {
    color: #ffcd32;
  }
}
</style>