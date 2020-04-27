<template>
  <div class="report-detail">
    <el-button type="primary" icon="el-icon-back" size="small" @click="backAction">返回</el-button>
    <table class="tables">
      <tr>
        <td>聚会主题</td>
        <td>{{dataForm.title}}</td>
      </tr>
      <tr>
        <td>发起人</td>
        <td>{{dataForm.nickName}}</td>
      </tr>
      <tr>
        <td>聚会时间</td>
        <td>{{dataForm.cadddate}}</td>
      </tr>
      <tr>
        <td>聚会地点</td>
        <td>{{dataForm.place}}</td>
      </tr>
      <tr>
        <td>是否提供机票</td>
        <td>
          <span v-if="dataForm.welfare == 0">不提供</span>
          <span v-else-if="dataForm.welfare == 1">提供</span>
          <span v-else></span>
        </td>
      </tr>
      <tr>
        <td>邀请人数</td>
        <td>{{dataForm.count}}</td>
      </tr>
      <tr>
        <td>聚会奖励</td>
        <td>{{dataForm.diamonds}}</td>
      </tr>
      <tr>
        <td>聚会介绍</td>
        <td>{{dataForm.introduce}}</td>
      </tr>
      <tr>
        <td>聚会封面</td>
        <td>
          聚会封面
          <img :src="dataForm.pagephoto" alt="" v-if="dataForm.pagephoto">
          <el-upload class="upload-demo" action="http://iyadmin.tiantiancaidian.com/system/uploadImage" multiple
            :limit="1" :on-success="success" list-type="picture">
            <el-button size="small" type="primary">重新上传</el-button>
          </el-upload>
        </td>
        <td>
          聚会详情
          <img :src="dataForm.detailsphoto" alt="" dataForm.detailsphoto>
          <el-upload class="upload-demo" action="http://iyadmin.tiantiancaidian.com/system/uploadImage" multiple
            :limit="1" :on-success="esuccess" list-type="picture" >
            <el-button size="small" type="primary">重新上传</el-button>
          </el-upload>
        </td>
      </tr>
      <tr>
        <td>审核</td>
        <td colspan="2">
          <el-radio-group v-model="type" class='tac'>
            <el-radio label="1" v-model="type" value="1">取消见面聚会</el-radio>
          </el-radio-group>
          <!-- <el-form-item>
              <el-input type="textarea" v-model="form.reason" class='w200'></el-input>
            </el-form-item> -->
          <!-- <el-form-item>
              <el-button type="primary" @click="getAction">提交</el-button>
            </el-form-item> -->
        </td>
      </tr>
    </table>
    <div class="btn">
      <el-button type="primary" @click="getAction">确认</el-button>
    </div>
  </div>
</template>

<script>
  import {
    partyInfo,
    editParty,
    clickOneParty
  } from '@/request/api';
  export default {
    data() {
      return {
        dataForm: [],
        type: 0,
        pagephoto: '',
        detailsphoto: ''
      }
    },
    created() {
      this.getClickOneParty();
    },
    methods: {
      backAction() {
        this.$router.go(-1);
      },
      getClickOneParty() {
        clickOneParty({
          ipartyid: this.$route.query.ipartyid
        }).then(res => {
          this.dataForm = res.data.data;
          this.pagephoto = res.data.data.pagephoto;
          this.detailsphoto = res.data.data.detailsphoto;
        })
      },
      getAction() {
        console.log(this.pagephoto)
        console.log(this.detailsphoto)
        editParty({
          ipartyid: this.$route.query.ipartyid,
          pagephoto: this.pagephoto,
          detailsphoto: this.detailsphoto,
          type: this.type
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.$router.go(-1)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      success(response, file, fileList) {
        this.pagephoto = response.data.imageUrl;
      },
      esuccess(response, file, fileList) {
        this.detailsphoto = response.data.imageUrl;
      }
    },
  }

</script>

<style lang="scss" scoped>
  .report-detail {
    background: #fff;
  }

  .el-button {
    margin: 10px;
  }

  .tables {
    td {
      padding: 8px 0;
      font-size: 14px;

      &:nth-child(odd) {
        border: 1px #eee solid;
        /* background: #f8f8f8; */
      }

      &:nth-child(even) {
        border: 1px #eee solid;
      }
    }

    tr {
      td:nth-of-type(1) {
        width: 30%;
      }
    }

    tr:last-of-type {
      height: 400px;
    }

    img {
      width: 300px;
      height: 500px;
      float: left;
      margin: 0 20px;
    }

  }

</style>
<style lang="scss">
  .btn {
    width: 100%;

    .el-button {
      width: 200px;
      height: 80px;
      font-size: 24px;
    }
  }

</style>
