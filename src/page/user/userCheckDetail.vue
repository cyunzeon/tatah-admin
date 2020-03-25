<template>
  <div class="main bg_fff">
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small'>刷新</el-button>
      <el-button type="primary" icon="el-icon-back" size='small' @click="backBtn">返回</el-button>
    </div>
    <h3 class="title"><i class="el-icon-user-solid"></i>用户审核管理</h3>
    <div class="p10">
      <table>
        <tr>
          <th>手机号</th>
          <th>昵称</th>
          <th>性别</th>
          <th>生日</th>
          <th>注册时间</th>
          <th>个人描述</th>
        </tr>
        <tr>
          <th>{{$route.query.tel}}</th>
          <th>{{$route.query.nickName}}</th>
          <th>
            <p v-if="$route.query.sex == 1">男</p>
            <p v-else>女</p>
          </th>
          <th>{{$route.query.birth}}</th>
          <th>{{$route.query.time}}</th>
          <th>{{$route.query.sign}}</th>
        </tr>
      </table>
      <table class="table2">
        <tr>
          <th colspan="2" style="width: 50%;">照片</th>
          <th>视频</th>
        </tr>
        <tr>
          <td colspan="2" class="photo-box">
            <img :src="$route.query.photo1" alt="" @click="openImg($route.query.photo1)">
            <img :src="$route.query.photo2" alt="" @click="openImg($route.query.photo2)">
          </td>
          <td>
            <video muted width="700" height="400" autoplay loop controls='controls'>
              <source :src="$route.query.video" type="video/mp4">
              您的浏览器不支持 video 标签
            </video>
          </td>
        </tr>
        <tr>
          <td>审核</td>
          <td colspan="2">
            <el-form :inline="true" :model="form" class='tal p10'>
              <el-form-item>
                <el-radio-group v-model="form.state" class='tac'>
                  <el-radio label="1" v-model="form.state" value="1">通过</el-radio>
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
    <el-dialog width="600px" :visible.sync="imgVisible">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>

  </div>

</template>
<script>
  import {
    userExamine
  } from '@/request/api'
  export default {
    data() {
      return {
        form: {
          state: '',
          reason: '',
          userId: this.$route.query.userId
        },
        tableData: [],
        dialogImgUrl: '',
        imgVisible: false
      };
    },
    methods: {
      getAction() {
        userExamine(this.form).then(res => {
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
      },
            //点击看大图
            openImg(head) {
        if (head) {
          this.imgVisible = true
          this.dialogImgUrl = head
        }
      },

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
    width: 240px;
    height: 240px;
  }

</style>
