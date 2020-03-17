<template>
  <div class="bg_fff main">
    <h3 class="title"><i class="el-icon-user-solid"></i>头像管理</h3>
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small' @click="refreshAction">刷新</el-button>
    </div>
    <div class="p10">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="手机号码：">
          <el-input v-model="formInline.mobileNo" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="注册时间：">
          <div class="block">
            <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
              v-model="formInline.startDate" @change="startTimeChang"></el-date-picker>
            <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
              v-model="formInline.endDate" @change="endTimeChang"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="是否处理：">
          <el-select v-model="formInline.istate" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="已审核" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select v-model="formInline.exstate" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="审核中" value="0"></el-option>
            <el-option label="拒绝" value="1"></el-option>
            <el-option label="通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="cmobileno" label="手机号" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cnickname" label="昵称" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="性别" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.gender == 1">男</p>
            <p v-else>女</p>
          </template>
        </el-table-column>
        <el-table-column label="头像" header-align="center" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.chead" style="width: 50px;height:50px;" alt="" @click="openImg(scope.row.chead)">
          </template>
        </el-table-column>
        <el-table-column prop="caddDate" label="修改时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="是否处理" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.istate==0">未审核</p>
            <p v-else-if="scope.row.istate==1">已审核</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.exstate==0">审核中</p>
            <p v-else-if="scope.row.exstate==1">拒绝</p>
            <p v-else-if="scope.row.exstate==2">通过</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.istate==0">
            <el-button type="primary" @click="passBtn(scope.$index, scope.row)">通过</el-button>
            <el-button type="danger" @click="delAction(scope.$index, scope.row)">拒绝</el-button>
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

    <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
  import {
    loadUserPortraitList,
    updateUserPortrait
  } from '@/request/api'
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        dialogImgUrl: '',
        imgVisible: false,
        formInline: {
          mobileNo: '',
          nickName: '',
          pageSize: 20,
          pageNo: 1,
          startDate: '',
          endDate: '',
          istate: '',
          exstate:''
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
      }
    },
    methods: {
      getLoaduserReportList() {
        loadUserPortraitList(this.formInline).then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data)
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
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
      refreshAction() {
        this.getLoaduserReportList()
      },
      passBtn(index, row) {
        updateUserPortrait({
          exstate: 2,
          cuserid: row.cuserid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoaduserReportList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      delAction(index, row) {
        updateUserPortrait({
          exstate: 1,
          cuserid: row.cuserid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoaduserReportList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoaduserReportList();
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
      onSubmit() {
        this.getLoaduserReportList();
      }
    },
    created() {
      this.getLoaduserReportList();
    }
  };

</script>

<style lang="scss" scoped>
  .el-select {
    width: 120px;
  }

</style>
