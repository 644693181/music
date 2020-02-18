<template >
  <div class="rank">
    <scroll class="toplist" :data="topList">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="(item,index) in topList" :key="index">
          <img src alt v-lazy="item.frontPicUrl" />
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.song" :key="index">
              <span>1</span>
              <span>{{song.title}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import scroll from "base/scroll/scroll";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "rank",
  data() {
    return {
      msg: "排行"
    };
  },
  components: {
    scroll
  },
  methods: {
    getTopList() {
      let url = "/music/silder";
      this.$axios
        .get(url)
        .then(res => {
          // this.slider = res.data.focus.data.content;
          let topList1 = res.data.toplist.data;
          // console.log(res.data.topList.data);
          this.setTopList(normalLize(topList1.group));
          console.log(JSON.parse(JSON.stringify(this.topList)));
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
    selectItem(item) {
      this.$router.push(`/rank/${item.topId}`);
    },
    ...mapMutations({
      setTopList: "SET_TOPLIST"
    })
  },
  computed: {
    ...mapGetters(["topList"])
  },
  mounted() {
    console.log(JSON.parse(JSON.stringify(this.topList)));
    if (!this.topList.length) {
      this.getTopList();
    }
  }
};
</script>

<style scope lang='stylus'>
.rank {
  position: fixed;
  top: 12%;
  bottom: 0;
  width: 100%;
  max-width: 750px;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;

      img {
        width: 100px;
        height: 100px;
        flex: 0 0 100px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #333;
        color: rgba(255, 255, 255, 0.3);
        padding: 0 20px;
        height: 100px;
        font-size: 12px;

        .song {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 26px;
          text-overflow: ellipsis;

          span {
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>