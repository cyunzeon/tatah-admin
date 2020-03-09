<template>
  <el-container class='h100'>
    <el-header>
      <a-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <a-side />
      </el-aside>
      <el-container>
        <el-main>
          <!-- <el-breadcrumb separator="/" class='breadcrumb'>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/user'}">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户信息详情</el-breadcrumb-item>
          </el-breadcrumb> -->
          <div class="p10">
            <router-view></router-view>
          </div>
        </el-main>
        <!-- <el-footer>
          <a-footer />
        </el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  import aSide from '@/components/aside'
  import aHeader from '@/components/header'
  import aFooter from '@/components/footer'
  export default {
    name: 'index',
    components: {
      aSide,
      aHeader,
      aFooter

    }
  };

</script>
<style lang="less" scoped>
  @import '../assets/style/varibles.less';

  .breadcrumb {
    padding: 10px;
    background-color: #f8f8f8;
  }

  .h100 {
    height: 100%;
  }

  .el-header,
  .el-footer {
    background-color: @mainColor;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    color: #333;
    background-color: #f8f8f8;
  }

  .el-aside {
    padding-top: 25px;
    padding-left: 25px;
    background-color: #fff;
    color: #333;
    text-align: center;

  }

  .el-main {
    background-color: @conColor;
    color: #333;
    text-align: left;
    padding: 0;
  }

  .el-container {
    overflow: auto;

  }

</style>
