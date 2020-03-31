<template>
  <div class="report-wrap">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>充值订单管理
            </p>
            <div>
              <el-button type="primary" icon="el-icon-refresh" @click="refreshBtn">刷新</el-button>
            </div>
          </div>

          <div class="table-wrapper">
            <div class="palette palette-wrap">
              手机号码:
              <el-input v-model="listQuery.mobileNo" />
            </div>
            <div class="palette palette-wrap">
              订单编号:
              <el-input v-model="listQuery.numberId" />
            </div>
            <div class="palette palette-wrap">
              订单状态:
              <el-select v-model="listQuery.state" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="已申请" value="0"></el-option>
                <el-option label="未处理" value="1"></el-option>
                <el-option label="已处理" value="2"></el-option>
                <el-option label="已成功" value="3"></el-option>
              </el-select>
            </div>
            <div class="palette palette-wrap">
              支付网关:
              <el-select v-model="listQuery.wayId" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="苹果内购" value="0"></el-option>
                <el-option label="支付宝" value="1"></el-option>
              </el-select>
            </div>
            <div class="palette palette-wrap">
              时间:
              <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
                v-model="listQuery.startDate" @change="startTimeChang"></el-date-picker>
              <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
                v-model="listQuery.endDate" @change="endTimeChang"></el-date-picker>
            </div>
            <div class="palette palette-wrap">
              <el-button type="primary" @click="handleFilter" icon="el-icon-search">查询</el-button>
              <el-button type="danger" @click="add = true" icon="el-icon-plus">加钻石</el-button>
              <el-button type="danger" @click="reduce = true" icon="el-icon-minus">扣钻石</el-button>
            </div>

            <!-- 表单 -->
            <el-table v-loading="loading" element-loading-text="加载数据中" :data="tableData" border style="width: 100%">
              <!-- <el-table-column label="序号" align="center" header-align="center" width="60">
                <template slot-scope="scope">
                  <span>{{(listQuery.pageNo - 1) * listQuery.pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column> -->
              <el-table-column label="订单编号" fixed prop="cbatchno" align="center" header-align="center" width="130">
                <template></template>
              </el-table-column>
              <el-table-column label="状态" align="center" header-align="center" width="70">
                <template slot-scope="scope">
                  <p v-if="scope.row.istate == 0">已申请</p>
                  <p v-else-if="scope.row.istate == 1">未处理</p>
                  <p v-else-if="scope.row.istate == 2">已处理</p>
                  <p v-else-if="scope.row.istate == 3">已成功</p>
                  <p v-else></p>
                </template>
              </el-table-column>
              <el-table-column label="手机号码" prop="cmobileno" align="center" header-align="center" width="100">
                <template></template>
              </el-table-column>
              <el-table-column label="充值金额" prop="imoney" align="center" header-align="center" width="80">
                <template></template>
              </el-table-column>
              <el-table-column label="手续费" prop="irate" align="center" header-align="center" width="80">
                <template></template>
              </el-table-column>
              <el-table-column label="进账钻石" prop="idiamond" align="center" header-align="center" width="80">
                <template></template>
              </el-table-column>
              <el-table-column label="支付网关" prop="iway" align="center" header-align="center" width="90">
              </el-table-column>
              <el-table-column label="充值时间" prop="ccashdate" align="center" header-align="center" width="134">
                <template></template>
              </el-table-column>
              <el-table-column label="到账时间" prop="carrivaldate" align="center" header-align="center" width="134">
              </el-table-column>
              <el-table-column label="申请补单时间" prop="sheetime" align="center" header-align="center" width="134">
              </el-table-column>
              <el-table-column label="申请补单人" prop="crepaname" align="center" header-align="center" width="100">
              </el-table-column>
              <el-table-column label="处理人" prop="carrivaldate" align="center" header-align="center" width="70">
              </el-table-column>
              <el-table-column label="备注" prop="cmemo" align="center" header-align="center">
                <template></template>
              </el-table-column>
              <el-table-column label="来源" prop="cfrom" align="center" header-align="center" width="70">
                <template></template>
              </el-table-column>
              <el-table-column label="支付商号" prop="cmctid" align="center" header-align="center" width="90">
                <template></template>
              </el-table-column>
              <el-table-column label="操作" align="center" header-align="center" width="120">
                <template slot-scope="scope">
                  <el-button type="primary" @click="applyBtn(scope.row)" v-if="scope.row.sheetstate == 1">
                    申请补单
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
              :page-size="listQuery.pageSize" :current-page.sync="listQuery.pageNo"
              @current-change="handleCurrentChange"></el-pagination>

            <div class="shade" v-show="add">
              <div class="shade-wrap">
                <p>加钻石</p>
                <div class="input-wrap">
                  <div class="input-item">
                    手机号码：
                    <el-input v-model="addList.mobileNo" placeholder></el-input>
                  </div>
                  <div class="input-item">
                    钻石数量：
                    <el-input v-model="addList.diamonds" placeholder></el-input>
                  </div>
                  <div class="input-item">
                    备注：
                    <el-input v-model="addList.mone" placeholder></el-input>
                  </div>
                  <div class="btn-wrap">
                    <el-button @click="addBtn">确认</el-button>
                    <el-button @click="cancelBtn">取消</el-button>
                  </div>
                </div>
              </div>
            </div>

            <div class="shade" v-show="reduce">
              <div class="shade-wrap">
                <p>扣钻石</p>
                <div class="input-wrap">
                  <div class="input-item">
                    手机号码：
                    <el-input v-model="addList.mobileNo" placeholder></el-input>
                  </div>
                  <div class="input-item">
                    钻石数量：
                    <el-input v-model="addList.diamonds" placeholder></el-input>
                  </div>
                  <div class="input-item">
                    备注：
                    <el-input v-model="addList.mone" placeholder></el-input>
                  </div>
                  <div class="btn-wrap">
                    <el-button @click="reduceBtn">确认</el-button>
                    <el-button @click="cancelBtn">取消</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    loadRechargeList,
    addRecharge,
    subtractRecharge,
    operationRecharge
  } from "@/request/api";
  export default {
    created() {
      this.getLoadRechargeList();
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
        add: false,
        reduce: false,
        total: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          approval: 1,
          mobileNo: "",
          numberId: "",
          startDate: "",
          endDate: "",
          wayId: "",
          state: "",
          numberId: ""
        },
        addList: {
          mobileNo: "",
          mone: "",
          diamonds: ""
        },
        time: "",
        timer: "",
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
      };
    },
    methods: {
      applyBtn(row) {
        operationRecharge({
          irechargeid: row.irechargeid,
          type:1
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getLoadRechargeList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      handleFilter() {
        if (this.listQuery.endDate == '' && this.listQuery.startDate != '') {
          this.listQuery.endDate = this.timer
        }
        this.listQuery.pageNo = 1;
        this.getLoadRechargeList();
      },
      addBtn() {
        addRecharge(this.addList).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.add = false;
            this.addList.mobileNo = "";
            this.addList.mone = "";
            this.addList.diamonds = "";
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      cancelBtn() {
        this.add = false;
        this.reduce = false;
        this.addList.mobileNo = "";
        this.addList.mone = "";
        this.addList.diamonds = "";
      },
      reduceBtn() {
        subtractRecharge(this.addList).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.reduce = false;
            this.addList.mobileNo = "";
            this.addList.mone = "";
            this.addList.diamonds = "";
          } else {
            this.$message.error(res.message);
          }
        });
      },
      refreshBtn() {
        this.getLoadRechargeList();
      },
      getLoadRechargeList() {
        loadRechargeList(this.listQuery).then(res => {
          this.tableData = res.data.data.list;
          this.total = parseInt(res.data.data.total);
        });
      },
      handleCurrentChange(value) {
        this.listQuery.pageNo = value;
        this.getLoadRechargeList();
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
      }
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
    padding: 10px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .palette {
    margin-bottom: 8px;
    float: left;
  }

  .palette-wrap {
    margin-left: 40px;
  }

  .el-input {
    margin-left: 20px;
    width: 150px;
  }

  .el-select {
    margin-left: 20px;
    width: 140px;
  }

  .shade {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 101;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: block;

    .shade-wrap {
      width: 400px;
      background: #fff;
      margin: 60px auto;
      border-radius: 5px;

      p {
        display: block;
        height: 30px;
        line-height: 30px;
        background: #409eff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: #fff;
        padding-left: 20px;
      }

      .input-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .input-item {
          margin: 10px 0;
        }

        .btn-wrap {
          width: 100%;
          display: flex;
          margin-bottom: 20px;
          justify-content: space-around;
        }
      }
    }
  }

</style>
