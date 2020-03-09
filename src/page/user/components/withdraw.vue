<template>
  <div class="bg_fff">
    <el-form :inline="true" class="p5">
      <el-form-item label="时间:">
        <div class="block">
          <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
            v-model="formInline.startDate" @change="startTimeChang"></el-date-picker>
          <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
            v-model="formInline.endDate" @change="endTimeChang"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="提现编号：">
        <el-input v-model="formInline.numberId" placeholder="提现编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="batchNo" label="提现编号" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="money" label="提现金额" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="idiamond" label="出账金币" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="rate" label="手续费" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cashdate" label="申请时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="confdate" label="确认时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="operator" label="处理人" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="memo" label="处理内容" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="提现状态" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.state == 0">已申请</p>
            <p v-else-if="scope.row.state == 1">未处理</p>
            <p v-else-if="scope.row.state == 2">已处理</p>
            <p v-else>已成功</p>
          </template>
        </el-table-column>
        <el-table-column label="是否成功" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.success == 0">未处理</p>
            <p v-else-if="scope.row.success == 1">提款成功</p>
            <p v-else-if="scope.row.success == 2">拒绝提款</p>
            <p v-else-if="scope.row.success == 3">银行处理失败</p>
            <p v-else>银行批复中</p>
          </template>
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
    loadCzORTxList
  } from '@/request/api'
  export default {
    data() {
      return {
        total: 0,
        formInline: {
          startDate: '',
          endDate: '',
          type: 2,
          state: '',
          numberId: '',
          pageNo: 1,
          pageSize: 20,
          userId: this.$route.query.userid
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
      };
    },
    created() {
      this.getLoadCzORTxList();
    },
    methods: {
      getLoadCzORTxList() {
        loadCzORTxList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.length;
            this.tableData = res.data.data;
          }
        })
      },
      onSubmit() {
        this.formInline.pageNo = 1;
        this.getLoadCzORTxList();
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadCzORTxList();
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
    }
  };

</script>
<style lang='less' scoped>

</style>
