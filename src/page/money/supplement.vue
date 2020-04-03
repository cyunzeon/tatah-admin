<template>
  <div class='daily-wrap'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div class="table-wrapper">
            <div class="top-wrap">
              <p>
                <i class="el-icon-user-solid"></i>订单补单审核
              </p>
              <div>
                <el-button type="primary" icon="el-icon-refresh" @click="refreshAction">
                  刷新
                </el-button>
              </div>
            </div>

            <!-- 表单 -->
            <el-table v-loading="loading" element-loading-text="加载数据中" :data='tableData' border style="width: 100%">
              <el-table-column label="序号" prop="statday" align="center" header-align="center">
                <template slot-scope="scope">
                  <span>{{(listQuery.pageNo - 1) * listQuery.pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单编号" prop="cbatchno" align="center" header-align="center">
              </el-table-column>
              <el-table-column label="手机号码" prop="cmobileno" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="充值金额" prop="imoney" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="手续费" prop="irate" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="进账钻石" prop="idiamond" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="支付网关" prop="iway" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="充值时间" prop="ccashdate" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="申请补单人" prop="crepaname" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="申请补单时间" prop="sheetime" align="center" header-align="center">
                <template>
                </template>
              </el-table-column>
              <el-table-column label="操作" prop="repaymoney" align="center" header-align="center" width="180">
                <template slot-scope="scope">
                  <el-button type="primary" @click="agreeBtn(scope.row)">
                    同意
                  </el-button>
                  <el-button type="danger" @click="rejectBtn(scope.row)">
                    拒绝
                  </el-button>
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
    loadRechargeList,
    operationRecharge
  } from '@/request/api'
  export default {
    created() {
      this.getLoadRechargeList();
    },
    data() {
      return {
        tableData: [],
        loading: false,
        total: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          approval: 2
        }
      }
    },
    methods: {
      handleFilter() {
        this.listQuery.pageNo = 1;
        this.getLoadRechargeList();
      },
      getLoadRechargeList() {
        loadRechargeList(this.listQuery).then(res => {
          this.tableData = res.data.data.list;
          this.total = parseInt(res.data.data.total);
        })
      },
      refreshAction() {
        this.getLoadRechargeList();
      },
      agreeBtn(row) {
          operationRecharge({
            type:2,
            irechargeid: row.irechargeid,
            state: 1,
            imoney: row.imoney,
            crepairuid: row.crepairuid,
            userId: row.cuserid
          }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadRechargeList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      rejectBtn(row) {
          operationRecharge({
            type:2,
            irechargeid: row.irechargeid,
            state: 2,
            imoney: row.imoney,
            crepairuid: row.crepairuid
          }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadRechargeList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      handleCurrentChange(value) {
        this.listQuery.pageNo = value;
        this.getLoadRechargeList();
      }
    }
  }

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
