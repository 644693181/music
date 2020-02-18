<template>
  <ul id="tabBar" class="tabbar">
    <li>
      <router-link to="/">
        <img src="../../assets/resume.png" alt />
        <span>简历</span>
      </router-link>
    </li>
    <li>
      <router-link to="/music">
        <img src="../../assets/resume.png" alt />
        <span>音乐</span>
      </router-link>
    </li>
  </ul>
</template>

<style lang="stylus" scoped>
.tabbar {
  max-width: 750px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 100%;
  height: 50px;

  li {
    justify-content: center;
    text-align: center;
    flex: 1;

    a {
      display: inline-block;

      img {
        display: block;
        width: 30px;
        height: 30px;
      }

      font-size: 12px;
    }
  }

  .router-link-active {
    color: orange;
  }
}
</style>