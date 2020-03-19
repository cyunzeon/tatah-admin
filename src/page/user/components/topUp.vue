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
      <el-form-item label="充值编号：">
        <el-input v-model="formInline.numberId" placeholder="充值编号"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.state" placeholder="请选择活动区域">
          <el-option label="" value="">全部</el-option>
          <el-option label="0" value="0">已申请</el-option>
          <el-option label="1" value="1">未处理</el-option>
          <el-option label="2" value="2">已处理</el-option>
          <el-option label="3" value="3">已成功</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="batchNo" label="充值编号" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="money" label="充值金额" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="idiamond" label="进账钻石" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="rate" label="手续费" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cashdate" label="申请时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="confdate" label="确认时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="支付网关" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.type == 0">银行</p>
            <p v-else>支付宝</p>
          </template>
        </el-table-column>
        <el-table-column prop="memo" label="处理内容" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.state == 0">已申请</p>
            <p v-else-if="scope.row.state == 1">未处理</p>
            <p v-else-if="scope.row.state == 2">已处理</p>
            <p v-else>已成功</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block p20 tac">
      <el-pagination
      style="margin-top: 16px; text-align:center;"
      layout="total, prev, pager, next"
      :total="total"
      :page-size="formInline.pageSize"
      :current-page.sync="formInline.pageNo"
      @current-change="handleCurrentChange"
    ></el-pagination>
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
          type: 1,
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
    methods: {
      getLoadCzORTxList() {
        loadCzORTxList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = parseInt(res.data.data.total);
            this.tableData = res.data.data.list;
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
    },
    created() {
      this.getLoadCzORTxList()
    }

  };

</script>
<style lang='less' scoped>

</style>
