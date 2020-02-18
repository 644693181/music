<template>
  <!-- <div>
    <div class="header">
      <img src="../../common/image/default.png" alt />
      YanMusic
    </div>
  </div>-->
  <mt-header id="header" title="Yan Music" class="mint-header">
    <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
  </mt-header>
</template>

<style scope>
#header {
  touch-action: none;
  background-color: #222;
  color: #ffcd32;
  position: fixed;
  width: 100%;
  max-width: 750px;
  top: 0;
  height: 6%;
}
.header img {
  display: inline-block;
  margin: 0 auto;
  width: 32px;
  height: 30px;
}
</style>
