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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="tradeorder" label="兑换编号" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="imoney " label="进账金币" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="omoney" label="出账金币" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="adddate" label="操作时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="dhqzs" label="变化前钻石" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="dhhzs" label="变化后钻石" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="dhqjb" label="变化前金币" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="dhhjb" label="变化后金币" header-align="center" align="center">
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
    loadUserExchangeList
  } from '@/request/api'
  export default {
    data() {
      return {
        total: 0,
        formInline: {
          startDate: '',
          endDate: '',
          pageNo: 1,
          pageSize: 20,
          userId: this.$route.query.userid
        },
        number: '',
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
      getLoadUserExchangeList() {
        loadUserExchangeList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = parseInt(res.data.data.total);
            this.tableData = res.data.data.list;
          }
        })
      },
      onSubmit() {
        this.formInline.pageNo = 1;
        this.getLoadUserExchangeList()
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadUserExchangeList();
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
      this.getLoadUserExchangeList()
    }
  };

</script>
<style lang='less' scoped>

</style>
