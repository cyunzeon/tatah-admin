<template>
  <div class="main bg_fff">
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small'>刷新</el-button>
      <el-button type="primary" icon="el-icon-back" size='small' @click="backBtn">返回</el-button>
    </div>
    <h3 class="title"><i class="el-icon-user-solid"></i>用户实名审核</h3>
    <div class="p10">
      <table>
        <tr>
          <th>手机号</th>
          <th>昵称</th>
          <th>性别</th>
          <th>姓名</th>
          <th>身份证号码</th>
          <th>提交时间</th>
        </tr>
        <tr>
          <th>{{$route.query.tel}}</th>
          <th>{{$route.query.nickName}}</th>
          <th>
            <p v-if="$route.query.sex == 1">男</p>
            <p v-else>女</p>
          </th>
          <th>{{$route.query.crealname}}</th>
          <th>{{$route.query.cidcard}}</th>
          <th>{{$route.query.time}}</th>
        </tr>
      </table>
      <table class="table2">
        <tr>
          <th colspan="2" style="width: 50%;">身份证正面照片</th>
          <th>身份证反面照片</th>
        </tr>
        <tr>
          <td colspan="2" class="photo-box">
            <img :src="$route.query.photo1" alt="">
          </td>
          <td class="photo-box">
            <img :src="$route.query.photo2" alt="">
          </td>
        </tr>
        <tr>
          <td>审核</td>
          <td colspan="2">
            <el-form :inline="true" :model="form" class='tal p10'>
              <el-form-item>
                <el-radio-group v-model="form.state" class='tac'>
                  <el-radio label="2" v-model="form.state" value="2">通过</el-radio>
                  <el-radio label="3" v-model="form.state" value="3">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-input type="textarea" v-model="form.reason" class='w200'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getAction">提交</el-button>
              </el-form-item>
            </el-form>
          </td>
        </tr>
      </table>
    </div>

  </div>

</template>
<script>
  import {
    userInformation
  } from '@/request/api'
  export default {
    data() {
      return {
        form: {
          state: '',
          userId: this.$route.query.userId
        },
        tableData: [],
      };
    },
    methods: {
      getAction() {
        userInformation(this.form).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      backBtn() {
        this.$router.go(-1)
      }
    }
  };

</script>
<style lang='less' scoped>
  .table2 {
    th {
      background: #f8f8f8;
    }
  }

  .w200 {
    width: 300px;
  }

  .photo-box img {
    width: 340px;
    height: 240px;
  }

</style>
