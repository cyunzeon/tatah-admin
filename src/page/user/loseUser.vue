<template>
  <div class="bg_fff main">
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small' @click="refreshAction">刷新</el-button>
    </div>
    <h3 class="title"><i class="el-icon-user-solid"></i>流失用户管理</h3>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号码：">
        <el-input v-model="formInline.mobileNo" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="渠道号：">
        <el-input v-model="formInline.cfrom" placeholder="渠道号"></el-input>
      </el-form-item>
      <el-form-item label="注册日期:">
        <div class="block">
          <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
            v-model="formInline.startDate" @change="startTimeChang"></el-date-picker>
          <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
            v-model="formInline.endDate" @change="endTimeChang"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="cmobileno" label="手机号" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cnickname" label="昵称" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="性别" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.igender==1">男</p>
            <p v-else>女</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="VIP等级" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cchannel" label="渠道号" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="ifillmoney" label="充值总额" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="icash" label="提现总额" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="ijewel" label="钻石余额" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="igoldcoin" label="金币余额" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cadddate" label="上次活跃时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" width="100" header-align="center" align="center">
          <el-button type="primary">查看</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="block p20 tac">
      <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>

</template>
<script>
  import {
    loadUserLossList
  } from '@/request/api'
  export default {
    data() {
      return {
        total: 0,
        formInline: {
          mobileNo: '',
          nickName: '',
          cfrom: '',
          startDate: '',
          endDate: '',
          pageNo: 1,
          pageSize: 20
        },
        //时间选择
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        },
        pickerOptionsOver: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        },
        value: '',
        tableData: []
      }
    },
    methods: {
      getLoadUserLossList() {
        loadUserLossList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.length;
            this.tableData = res.data.data;
          }
        })
      },
      refreshAction() {
        this.getLoadUserLossList()
      },
      onSubmit() {
        this.formInline.pageNo = 1;
        this.getLoadUserLossList()
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadUserLossList();
      },
      //时间选择
      dateFilter(input) {
        var d = new Date(input);
        var year = d.getFullYear();
        var month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + '-' + month + '-' + day;
      },
      startTimeChang(val) {
        let startTime = this.dateFilter(val);
        this.formInline.startDate = startTime;
      },
      endTimeChang(val) {
        let endTime = this.dateFilter(val);
        this.formInline.endDate = endTime;
      }
    },
    created() {
      this.getLoadUserLossList()
    }
  };

</script>
<style lang='less' scoped>
  .demo-form-inline {
    text-align: left;
    padding: 5px;
  }

</style>
