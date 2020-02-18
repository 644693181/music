<template >
  <div class="nav">
    <router-link tag="div" class="nav_item" to="/recommend">
      <span class="nav_link">推荐</span>
    </router-link>
    <router-link tag="div" class="nav_item" to="/singer">
      <span class="nav_link">歌手</span>
    </router-link>
    <router-link tag="div" class="nav_item" to="/rank">
      <span class="nav_link">排行</span>
    </router-link>
    <router-link tag="div" class="nav_item" to="/search">
      <span class="nav_link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "导航"
    };
  }
};
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.nav {
  display: flex;
  position: fixed;
  top: 6%;
  /* justify-content: space-around; */
  width: 100%;
  max-width: 750px;
  height: 7%;
  line-height: 44px;
  font-size: $font-size-medium;
}

.nav_item {
  color: aqua;
  flex: 1;
  text-align: center;
}

.nav_link {
  padding-bottom: 5px;
  color: $color-text-l;
}

.router-link-active .nav_link {
  color: $color-theme;
  border-bottom: 2px solid $color-theme;
}
</style>