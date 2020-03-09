<template>
  <div class="bg_fff main">
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small'>刷新</el-button>
      <el-button type="primary" icon="el-icon-back" size='small' @click="backAction">返回</el-button>
    </div>
    <h3 class="title"><i class="el-icon-user-solid"></i>编辑信息</h3>
    <div class="p20 w30">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="form.bankCard"></el-input>
        </el-form-item>
        <el-form-item label="支行名称">
          <el-input v-model="form.bankBranchName"></el-input>
        </el-form-item>
        <el-form-item label="支付宝帐号">
          <el-input v-model="form.alipayAccount"></el-input>
        </el-form-item>
        <el-form-item label="个人描述">
          <el-input type="textarea" v-model="form.signature"></el-input>
        </el-form-item>
        <el-form-item label="帐号状态">
          <el-switch v-model="states" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='small' @click="editAction">修改</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>
<script>
  import {
    editUserVerify
  } from '@/request/api'
  export default {
    data() {
      return {
        states: '',
        form: {
          realName: '',
          idCard: '',
          bankCard: '',
          bankBranchName: '',
          state: '',
          alipayAccount: '',
          signature: '',
          userId: this.$route.query.userId
        }
      }
    },
    methods: {
      editAction() {
        editUserVerify(this.form).then(res => {
          console.log(res.data.code)
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.$router.go(-1)
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      onSubmit() {},
      backAction() {
        this.$router.go(-1)
      }
    },
    created() {
      if (this.$route.query.state == 1) {
        this.states = 1
      } else {
        this.states = 0
      }
    }
  };

</script>
<style lang='less' scoped>

</style>
