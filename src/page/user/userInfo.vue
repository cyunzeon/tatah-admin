<template>
  <div class="bg_fff">
    <h3 class="title"><i class="el-icon-user-solid"></i>用户信息管理</h3>
    <!-- 条件查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号码：">
        <el-input v-model="formInline.mobileNo" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="注册日期:">
        <div class="block">
          <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
            v-model="formInline.startDate" @change="startTimeChang"></el-date-picker>
          <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
            v-model="formInline.endDate" @change="endTimeChang"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="注册审核：">
        <el-select v-model="formInline.iexamine" placeholder="注册审核">
          <el-option label="全部" value=""></el-option>
          <el-option label="已完成" value="1"></el-option>
          <el-option label="未完成" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%" highlight-current-row>
        <el-table-column prop="mobileno" label="手机号" width="140" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="140" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="头像" width="140" header-align="center" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.head" style="width: 50px;height:50px;" alt="" @click="openImg(scope.row.head)">
          </template>
        </el-table-column>
        <el-table-column label="性别" width="80" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.gender == 1">男</p>
            <p v-else>女</p>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="生日" width="150" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="viplevel" label="VIP等级" width="80" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="signature" label="个人描述" header-align="center">
        </el-table-column>
          <!-- <el-table-column label="注册审核" width="80" header-align="center" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.state == 1">已完成</p>
              <p v-else-if="scope.row.state == 2">未完成</p>
              <p v-else></p>
            </template>
          </el-table-column> -->
        <el-table-column label="状态" width="80" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.state == 1">正常</p>
            <p v-else>注销</p>
          </template>
        </el-table-column>
        <el-table-column prop="adddate" label="活跃时间" width="180" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="lookAction(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
      :page-size="formInline.pageSize" :current-page.sync="formInline.pageNo" @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog width="400px" :visible.sync="imgVisible">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
  </div>

</template>
<script>
  import {
    loadUserList
  } from '@/request/api'
  export default {
    data() {
      return {
        tableData: [],
        dialogImgUrl: '',
        total: 0,
        imgVisible: false,
        formInline: {
          mobileNo: '',
          nickName: '',
          pageSize: 20,
          pageNo: 1,
          startDate: '',
          endDate: '',
          state: ''
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
        timer: "" //定义一个定时器的变量
      }
    },
    methods: {
      //请求数据
      getLoadUserList() {
        loadUserList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.total = parseInt(res.data.data.total);
          }
        })
      },
      //查询
      onSubmit() {
        if(this.formInline.endDate == '' && this.formInline.startDate != '' ) {
          this.formInline.endDate = this.timer
        }
        this.formInline.pageNo = 1;
        this.getLoadUserList()
      },
      //查看
      lookAction(index, row) {
        this.$router.push({
          path: '/userInfo/detail',
          query: {
            userid: row.userid
          }
        })
      },
      //点击看大图
      openImg(head) {
        if (head) {
          this.imgVisible = true
          this.dialogImgUrl = head
        }
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadUserList();
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
      },
      getTime() {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm =
          (new Date().getMonth() + 1) < 10 ?
          "0" + (new Date().getMonth() + 1) :
          (new Date().getMonth() + 1);
        let dd =
          new Date().getDate() < 10 ?
          "0" + new Date().getDate() :
          new Date().getDate();
        _this.timer = yy + "-" + mm + "-" + dd;
      },
    },
    created() {
      this.getLoadUserList();
      setInterval(this.getTime, 1000);
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
  };

</script>
<style lang='less' scoped>
  .demo-form-inline {
    text-align: left;
    padding: 5px;
  }

</style>
