<template>
   <div class=''>
       <div class="itemhead">
            <img src="../../assets/gerenziliao.png" alt /> 基础信息
            <div class="line"></div>
          </div>
          <scroll ref="scroll" id="scroll" class="oitem">
            <div class="iteminfo">
              <dl class>
                <dd>孙岩</dd>
                <dt>四年网站建设与维护经验，深度理解用户需求, 熟练的网页基本功，更快完成项目任务</dt>
                <dt>专业技能：</dt>
                <dt>-> vue.js</dt>
                <dt>-> 微信小程序</dt>
                <dt>-> 精通DIV+CSS布局的HTML代码编写,可使用Bootstrap, Mui, ElementUi等框架快速建站</dt>
                <dt>->熟悉各大浏览器,对前端性能,浏览器兼容性等相关知识有丰富的工作经验</dt>
                <dt>-> 有Java面向对象编程思想,熟悉node.js,一定的Web后台编程基础,能与后台开发伙伴流畅沟通</dt>
              </dl>
            </div>
          </scroll> 
   </div>
</template>

<script>
import scroll from "@/base/slider/scroll";
export default {
   name:'baseinfo',
    component: {scroll}
}
</script>
<style lang='stylus' scoped>
//@import url(); 引入公共css类
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

    img {
      height: 20px;
      width: 20px;
      vertical-align: middle;
      margin-right: 10px;
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

      dd {
        line-height: 40px;
        font-size: 18px;
        color: aqua;
        padding-left: 20px;
      }

      dl {
        line-height: 50px;
        // height 30px
      }

      dt {
        vertical-align: middle;
        text-indent: 2em;
        line-height: 30px;
      }
    }
  }
</style>