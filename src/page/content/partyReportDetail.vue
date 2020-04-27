<template>
  <div class="report-detail">
    <el-button type="primary" icon="el-icon-back" size="small" @click="backAction">返回</el-button>
    <table class="tables">
      <tr>
        <td>举报人</td>
        <td>{{dataForm.cmobilenoOne}}</td>
      </tr>
      <tr>
        <td>被举报人</td>
        <td>{{dataForm.cmobilenoTwo}}</td>
      </tr>
      <tr>
        <td>举报时间</td>
        <td>{{dataForm.cadddate}}</td>
      </tr>
      <tr>
        <td>举报类型</td>
        <td>
          <p v-if="dataForm.reason == 1">未能准时参加见面聚会</p>
          <p v-else-if="dataForm.reason == 2">未参加见面聚会</p>
          <p v-else></p>
        </td>
      </tr>
      <tr>
        <td>图片证据</td>
        <td>
          <div v-for="item in dataForm.photo.split(',')" :key="index" class="img-wrap">
            <img :src="item" alt />
          </div>
        </td>
      </tr>
      <tr>
        <td>审核</td>
        <td colspan="2">
          <el-radio-group v-model="type" class='tac'>
            <el-radio label="1" value="1">通过</el-radio>
            <el-radio label="2" value="2">不通过</el-radio>
          </el-radio-group>
          </el-form-item>
          <!-- <el-form-item>
              <el-input type="textarea" v-model="form.reason" class='w200'></el-input>
            </el-form-item> -->
          <el-button type="primary" @click="getAction">提交</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {
    partyInfo,
    partyUpcExamine
  } from '@/request/api';
  export default {
    data() {
      return {
        dataForm: [],
        type: ''
      }
    },
    created() {
      this.getPartyInfo();
    },
    methods: {
      backAction() {
        this.$router.go(-1);
      },
      getPartyInfo() {
        partyInfo({
          ipartycptid: this.$route.query.ipartycptid
        }).then(res => {
          this.dataForm = res.data.data;
        })
      },
      getAction() {
        partyUpcExamine({
          ipartycptid: this.$route.query.ipartycptid,
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
      }
    },
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
    }

    img {
      width: 300px;
      height: 500px;
      float: left;
      margin: 0 20px;
    }

  }

</style>
