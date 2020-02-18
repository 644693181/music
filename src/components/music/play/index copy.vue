<template>
  <div class="play" v-show="playList.length > 0" ref="player">
    <transition name="normal">
      <div class="normal_player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.image" />
        </div>
        <div class="top">
          <div class="back" @click="back">下箭头返回</div>
          <h1 v-html="currentSong.name">歌曲名称</h1>
          <h2 v-html="currentSong.singer">歌手</h2>
        </div>
        <div class="middle">
          <div class="middle_l">
            <div class="cd">
              <img :class="rotate" :src="currentSong.image" />
            </div>
            <div class="minilrcwrap">
              <div class="lrccontent">歌词内容...</div>
            </div>
          </div>
          <div class="middle_r">
            <div class="lrcwrap">
              <div>
                <p class="text">月下泪 - 二珂</p>
                <p class="text">词：高维纶/舒涵</p>
                <p class="text">词OP：好撑音乐有限公司</p>
                <p class="text">曲：高维纶/舒涵</p>
                <p class="text">曲OP：好撑音乐有限公司</p>
                <p class="text">制作人：陈起贤</p>
                <p class="text">编曲：高维纶</p>
                <p class="text">钢琴：舒涵</p>
                <p class="text">配唱制作人：陈起贤/任寒冰</p>
                <p class="text">和声/和声编配：Lisa Djaati</p>
                <p class="text">人声录音师：柯嘉森/任寒冰</p>
                <p class="text">人声录音室：55TEC Studio/行人studio</p>
                <p class="text">混音师： 柯嘉森</p>
                <p class="text">混音室：强力录音室</p>
                <p class="text">母带工程师：柯嘉森</p>
                <p class="text">母带制作室：强力录音室</p>
                <p class="text">母带权利归属：乐室（北京）文化传媒有限公司</p>
                <p class="text">明月下弦歌谱一曲</p>
                <p class="text">有如当年红颜似锦</p>
                <p class="text">泪残笑靥薄纱浅浅遮蔽</p>
                <p class="text">缠绵 如前世的记忆</p>
                <p class="text current">江山 如何比拟</p>
                <p class="text">寻千里 只为你</p>
                <p class="text">流水 只得一溪</p>
                <p class="text">我此生无遗</p>
                <p class="text">月下泪 难舍离别情意</p>
                <p class="text">夜闻寂 看淡尽日冥迷</p>
                <p class="text">燕归去 不知谁在哭泣</p>
                <p class="text">残断 翦灯深夜语</p>
                <p class="text">灯前明 回眸已是曾经</p>
                <p class="text">情同心 难剪离愁千缕</p>
                <p class="text">风唤云 思绪却暗尘不起</p>
                <p class="text">那回忆 秋梦笙歌里</p>
                <p class="text">明月下弦歌谱一曲</p>
                <p class="text">有如当年红颜似锦</p>
                <p class="text">泪残笑靥薄纱浅浅遮蔽</p>
                <p class="text">缠绵 如前世的记忆</p>
                <p class="text">江山 如何比拟</p>
                <p class="text">寻千里 只为你</p>
                <p class="text">流水 只得一溪</p>
                <p class="text">我此生无遗</p>
                <p class="text">月下泪 难舍离别情意</p>
                <p class="text">夜闻寂 看淡尽日冥迷</p>
                <p class="text">燕归去 不知谁在哭泣</p>
                <p class="text">残断 翦灯深夜语</p>
                <p class="text">灯前明 回眸已是曾经</p>
                <p class="text">情同心 难剪离愁千缕</p>
                <p class="text">风唤云 思绪却暗尘不起</p>
                <p class="text">那回忆 秋梦笙歌里</p>
                <p class="text">月下泪 难舍离别情意</p>
                <p class="text">夜闻寂 看淡尽日冥迷</p>
                <p class="text">燕归去 不知谁在哭泣</p>
                <p class="text">残断 翦灯深夜语</p>
                <p class="text">灯前明 回眸已是曾经</p>
                <p class="text">情同心 难剪离愁千缕</p>
                <p class="text">风唤云 思绪却暗尘不起</p>
                <p class="text">那回忆 秋梦笙歌里</p>
                <p class="text">那回忆 秋梦笙歌里</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot_wrap">
            <span class="dot active"></span>
            <span class="dot"></span>
          </div>
          <div class="progress_wrapper">
            <span class="time text_l">{{format(this.currentTime)}}</span>

            <progressBar :percent="percent" @percentChange="percentChange"></progressBar>
            <span class="time text_r">{{format(this.currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i_right" @click="changeMode" v-html="_mode">模式</div>
            <div @click="prev" class="icon i_right" :class="disable">上曲</div>
            <div @click="toggoPlaying" class="icon i_center" :class="disable" v-html="playIcon">播放</div>
            <div @click="next" class="icon i_left" :class="disable">下曲</div>
            <div class="icon i_left">喜欢</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 收起的player -->
    <transition name="mini">
      <div class="mini_player" v-show="!fullScreen" @click="open">
        <div class="cd_icon">
          <img :class="rotate" :src="currentSong.image" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.singer"></h2>
          <h3 class="desc" v-html="currentSong.album"></h3>
        </div>
        <div class="control" @click.stop="toggoPlaying" v-html="playIcon">播放</div>
        <div class="control">列表</div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import progressBar from "@/base/progress";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";
export default {
  name: "player",
  //import引入的组件需要注入到对象中才能使用
  components: { progressBar },
  data() {
    //这里存放数据
    return {
      audioReady: false,
      currentTime: 0
    };
  },
  //监听属性 类似于data概念
  computed: {
    playIcon() {
      return this.playing ? "暂停" : "播放";
    },
    rotate() {
      return this.playing ? "rotate" : "pause";
    },
    disable() {
      return this.audioReady ? "" : "disable";
    },
    _mode() {
      return this.mode === playMode.order
        ? "顺序"
        : this.mode === playMode.loop
        ? "单曲"
        : "随机";
    },
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "orderList"
    ])
  },
  //监控data中的数据变化
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return;
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  },
  //方法集合
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    ready() {
      this.audioReady = true;
      // console.log("ready");
    },
    error() {
      this.audioReady = true;
    },
    toggoPlaying() {
      if (!this.audioReady) {
        return;
      }
      this.setPlaying(!this.playing);
    },
    next() {
      if (!this.audioReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.toggoPlaying();
      }
      this.audioReady = false;
    },
    prev() {
      if (!this.audioReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.toggoPlaying();
      }
      this.audioReady = false;
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = [];
      // console.log(this.orderList);
      if (this.mode === playMode.random) {
        list = shuffle(this.orderList);
      } else {
        list = this.orderList;
      }
      this.resetIndex(list);
      this.setPlayList(list);
    },
    resetIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    updateTime(e) {
      // console.log(this.format(e.target.currentTime));
      this.currentTime = e.target.currentTime;
    },
    //格式化时间
    format(time) {
      time = time | 0;
      const min = (time / 60) | 0;
      const sec = this._pad(time % 60);
      return `${min}:${sec}`;
    },
    //时间单位数补 0
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    percentChange(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent;
      if (!this.playing) {
        this.toggoPlaying();
      }
    },
    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
      setPlaying: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENTINDEX",
      setMode: "SET_MODE",
      setPlayList: "SET_PLAYLIST"
    })
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.rotate {
  animation: rotate 15s linear infinite;
  animation-play-state: running;
}

.pause {
  animation: rotate 15s linear infinite;
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(359deg);
  }
}

.play {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;

  // height: 100%;
  .normal_player {
    position: fixed;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    top: 0;
    bottom: 0;
    color: #000;
    z-index: 3;
    background-color: #000;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      opacity: 0.6;
      z-index: -1;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        left: 5px;
        top: 0;
        width: 50px;
        height: 30px;
        text-align: center;
        padding: 10px 5px;
        color: white;
      }

      h1 {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        font-size: 16px;
        line-height: 40px;
        overflow: hidden;
        color: #ffffff;
      }

      h2 {
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        overflow: hidden;
        color: #ffffff;
      }
    }

    .middle {
      position: absolute;
      top: 80px;
      bottom: 170px;
      // background-color: #fff;
      width: 100%;
      // opacity: 0.7;
      white-space: nowrap;

      .middle_l {
        display: inline-block;
        width: 100%;
        height: 0;
        padding-top: 80%;

        // opacity: 0;
        .cd {
          width: 80%;
          position: absolute;
          left: 10%;
          top: 0;

          img {
            width: 100%;
            height: 100%;
            border: 10px solid rgba(255, 255, 255, 0.1);
            box-sizing: border-box;
            border-radius: 50%;
          }
        }

        .minilrcwrap {
          width: 80%;
          text-align: center;
          margin: 0 auto;
          margin-top: 30px;

          .lrccontent {
            color: rgba(255, 255, 255, 0.5);
            height: 20px;
            line-height: 20px;
            font-size: 14px;
          }
        }
      }

      .middle_r {
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        vertical-align: top;

        .lrcwrap {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot_wrap {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0px 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
        }

        .active {
          width: 20px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.8);
        }
      }

      .progress_wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        height: 30px;
        padding: 10px 0;

        // .progress_line {
        // position: relative;
        // height: 6px;
        // background: rgba(0, 0, 0, 0.3);
        // flex: 1;

        // .progress_cover {
        // position: absolute;
        // width: 60px;
        // background: yellow;
        // height: 6px;
        // }

        // .progress_button {
        // position: absolute;
        // width: 16px;
        // height: 16px;
        // left: 60px;
        // top: -5px;
        // transform: translateX(-50%);
        // background: yellow;
        // border: 3px white solid;
        // box-sizing: border-box;
        // border-radius: 50%;
        // }
        // }
        .time {
          font-size: 12px;
          flex: 0 0 40px;
          width: 40px;
          color: white;
          line-height: 30px;
        }
      }

      .operators {
        display: flex;
        align-content: center;
        height: 40px;
        line-height: 40px;

        .icon {
          flex: 1;
          color: yellow;
        }

        .disable {
          color: #eee;
        }

        .i_right {
          text-align: right;
        }

        .i_left {
          text-align: left;
        }

        .i_center {
          text-align: center;
        }
      }
    }
  }

  .mini_player {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #333;
    width: 100%;

    .cd_icon {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .text {
      flex: 1;
      color: white;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
      }

      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }

    .control {
      flex: 0 0 35px;
      width: 35px;
      padding: 0 10px;
    }
  }
}

.text_l {
  text-align: left;
}

.text_r {
  text-align: right;
}

&.normal-enter-active, &.normal-leave-active {
  transition: all 0.4s;

  .top, .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}

&.normal-enter, &.normal-leave-to {
  opacity: 0;

  .top {
    transform: translate3d(0, -100px, 0);
  }

  .bottom {
    transform: translate3d(0, 100px, 0);
  }
}
</style>