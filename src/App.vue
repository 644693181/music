<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import resume from "@/pages/resume/resume";

export default {
  methods: {},
  components: {
    resume
  },

  mounted() {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import '~common/stylus/variable';

#app {
  color: $color-theme;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
}
</style>