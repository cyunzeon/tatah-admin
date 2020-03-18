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
      <el-form-item label="交易类型：">
        <el-select v-model="formInline.state" placeholder="请选择交易类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="添加好友赠送礼物" value="101"></el-option>
          <el-option label="单聊赠送礼物" value="102"></el-option>
          <el-option label="评论动态" value="103"></el-option>
          <el-option label="每日红包" value="201"></el-option>
          <el-option label="俱乐部红包" value="202"></el-option>
          <el-option label="用户充值" value="301"></el-option>
          <el-option label="兑换钻石" value="302"></el-option>
          <el-option label="用户提现" value="303"></el-option>
          <el-option label="注册礼包" value="304"></el-option>
          <el-option label="后台扣除钻石" value="401"></el-option>
          <el-option label="后台增加钻石" value="402"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="tradeorder" label="流水编号" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="充值金额" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.biztype==101">{{scope.row.czcs}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提现金额" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.biztype==103">{{scope.row.czcs}}</p>
          </template>
        </el-table-column>
        <el-table-column label="进帐钻石" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.type==0 && scope.row.Imoneytype==1">{{scope.row.czcs}}</p>
          </template>
        </el-table-column>
        <el-table-column label="出帐钻石" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.type==1 && scope.row.Imoneytype==1">{{scope.row.czcs}}</p>
          </template>
        </el-table-column>
        <el-table-column label="进帐金币" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.type==0 && scope.row.Imoneytype==0">{{scope.row.czcs}}</p>
          </template>
        </el-table-column>
        <el-table-column label="出账金币" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.type==1 && scope.row.Imoneytype==0">{{scope.row.czcs}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="adddate" label="操作时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="biztypename" label="交易类型" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="变化前钻石" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.Imoneytype==1">{{scope.row.oldmoney}}</p>
          </template>
        </el-table-column>
        <el-table-column label="变化后钻石" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.Imoneytype==1">{{scope.row.balance}}</p>
          </template>

        </el-table-column>
        <el-table-column label="变化前金币" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.Imoneytype==0">{{scope.row.oldmoney}}</p>
          </template>

        </el-table-column>
        <el-table-column label="变化后金币" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.Imoneytype==0">{{scope.row.balance}}</p>
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
    loadUserDetailList
  } from '@/request/api'
  export default {
    data() {
      return {
        formInline: {
          startDate: '',
          endDate: '',
          state: '',
          pageNo: 1,
          pageSize: 20,
          userId: this.$route.query.userid
        },
        total: 0,
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
      getLoadUserDetailList() {
        loadUserDetailList(this.formInline).then(res => {
          if(res.data.code == 200) {
            this.tableData = res.data.data
          }
        })
      },
      onSubmit() {
        this.formInline.pageNo = 1;
        this.getLoadUserDetailList()
      },
            //分页器
            handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadUserDetailList();
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
      this.getLoadUserDetailList()
    }
  };

</script>
<style lang='less' scoped>

</style>
