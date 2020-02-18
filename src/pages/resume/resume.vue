<template>
  <div class="container" id="container">
    <div class="header">
      <div class="photo">
        <ul>
          <li>Yan Sun</li>
          <li>孙岩</li>
        </ul>
      </div>
      <div class="phone">
        <a href="tel:17600460987">
          <img src="../../assets/tel.png" alt />
        </a>
      </div>
    </div>

    <div class="swipe" id="swipe">
      <mt-swipe :auto="0" :show-indicators="false" @change="handleChange">
        <mt-swipe-item id="swipe-item" v-for="(item) in infoList" :key="item.id">
          <div :class="item.className">
            <img :src="item.titleIconUrl" alt />
            {{item.title}}
            <div class="line"></div>
          </div>

          <div ref="scroll"  class="oitem">
            <div class="iteminfo">
              <ul>
                <li v-for="(info, index) in item.data" :key="index" :class="info.className">
                  <img v-if="info.imgUrl" :src="info.imgUrl" alt />
                  {{info.info}}
                </li>
              </ul>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <tabbar />
  </div>
</template>

<script>
// import scroll from "@/base/slider/scroll";
import tabbar from "components/resume/tabbar";
import BScroll from "better-scroll";
export default {
  name: "resume",
  data() {
    //这里存放数据
    return {
      infoList: [],
      allLoaded: false
    };
  },
  components: { tabbar },
  methods: {
    getInfo() {
      this.$axios.get("http://47.104.88.122/api/resume/info").then(res => {
        this.infoList = res.data;
        setTimeout(() => {
          this.initScroll();
        }, 350);
      });
    },
    initScroll() {
      this.scroll1 = new BScroll(this.$refs.scroll[0]);
      this.scroll2 = new BScroll(this.$refs.scroll[1]);
      this.scroll3 = new BScroll(this.$refs.scroll[2]);
    },
    handleChange() {
      this.scroll1.refresh();
      this.scroll2.refresh();
      this.scroll3.refresh();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getInfo();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
#swipe-item {
  padding: 0 15px;
  box-sizing: border-box;
}

.container {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  height: 100%;
  width: 100%;
  background: #000;
}

.header {
  position: relative;
  display: flex;
  width: 100%;
  height: 30%;
  background: url('../../assets/psb.png') no-repeat center;
  background-size: cover;
  background-color: #000;

  .photo {
    position: absolute;
    top: 9%;
    left: 10%;
    width: 45%;
    height: 85%;
    flex: 2;
    background: url('../../assets/photo.jpg') no-repeat 0 -25px;
    background-size: cover;
    justify-content: center;
    justify-items: center;

    ul {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #333;
      line-height: 1;
      color: white;
      opacity: 0.7;
      padding: 2px 10px;
      box-sizing: border-box;
    }

    ul>li:nth-child(1) {
      font-size: 16px;
    }

    ul>li:nth-child(2) {
      padding-left: 5px;
      margin-top: 5px;
    }
  }

  .phone {
    flex: 1;
    position: absolute;
    bottom: 15%;
    right: 18%;

    img {
      width: 40px;
      height: 40px;
    }
  }
}

.swipe {
  height: 62%;
  box-sizing: border-box;
  background: #000;
}

.titleBack {
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  // margin-top: 15px;
  border-top: 1px dashed #fff;
  border-bottom: 1px dashed #fff;
  color: #000;
  background-color: #fff;
  font-weight: bold;

  img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 5px;
  }

  .line {
    margin: 0 15px;
    height: 1px;
    width: 65%;
    border-top: 3px solid #263241;
    flex: 1;
  }
}

.itemhead {
  // background-color: #aaa;
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  // margin-top: 15px;
  border-top: 1px dashed #fff;
  border-bottom: 1px dashed #fff;
  color: #fff;
  font-weight: bold;

  img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 5px;
  }

  .line {
    margin: 0 15px;
    height: 1px;
    width: 65%;
    border-top: 3px solid #263241;
    flex: 1;
  }
}

.oitem {
  flex-direction: column;
  // margin-top: 10px;
  // height: 200px;
  height: 90%;
  // background-color: #ccc;
  // box-sizing: border-box;
  overflow: hidden;

  .iteminfo {
    // background-color: #888;
    color: white;

    ul {
      line-height: 50px;
      // height 30px
    }

    .stronginfo {
      line-height: 40px;
      font-size: 18px;
      color: aqua;
      padding-left: 20px;
      text-indent: 0;

      img {
        width: 100%;
        margin-left: -10px;
        margin-top: 10px;
        border-radius: 7px;
      }
    }

    li {
      vertical-align: middle;
      text-indent: 2em;
      line-height: 30px;
    }
  }
}
</style>