<template>
  <div class="cash-wrap">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>提现订单管理
            </p>
            <div>
              <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
            </div>
          </div>

          <div class="table-wrapper">
            <div class="palette palette-wrap">
              手机号码:
              <el-input v-model="listQuery.mobileNo" />
            </div>
            <div class="palette palette-wrap">
              订单状态:
              <el-select v-model="listQuery.state" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="已申请" value="0"></el-option>
                <el-option label="已处理" value="1"></el-option>
              </el-select>
            </div>
            <div class="palette palette-wrap">
              是否处理:
              <el-select v-model="listQuery.success" placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="未处理" value="0"></el-option>
                <el-option label="提款成功" value="1"></el-option>
                <el-option label="拒绝提款" value="2"></el-option>
                <el-option label="银行处理失败" value="3"></el-option>
                <el-option label="银行批复中" value="4"></el-option>
              </el-select>
            </div>
            <div class="palette palette-wrap">
              时间:
              <el-date-picker
                type="date"
                placeholder="选择开始日期"
                :picker-options="pickerOptionsStart"
                v-model="listQuery.startDate"
                @change="startTimeChang"
              ></el-date-picker>
              <el-date-picker
                type="date"
                placeholder="选择结束日期"
                :picker-options="pickerOptionsOver"
                v-model="listQuery.endDate"
                @change="endTimeChang"
              ></el-date-picker>
            </div>
            <div class="palette palette-wrap">
              <el-button type="primary" @click="handleFilter" icon="el-icon-search">查询</el-button>
            </div>

            <!-- 表单 -->
            <el-table
              v-loading="loading"
              element-loading-text="加载数据中"
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column label="序号" align="center" header-align="center" width="60">
                <template slot-scope="scope">
                  <span>{{(listQuery.pageNo - 1) * listQuery.pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="订单编号"
                prop="cbatchno"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                label="手机号码"
                prop="cmobileno"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                label="提现金额"
                prop="imoney"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                label="用户姓名"
                prop="crealname"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column label="省份" prop align="center" header-align="center" width="160"></el-table-column>
              <el-table-column label="城市" prop align="center" header-align="center" width="160"></el-table-column>
              <el-table-column
                label="银行名称"
                prop="cbankname"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                label="支行名称"
                prop="cbankbranchname"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                label="银行卡号"
                prop="cbankcard"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                label="提款渠道"
                prop="repaymoney"
                align="center"
                header-align="center"
                width="160"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.itype == 0">提款到银行</p>
                  <p v-else>提款到支付宝</p>
                </template>
              </el-table-column>
              <el-table-column
                label="提款时间"
                prop="ccashdate"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                label="处理时间"
                prop="cconfdate"
                align="center"
                header-align="center"
                width="160"
              ></el-table-column>
              <el-table-column label="是否处理" align="center" header-align="center" width="160">
                <template slot-scope="scope">
                  <p v-if="scope.row.isuccess == 0">未处理</p>
                  <p v-else-if="scope.row.isuccess == 1">提款成功</p>
                  <p v-else-if="scope.row.isuccess == 2">拒绝提款</p>
                  <p v-else-if="scope.row.isuccess == 3">银行处理失败</p>
                  <p v-else>银行批复中</p>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" align="center" header-align="center" width="160">
                <template slot-scope="scope">
                  <p v-if="scope.row.istate == 0">已申请</p>
                  <p v-else>已处理</p>
                </template>
              </el-table-column>
              <el-table-column
                label="处理人"
                prop="coperator"
                align="center"
                header-align="center"
                width="160"
              >
                <template></template>
              </el-table-column>
              <el-table-column label="操作" align="center" header-align="center" width="160">
                <template slot-scope="scope" v-show="scope.row.isuccess == 0">
                  <el-button type="primary" @click="tailBtn(scope.$index, scope.row)">处理</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              style="margin-top: 16px; text-align:center;"
              layout="total, prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            ></el-pagination>

            <div class="shade" v-show="showCash">
              <div class="shade-wrap">
                <p>提现处理</p>
                <div class="input-wrap">
                  <div class="input-item">用户姓名：{{cashList.crealname}}</div>
                  <div class="input-item">身份证号：</div>
                  <div class="input-item">银行卡号：{{cashList.cbankcard}}</div>
                  <div class="input-item">银行名称：{{cashList.cbankname}}</div>
                  <div class="input-item">支行名称：{{cashList.cbankbranchname}}</div>
                  <div class="input-item">提现金额：{{cashList.imoney}}</div>
                  <div class="btn-wrap">
                    <el-button @click="agreeBtn">同意提款</el-button>
                    <el-button @click="nagreeBtn">拒绝提款</el-button>
                    <el-button @click="showCash=false">取消</el-button>
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
import { loadUserCashList, operationUserCash } from "@/request/api";
export default {
  created() {
    this.getLoadUserCashList();
  },
  data() {
    return {
      tableData: [],
      cashList: {
        numberId: "",
        cashId: "",
        state: "",
        crealname: '',
        cmobileno: '',
        cbankcard: '',
        cbankname: '',
        cbankbranchname: '',
        imoney: ''
      },
      loading: false,
      showCash: false,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        mobileNo: "",
        numberId: "",
        startDate: "",
        endDate: "",
        success: "",
        state: ""
      },
      time: "",
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
    getLoadUserCashList() {
      loadUserCashList(this.listQuery).then(res => {
        this.tableData = res.data.data;
      });
    },
    agreeBtn() {
      operationUserCash({
        numberId: this.cashList.numberId,
        cashId: this.cashList.cashId,
        state: 1
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.getLoadUserCashList();
          this.showCash = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    nagreeBtn() {
      operationUserCash({
        numberId: this.cashList.numberId,
        cashId: this.cashList.cashId,
        state: 2
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.getLoadUserCashList();
          this.showCash = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    tailBtn(index, row) {
      this.cashList.numberId = row.icashid;
      this.cashList.cashId = row.CBATCHNO;
      this.cashList.state = row.istate;
      this.cashList.crealname = row.crealname;
      this.cashList.cmobileno = row.cmobileno;
      this.cashList.cbankcard = row.cbankcard;
      this.cashList.cbankname = row.cbankname;
      this.cashList.cbankbranchname = row.cbankbranchname;
      this.cashList.imoney = row.imoney;
      this.$set(this.showCash, index, true);
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.getLoadUserCashList();
    },
    handleCurrentChange(value) {
      this.listQuery.pageNo = value;
      this.getLoadUserCashList();
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
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

      .input-item {
        margin: 10px 0;
        padding-left: 130px;
      }

      .btn-wrap {
        width: 100%;
        display: flex;
        margin: 20px 0;
        justify-content: space-around;
      }
    }
  }
}
</style>
