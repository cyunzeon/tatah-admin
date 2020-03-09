<template>
  <div class="report-detail">
    <el-button type="primary" icon="el-icon-back" size="small" @click="backAction">返回</el-button>
    <table class="tables">
      <tr>
        <td>举报人</td>
        <td>{{$route.query.jbrMobileNo}}</td>
      </tr>
      <tr>
        <td>被举报人</td>
        <td>{{$route.query.bjbrMobileNo}}</td>
      </tr>
      <tr>
        <td>举报时间</td>
        <td>{{$route.query.cadddate}}</td>
      </tr>
      <tr>
        <td>举报类型</td>
        <td>
          <p v-if="$route.query.state == 1">头像、资料作假</p>
          <p v-else-if="$route.query.state == 2">骚扰广告</p>
          <p v-else-if="$route.query.state == 3">诈骗、托</p>
          <p v-else-if="$route.query.state == 4">恶意骚扰、不文明语言</p>
          <p v-else-if="$route.query.state == 5">发广告或推广消息</p>
          <p v-else>色情低俗</p>
        </td>
      </tr>
      <tr>
        <td>图片证据</td>
        <td>
          <img :src="$route.query.reportimg" alt />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    backAction() {
      console.log(112)
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button {
  margin: 10px;
}
.tables {
  td {
    padding: 8px 0;
    font-size: 14px;

    &:nth-child(odd) {
      border: 1px #f8f8f8 solid;
      background: #f8f8f8;
    }

    &:nth-child(even) {
      border: 1px #f8f8f8 solid;
    }
  }

  tr {
    td:nth-of-type(1) {
      width: 30%;
    }
  }

  tr:last-of-type {
    height: 400px;

    img {
      width: 350px;
      height: 350px;
    }
  }
}
</style>
