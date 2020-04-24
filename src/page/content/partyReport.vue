<template>
  <div class='report-wrap'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>聚会投诉管理
            </p>
            <div>
              <el-button type="primary" icon="el-icon-refresh" @click="refreshAction">
                刷新
              </el-button>
            </div>
          </div>

          <div class="table-wrapper">
            <div class="palette palette-wrap">
              手机号码:
              <el-input v-model="listQuery.mobileNo" />
            </div>
            <div class="palette palette-wrap">
              昵称:
              <el-input v-model="listQuery.strName" />
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
              <el-table-column label="举报人手机号" prop="cmobilenoOne" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="被举报人手机号" prop="cmobilenoTwo" align="center" header-align="center">
              </el-table-column>
              <el-table-column label="举报时间" prop="cadddate" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="被举报类型" align="center" header-align="center">
                <template slot-scope="scope">
                  <p v-for="item in scope.row.cmobilenoTwo" :key="item.index">
                    <span v-if="item == 1">未能准时参加见面聚会</span>
                    <span v-else-if="item == 2">未参加见面聚会</span>
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
    findAllUpc
  } from '@/request/api'
  export default {
    created() {
      this.getFindAllUpc();
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
          mobileNo: '',
          strName: '',
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
        this.getFindAllUpc();
      },
      getFindAllUpc() {
        findAllUpc(this.listQuery).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.total = parseInt(res.data.data.total);
          }
        })
      },
      lookAction(index, row) {
        this.$router.push({
          path: '/partyReport/detail',
          query: {
            ipartycptid: row.ipartycptid
          }
        })
      },
      refreshAction() {
        this.getFindAllUpc();
      },
      handleCurrentChange(value) {
        this.listQuery.pageNo = value;
        this.getFindAllUpc();
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
