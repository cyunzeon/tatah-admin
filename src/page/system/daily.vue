<template>
  <div class='daily-wrap'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>系统日志
            </p>
            <div>
              <el-button type="primary" icon="el-icon-refresh" @click="refreshAction">
                刷新
              </el-button>
            </div>
          </div>
      
          <div class="table-wrapper">
            <div class="palette palette-wrap">
              用户名:
              <el-input v-model="listQuery.account" />
            </div>
            <div class="palette palette-wrap">
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
              <el-table-column label="用户名" prop="account" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="员工姓名" prop="userName" align="center" header-align="center">
              </el-table-column>
              <el-table-column label="类型" prop="type" align="center" header-align="center">
              </el-table-column>
              <el-table-column label="操作内容" prop="memo" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="操作时间" prop="adddate" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="IP" prop="ipaddr" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
            style="margin-top: 16px; text-align:center;"
            layout="total, prev, pager, next"
            :total="total"
            :page-size="listQuery.pageSize"
            :current-page.sync="listQuery.pageNo"
            @current-change="handleCurrentChange"
          ></el-pagination>
                </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { loadAdminlogList } from '@/request/api';
  export default {
    data() {
      return {
        tableData: [],
        loading: false,
        total: 0,
        dialogFormVisible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          account: '',
          nickName: '',
          startDate: '',
          endDate: ''
        },
        time: '',
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
        this.listQuery.pageNo = 1;
        this.getLoadAdminlogList();
      },
      getLoadAdminlogList() {
        loadAdminlogList(this.listQuery).then(res => {
          this.tableData = res.data.data.list;
          this.total = parseInt(res.data.data.total);
        })
      },
      refreshAction() {
        this.getLoadAdminlogList();
      },
      handleCurrentChange(value) {
        this.listQuery.pageNo = value;
        this.getLoadAdminlogList();
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
      }
    },
    created() {
      this.getLoadAdminlogList();
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

  .top-wrap {
      width: 97.8%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 10px 20px;
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
