<template>
  <div class="play" v-show="playList.length > 0" ref="player">
    <transition name="normal">
      <div class="normal_player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.image" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="iconfont icon-xiajiantou"></i>
          </div>
          <h1 v-html="currentSong.name">歌曲名称</h1>
          <h2 v-html="currentSong.singer">歌手</h2>
        </div>
        <div class="middle">
          <mt-swipe :auto="0" :show-indicators="false" @change="handleChange">
            <mt-swipe-item id="middle_l">
              <div class="middle_l">
                <div class="cd">
                  <img :class="rotate" :src="currentSong.image" />
                </div>
                <div class="minilrcwrap">
                  <div class="lrccontent">{{cuttentLrcTxt}}</div>
                </div>
              </div>
            </mt-swipe-item>

            <mt-swipe-item id="middle_r">
              <div class="middle_r">
                <scroll ref="scroll" class="lrcwrap" :data="currentLrc && currentLrc.lines">
                  <div clss="scroll_lrcwrap">
                    <div v-if="this.currentLrc">
                      <p
                        class="text"
                        ref="lrcLine"
                        :class="{'current': currentLineNumber === index}"
                        v-for="(item,index) in currentLrc.lines"
                        :key="index"
                      >{{item.txt}}</p>
                    </div>
                  </div>
                </scroll>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="bottom">
          <div class="dot_wrap">
            <span class="dot" :class="{'active' : this.activeFlag}"></span>
            <span class="dot" :class="{'active' : !this.activeFlag}"></span>
          </div>
          <div class="progress_wrapper">
            <span class="time text_l">{{format(this.currentTime)}}</span>

            <progressBar :percent="percent" @percentChange="percentChange"></progressBar>
            <span class="time text_r">{{format(this.currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i_right" @click="changeMode">
              <i class="iconfont" :class="_mode"></i>
            </div>
            <div @click="prev" class="icon i_right" :class="disable">
              <i class="iconfont icon-shangyishou"></i>
            </div>
            <div @click="toggoPlaying" class="icon i_center" :class="disable">
              <i :class="playIcon"></i>
            </div>
            <div @click="next" class="icon i_left" :class="disable">
              <i class="iconfont icon-xiayishou"></i>
            </div>
            <div class="icon i_left">
              <i :class="love"></i>
            </div>
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
          <h2 class="name" v-html="currentSong.album"></h2>
          <h3 class="desc" v-html="currentSong.singer"></h3>
        </div>
        <div class="control" @click.stop="toggoPlaying">
          <i :class="playIcon"></i>
        </div>
        <div class="control">列表</div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import progressBar from "@/base/progress";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";
import scroll from "base/scroll/scroll";
import lrcParser from "lyric-parser";

export default {
  name: "player",
  //import引入的组件需要注入到对象中才能使用
  components: { progressBar, scroll },
  data() {
    //这里存放数据
    return {
      audioReady: false,
      currentTime: 0,
      activeFlag: true,
      currentLrc: null,
      currentLineNumber: 0,
      cuttentLrcTxt: ""
    };
  },
  //监听属性 类似于data概念
  computed: {
    playIcon() {
      return this.playing ? "iconfont icon-zanting" : "iconfont icon-bofang";
    },
    rotate() {
      return this.playing ? "rotate" : "pause";
    },
    disable() {
      return this.audioReady ? "" : "disable";
    },
    _mode() {
      return this.mode === playMode.order
        ? "icon-shunxubofang"
        : this.mode === playMode.loop
        ? "icon-danquxunhuan"
        : "icon-iconfontsuijibofang";
    },
    love() {
      return "iconfont icon-xihuan";
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
      // console.log(newSong);
      if (!newSong.id) {
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }

      if (this.currentLrc) {
        this.currentLrc.stop();
        // console.log("ssssss" + this.currentLrc);
        this.currentTime = 0;
        this.cuttentLrcTxt = "";
      }
      setTimeout(() => {
        this.$refs.audio.play();
        this.getlrc();
      }, 1000);
    },
    playing(status) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        status ? audio.play() : audio.pause();
      });
    }
  },
  //方法集合
  methods: {
    //swipe滑动触发事件
    handleChange() {
      this.activeFlag = !this.activeFlag;
      if (this.currentLrc) {
        // console.log(this.currentTime * 1000);
        this.currentLrc.seek(this.currentTime * 1000);
      }
      this.$refs.scroll.refresh();
    },
    //退出播放全屏
    back() {
      this.setFullScreen(false);
    },
    //打开全屏播放器
    open() {
      this.setFullScreen(true);
    },
    //audio标签准备完成
    ready() {
      this.audioReady = true;
    },
    error() {
      this.audioReady = true;
    },
    toggoPlaying() {
      if (!this.audioReady) {
        return;
      }
      this.setPlaying(!this.playing);

      if (this.currentLrc) {
        this.currentLrc.togglePlay();
      }
    },
    next() {
      if (!this.audioReady) {
        return;
      }
      if (this.playList.length == 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.toggoPlaying();
        }
      }

      this.audioReady = false;
    },
    prev() {
      if (!this.audioReady) {
        return;
      }
      if (this.playList.length == 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playList.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.toggoPlaying();
        }
      }
      this.audioReady = false;
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = [];
      if (this.mode === playMode.random) {
        list = shuffle(this.orderList);
      } else {
        list = this.orderList;
      }
      this.resetIndex(list);
      this.setPlayList(list);
    },
    //audio 播放完成回调函数
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      if (this.currentLrc) {
        this.currentLrc.seek(0);
      }
    },
    resetIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    //audio标签时间更新函数
    updateTime(e) {
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
      const cuttentTime = this.currentSong.duration * percent;
      this.$refs.audio.currentTime = cuttentTime;
      if (!this.playing) {
        this.toggoPlaying();
      }
      if (this.currentLrc) {
        this.currentLrc.seek(cuttentTime * 1000);
      }
    },
    getlrc() {
      this.currentSong
        .getLrc(this.currentSong.mid + "s")
        .then(lrcStr => {
          this.currentLrc = new lrcParser(lrcStr, this.handleLrc);
          console.log(`获取 ${this.currentSong.name} 歌词成功`);
          if (this.playing) {
            this.currentLrc.play();
          }
        })
        .catch(err => {
          this.currentLrc = null;
          this.currentLineNumber = 0;
          this.cuttentLrcTxt = "此歌曲暂无歌词";
        });
    },
    handleLrc({ lineNum, txt }) {
      this.currentLineNumber = lineNum;
      if (lineNum > 5) {
        let lineEle = this.$refs.lrcLine[lineNum - 5];
        this.$refs.scroll.scrollToElement(lineEle, 1000);
      } else {
        this.$refs.scroll.scrollTo(0, 0, 1000);
      }
      this.cuttentLrcTxt = txt;
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
          height: 100%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .scroll_lrcwrap {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
          }

          .text {
            line-height: 32px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
          }

          .current {
            color: white;
            font-size: 16px;
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

.iconfont {
  font-size: 40px;
}

.icon-xiajiantou {
  font-size: 20px;
}

.icon-shunxubofang, .icon-iconfontsuijibofang {
  font-size: 35px;
}
</style>