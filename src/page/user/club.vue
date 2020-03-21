<template>
  <div class="bg_fff">
    <h3 class="title"><i class="el-icon-user-solid"></i>俱乐部管理</h3>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="俱乐部名称：">
        <el-input v-model="formInline.groupName" placeholder="俱乐部名称"></el-input>
      </el-form-item>
      <el-form-item label="俱乐部创建人：">
        <el-input v-model="formInline.ownerName" placeholder="俱乐部创建人"></el-input>
      </el-form-item>
      <el-form-item label="创建日期：">
        <div class="block">
          <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
            v-model="formInline.startDate" @change="startTimeChang"></el-date-picker>
          <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
            v-model="formInline.endDate" @change="endTimeChang"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="俱乐部状态：">
        <el-select v-model="formInline.state" placeholder="请选择俱乐部状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="解散" value="0"></el-option>
          <el-option label="冻结" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="cgroupname" label="俱乐部名称" width="110" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cnickname" label="俱乐部创建人" width="130" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cgroupnotice" label="俱乐部公告" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="iredpacketnum" label="每日礼物数量（钻石/人）" width="120" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="isendhour" label="礼物发放时间" width="120" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="itotalnum" label="累计送出礼物（钻石）" width="170" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cadddate" label="创建时间" width="150" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="俱乐部状态" width="100" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.istate == 0">解散</p>
            <p v-else-if="scope.row.istate == 1">正常</p>
            <p v-else-if="scope.row.istate == 2">冻结</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="lookAction(scope.$index, scope.row)">查看</el-button>
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
    loadGroupList
  } from '@/request/api'
  export default {
    data() {
      return {
        formInline: {
          pageNo: 1,
          pageSize: 20,
          groupName: '',
          ownerName: '',
          state: '',
          startDate: '',
          endDate: ''
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
        timer: '',
        tableData: []
      }
    },
    methods: {
      getLoadGroupList() {
        loadGroupList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
          this.total = parseInt(res.data.data.total);
          }
        })
      },
      lookAction(index, row) {
        this.$router.push({
          path: '/userClub/detail',
          query: {
            cgroupname: row.cgroupname,
            cnickname: row.cnickname,
            istate: row.istate,
            cadddate: row.cadddate,
            isendhour: row.isendhour,
            iredpacketnum: row.iredpacketnum,
            cgroupnotice: row.cgroupnotice,
            itotalnum: row.itotalnum,
            ipersoncount: row.ipersoncount,
            cgroupid: row.cgroupid
          }
        })
      },
      onSubmit() {
        if(this.formInline.endDate == '' && this.formInline.startDate != '') {
          this.formInline.endDate = this.timer
        }
        this.formInline.pageNo = 1;
        this.getLoadGroupList();
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadGroupList();
      },
      //时间选择
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
      this.getLoadGroupList();
      setInterval(this.getTime, 1000);
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  };

</script>
<style lang='less' scoped>
  .demo-form-inline {
    text-align: left;
    padding: 5px;
  }

</style>

