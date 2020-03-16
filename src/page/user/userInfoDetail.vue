<template>
  <div class="main">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户详情" name="first">
        <user-details></user-details>
      </el-tab-pane>
      <el-tab-pane label="帐户明细" name="second">
        <user-account></user-account>
      </el-tab-pane>
      <el-tab-pane label="消费记录" name="third">
        <user-expenditure></user-expenditure>
      </el-tab-pane>
      <el-tab-pane label="收益记录" name="fourth">
        <user-earnings></user-earnings>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="fifth">
        <user-topUp></user-topUp>
      </el-tab-pane>
      <el-tab-pane label="提现记录" name="sixth">
        <user-withdraw></user-withdraw>
      </el-tab-pane>
      <el-tab-pane label="兑换记录" name="seventh">
        <user-conversion></user-conversion>
      </el-tab-pane>
    </el-tabs>
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-back" size='small' @click="$router.go(-1)">返回</el-button>
    </div>
  </div>

</template>
<script>
  import userDetails from './components/details.vue'
  import userAccount from './components/account.vue'
  import userExpenditure from './components/expenditure.vue'
  import userEarnings from './components/earnings.vue'
  import userTopUp from './components/topUp.vue'
  import userWithdraw from './components/withdraw.vue'
  import userConversion from './components/conversion.vue'

  export default {
    data() {
      return {
        activeName: 'first',
        userImg: require('@/assets/img/usermr.png')
      };
    },
    components: {
      userDetails,
      userAccount,
      userExpenditure,
      userEarnings,
      userTopUp,
      userWithdraw,
      userConversion,
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };

</script>
<style lang='less' scoped>
  .main {
    position: relative;
  }

  .btn-list {
    position: absolute;
    top: 0;
    right: 0;
  }

</style>
