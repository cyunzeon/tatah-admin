<template>
  <div class="bg_fff">
    <h3 class="title">
      <i class="el-icon-user-solid"></i>用户实名审核
    </h3>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号码：">
        <el-input v-model="formInline.mobileNo" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="提交日期:">
        <div class="block">
          <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
            v-model="formInline.startDate" @change="startTimeChang"></el-date-picker>
          <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
            v-model="formInline.endDate" @change="endTimeChang"></el-date-picker>
        </div>
      </el-form-item>
      <!-- <el-form-item label="是否处理：">
        <el-select v-model="formInline.state" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="未处理" value="0"></el-option>
          <el-option label="已处理" value="1"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="审核状态：">
        <el-select v-model="formInline.state" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <!-- <el-option label="未实名" value="0"></el-option> -->
          <el-option label="未处理" value="1"></el-option>
          <el-option label="已实名" value="2"></el-option>
          <el-option label="实名未通过" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="cmobileno" label="手机号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cnickname" label="昵称" header-align="center" align="center"></el-table-column>
        <el-table-column label="性别" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.igender==1">男</p>
            <p v-else>女</p>
          </template>
        </el-table-column>
        <el-table-column prop="crealname" label="姓名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cbirthday" label="生日" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cidcard" label="身份证号码" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cadddate" label="提交时间" header-align="center" align="center"></el-table-column>
        <!-- <el-table-column label="是否处理" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.iexamine==0">未提交审核</p>
            <p v-else-if="scope.row.iexamine==1">审核通过</p>
            <p v-else-if="scope.row.iexamine==2">审核中</p>
            <p v-else>审核未通过</p>
          </template>
        </el-table-column>-->
        <el-table-column label="审核状态" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.itype==0">未实名</p>
            <p v-else-if="scope.row.itype==1">未处理</p>
            <p v-else-if="scope.row.itype==2">已实名</p>
            <p v-else-if="scope.row.itype==3">实名未通过</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="lookAction(scope.$index, scope.row)" v-show="scope.row.itype == 1">审核
            </el-button>
            <span v-show="scope.row.itype != 1">已审核
            </span>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block p20 tac">
      <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
        :page-size="formInline.pageSize" :current-page.sync="formInline.pageNo" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog width="400px" :visible.sync="imgVisible">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%" />
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
  import {
    loadUserInformationList
  } from "@/request/api";
  export default {
    data() {
      return {
        formInline: {
          startDate: "",
          endDate: "",
          mobileNo: "",
          nickName: "",
          state: "",
          pageNo: 1,
          pageSize: 20
        },
        timer: '',
        imgVisible: false,
        dialogImgUrl: "",
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
        value: "",
        tableData: [],
        total: 0
      };
    },
    methods: {
      getLoadUserInformationList() {
        loadUserInformationList(this.formInline).then(res => {
          this.tableData = res.data.data.list;
          this.total = parseInt(res.data.data.total);
        });
      },
      onSubmit() {
        if (this.formInline.endDate == '' && this.formInline.startDate != '') {
          this.formInline.endDate = this.timer
        }

        this.formInline.pageNo = 1;
        this.getLoadUserInformationList();
      },
      lookAction(index, row) {
        console.log(row);
        this.$router.push({
          path: "/realName/detail",
          query: {
            tel: row.cmobileno,
            nickName: row.cnickname,
            sex: row.igender,
            photo1: row.ccardphoto1,
            photo2: row.ccardphoto2,
            crealname: row.crealname,
            birth: row.cbirthday,
            time: row.cadddate,
            cidcard: row.cidcard,
            userId: row.cuserid
          }
        });
      },
      //点击看大图
      openImg(head) {
        if (head) {
          this.imgVisible = true;
          this.dialogImgUrl = head;
        }
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadUserInformationList();
      },
      //时间选择
      dateFilter(input) {
        var d = new Date(input);
        var year = d.getFullYear();
        var month =
          d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1);
        var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
        return year + "-" + month + "-" + day;
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
      }

    },
    created() {
      this.getLoadUserInformationList();
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

  .el-select {
    width: 120px;
  }

</style>
