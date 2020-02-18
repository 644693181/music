<template >
  <div class="recommend">
    <slider class="slider">
      <mt-swipe-item v-for="(item,index) in slider" :key="index">
        <img class="slider_img" :src="item.pic_info.url" alt />
      </mt-swipe-item>
    </slider>

    <div class="hot_title">
      <span>热门歌单推荐</span>
    </div>
    <scroll class="scroll" :data="dissList">
      <ul class="table-view">
        <li @click="selectItem(disc)" v-for="(disc, index) in dissList" :key="index">
          <a href="javascript:;" class="item_link">
            <div>
              <img class="item_img" width="60px" height="60px" v-lazy="disc.imgurl" />
            </div>
            <div class="item_right">
              <p class="item_title">{{disc.dissname}}</p>
              <p class="item_content">{{disc.creator.name}}</p>
            </div>
          </a>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from "base/slider/slider";
// import { Toast } from "mint-ui";
import scroll from "@/base/scroll/scroll";
import { mapMutations } from "vuex";
export default {
  name: "recommend",
  data() {
    return {
      msg: "推荐",
      slider: [],
      dissList: [],
      topList: []
    };
  },
  components: {
    Slider,
    scroll
  },
  methods: {
    getSilder() {
      let url = "/music/silder";
      this.$axios
        .get(url)
        .then(res => {
          this.slider = res.data.focus.data.content;
          this.topList = res.data.toplist.data;
          // console.log(res.data.toplist.data);
          this.setTopList(normalLize(this.topList.group));
        })
        .catch(err => console.log(err));
      function normalLize(list) {
        let tem = [];
        let topList = [];
        list.forEach(item => {
          tem.push(item.toplist);
        });
        // return tem;
        tem.forEach(item => {
          topList.push(...item);
        });
        return topList;
      }
    },

    getDiscList() {
      let url = "/music/disclist";
      this.$axios
        .get(url)
        .then(res => {
          this.dissList = res.data.list;
          // console.log(this.dissList);
        })
        .catch(err => console.log(err));
    },
    selectItem(disc) {
      this.setDisc(disc);
      // console.log(disc);
      this.$router.push({
        path: `recommend/${disc.dissid}`
      });
    },
    ...mapMutations({
      setDisc: "SET_DISC",
      setTopList: "SET_TOPLIST"
    })
  },
  mounted() {
    this.getSilder();
    this.getDiscList();

    // this.Toast("加载完成");
    // this.getSilder$axios.get('https://easy-mock.com/mock/5d5f6f3d6c17933970a0f3aa/music/singerlist').then(res=>console.log(res.data))
  }
};
</script>

<style scope lang='stylus'>
image[lazy='loading'] {
  width: 40px;
  height: 40px;
  margin: auto;
}

.recommend {
  position: fixed;
  top: 12%;
  bottom: 0;
  width: 100%;
  max-width: 750px;

  .slider {
    height: 25%;

    .slider_img {
      width: 100%;
      height: 100%;
    }
  }

  .hot_title {
    width: 100%;
    height: 10%;
    text-align: center;
    line-height: 65px;
    color: #ffcd32;
    font-size: 14px;
  }

  .scroll {
    height: 65%;
    overflow: hidden;
  }

  .table-view {
    width: 100%;
  }

  .item_link {
    display: flex;
    padding: 0 20px 20px 20px;
    /* width: 100%; */
  }

  .item_right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
  }

  .item_title {
    color: aliceblue;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .item_content {
    font-size: 14px;
  }
}
</style>