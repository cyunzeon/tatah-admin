<template>
  <div class="bg_fff main">
    <h3 class="title"><i class="el-icon-user-solid"></i>见面聚会管理</h3>
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
        <el-form-item label="聚会状态：">
          <el-select v-model="formInline.state" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="进行中" value="0"></el-option>
            <el-option label="已取消" value="2"></el-option>
            <el-option label="已结束" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否处理：">
          <el-select v-model="formInline.handle" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未处理" value="0"></el-option>
            <el-option label="已处理" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="审核状态：">
          <el-select v-model="formInline.state" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="已审核通过" value="1"></el-option>
            <el-option label="未通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="title" label="聚会主题" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="nickName" label="发起人" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cadddate" label="聚会时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="place" label="聚会地点" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="是否提供机票" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.welfare == 1">提供</p>
            <p v-else-if="scope.row.welfare == 0">不提供</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="邀请人数" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="diamonds" label="聚会奖励" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="introduce" label="聚会介绍" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="聚会状态" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.istate==0">进行中</p>
            <p v-else-if="scope.row.istate==1">已结束</p>
            <p v-else-if="scope.row.istate==2">已取消</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否处理" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.handle==0">未审核</p>
            <p v-else-if="scope.row.handle==1">已审核</p>
            <p v-else></p>
          </template>
        </el-table-column> -->
        <el-table-column label="审核状态" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.systemtype==0">未审核</p>
            <p v-else-if="scope.row.systemtype==1">已审核通过</p>
            <p v-else-if="scope.row.systemtype==2">未通过</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.handle==1">
              <el-button @click="passBtn(scope.$index, scope.row)">编辑</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="delAction(scope.$index, scope.row)">审核</el-button>
            </template>
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
    findAllParty,
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
          state: '',
          handle:'',
          systemtype: ''
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
        timer: ''
      }
    },
    methods: {
      getFindAllParty() {
        findAllParty(this.formInline).then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data)
            this.total = parseInt(res.data.data.total);
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
        this.getFindAllParty()
      },
      passBtn(index, row) {
        this.$router.push({
          path: '/party/edit',
          query: {
            ipartyid: row.ipartyid
          }
        })
      },
      delAction(index, row) {
        this.$router.push({
          path: '/party/detail',
          query: {
            ipartyid: row.ipartyid
          }
        })
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getFindAllParty();
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
      onSubmit() {
        if(this.formInline.endDate == '' && this.formInline.startDate != '') {
          this.formInline.endDate = this.timer
        }
        this.getFindAllParty();
      }
    },
    created() {
      this.getFindAllParty();
      setInterval(this.getTime, 1000);
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  };

</script>

<style lang="scss" scoped>
  .el-select {
    width: 120px;
  }

</style>
