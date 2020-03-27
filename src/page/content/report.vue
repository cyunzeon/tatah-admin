<template>
  <div class='report-wrap'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>举报管理
            </p>
            <div>
              <el-button type="primary" icon="el-icon-refresh" @click="refreshAction">
                刷新
              </el-button>
            </div>
          </div>

          <div class="table-wrapper">
            <div class="palette palette-wrap">
              被举报人手机号码:
              <el-input v-model="listQuery.bjbrMobileNo" />
            </div>
            <div class="palette palette-wrap">
              举报人手机号:
              <el-input v-model="listQuery.jbrMobileNo" />
            </div>
            <div class="palette palette-wrap">
              举报时间:
              <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
                v-model="listQuery.startDate" @change="startTimeChang"></el-date-picker>
              <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
                v-model="listQuery.endDate" @change="endTimeChang"></el-date-picker>
            </div>
            <div class="palette palette-wrap">
              <el-button type="primary" @click="handleFilter" icon="el-icon-search">
                查询
              </el-button>
            </div>

            <!-- 表单 -->
            <el-table v-loading="loading" element-loading-text="加载数据中" :data='tableData' border style="width: 100%">
              <el-table-column label="举报人" prop="cmobileno" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="被举报人" prop="crmobileno" align="center" header-align="center">
              </el-table-column>
              <el-table-column label="举报时间" prop="cadddate" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="被举报类型" align="center" header-align="center">
                <template slot-scope="scope">
                  <!-- <template v-if="scope.row.istate.split(',')[0] != ''">
                    <span v-if="scope.row.istate.split(',')[0] == 1">头像、资料作假</span>
                    <span v-else-if="scope.row.istate.split(',')[0] == 2">骚扰广告</span>
                    <span v-else-if="scope.row.istate.split(',')[0] == 3">诈骗、托</span>
                    <span v-else-if="scope.row.istate.split(',')[0] == 4">恶意骚扰、不文明语言</span>
                    <span v-else-if="scope.row.istate.split(',')[0] == 5">发广告或推广消息</span>
                    <span v-else-if="scope.row.istate.split(',')[0] == 6">色情低俗</span>
                    <span v-else></span>
                  </template>
                  <template v-if="scope.row.istate.split(',')[1] != ''">
                    <span v-if="scope.row.istate.split(',')[1] == 1">,头像、资料作假</span>
                    <span v-else-if="scope.row.istate.split(',')[1] == 2">,骚扰广告</span>
                    <span v-else-if="scope.row.istate.split(',')[1] == 3">,诈骗、托</span>
                    <span v-else-if="scope.row.istate.split(',')[1] == 4">,恶意骚扰、不文明语言</span>
                    <span v-else-if="scope.row.istate.split(',')[1] == 5">,发广告或推广消息</span>
                    <span v-else-if="scope.row.istate.split(',')[1] == 6">,色情低俗</span>
                    <span v-else></span>
                  </template>
                  <template v-if="scope.row.istate.split(',')[2] != ''">
                    <span v-if="scope.row.istate.split(',')[2] == 1">,头像、资料作假</span>
                    <span v-else-if="scope.row.istate.split(',')[2] == 2">,骚扰广告</span>
                    <span v-else-if="scope.row.istate.split(',')[2] == 3">,诈骗、托</span>
                    <span v-else-if="scope.row.istate.split(',')[2] == 4">,恶意骚扰、不文明语言</span>
                    <span v-else-if="scope.row.istate.split(',')[2] == 5">,发广告或推广消息</span>
                    <span v-else-if="scope.row.istate.split(',')[2] == 6">,色情低俗</span>
                    <span v-else></span>
                  </template>
                  <template v-if="scope.row.istate.split(',')[3] != ''">
                    <span v-if="scope.row.istate.split(',')[3] == 1">,头像、资料作假</span>
                    <span v-else-if="scope.row.istate.split(',')[3] == 2">,骚扰广告</span>
                    <span v-else-if="scope.row.istate.split(',')[3] == 3">,诈骗、托</span>
                    <span v-else-if="scope.row.istate.split(',')[3] == 4">,恶意骚扰、不文明语言</span>
                    <span v-else-if="scope.row.istate.split(',')[3] == 5">,发广告或推广消息</span>
                    <span v-else-if="scope.row.istate.split(',')[3] == 6">,色情低俗</span>
                    <span v-else></span>
                  </template>
                  <template v-if="scope.row.istate.split(',')[4] != ''">
                    <span v-if="scope.row.istate.split(',')[4] == 1">,头像、资料作假</span>
                    <span v-else-if="scope.row.istate.split(',')[4] == 2">,骚扰广告</span>
                    <span v-else-if="scope.row.istate.split(',')[4] == 3">,诈骗、托</span>
                    <span v-else-if="scope.row.istate.split(',')[4] == 4">,恶意骚扰、不文明语言</span>
                    <span v-else-if="scope.row.istate.split(',')[4] == 5">,发广告或推广消息</span>
                    <span v-else-if="scope.row.istate.split(',')[4] == 6">,色情低俗</span>
                    <span v-else></span>
                  </template>
                  <template v-if="scope.row.istate.split(',')[5] != ''">
                    <span v-if="scope.row.istate.split(',')[5] == 1">,头像、资料作假</span>
                    <span v-else-if="scope.row.istate.split(',')[5] == 2">,骚扰广告</span>
                    <span v-else-if="scope.row.istate.split(',')[5] == 3">,诈骗、托</span>
                    <span v-else-if="scope.row.istate.split(',')[5] == 4">,恶意骚扰、不文明语言</span>
                    <span v-else-if="scope.row.istate.split(',')[5] == 5">,发广告或推广消息</span>
                    <span v-else-if="scope.row.istate.split(',')[5] == 6">,色情低俗</span>
                    <span v-else></span>
                  </template> -->

                  <p v-for="item in scope.row.istate" :key="item.index">
                    <span v-if="item == 1">头像、资料作假</span>
                    <span v-else-if="item == 2">骚扰广告</span>
                    <span v-else-if="item == 3">诈骗、托</span>
                    <span v-else-if="item == 4">恶意骚扰、不文明语言</span>
                    <span v-else-if="item == 5">发广告或推广消息</span>
                    <span v-else-if="item == 6">色情低俗</span>
                    <span v-else></span>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click="lookAction(scope.$index, scope.row)">查看</el-button>
                </template>
                <template>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
              :page-size="listQuery.pageSize" :current-page.sync="listQuery.pageNo"
              @current-change="handleCurrentChange"></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    loadUserReportList
  } from '@/request/api'
  export default {
    created() {
      this.getLoadUserReportList();
      setInterval(this.getTime, 1000);
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    data() {
      return {
        tableData: [],
        loading: false,
        total: 0,
        dialogFormVisible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          jbrMobileNo: '',
          bjbrMobileNo: '',
          portraitType: '',
          endDate: '',
          startDate: ''
        },
        time: '',
        timer: '',
        //
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        },
        pickerOptionsOver: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        }
      }
    },
    methods: {
      handleFilter() {
        if (this.listQuery.endDate == '' && this.listQuery.startDate != '') {
          this.listQuery.endDate = this.timer
        }
        this.listQuery.pageNo = 1;
        this.getLoadUserReportList();
      },
      getLoadUserReportList() {
        loadUserReportList(this.listQuery).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.total = parseInt(res.data.data.total);
          }
        })
      },
      lookAction(index, row) {
        this.$router.push({
          path: '/report/detail',
          query: {
            jbrMobileNo: row.cmobileno,
            bjbrMobileNo: row.crmobileno,
            cadddate: row.cadddate,
            reportimg: row.creportimg,
            state: row.state
          }
        })
      },
      refreshAction() {
        this.getLoadUserReportList();
      },
      handleCurrentChange(value) {
        this.listQuery.pageNo = value;
        this.getLoadUserReportList();
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
        this.listQuery.startDate = startTime;
      },
      endTimeChang(val) {
        let endTime = this.dateFilter(val);
        this.listQuery.endDate = endTime;
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
    }
  };

</script>
<style lang='scss' scoped>
  .basic {
    .el-table {
      .warning-row {
        background-color: oldlace;
      }
    }

    .recommend-tag {
      display: inline-block;
      margin: 4px 0;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .top-wrap {
    width: 97.8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 6px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .palette {
    margin-bottom: 8px;
    float: left
  }

  .palette-wrap {
    margin-left: 40px;
  }

  .el-input {
    margin-left: 20px;
    width: 180px
  }

</style>
