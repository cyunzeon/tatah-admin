<template>
  <div class="account-wrap">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="table-wrapper">
            <div class="top-wrap">
              <p>
                <i class="el-icon-user-solid"></i>账号管理
              </p>
              <div>
                <el-button type="primary" @click="showSet = true" icon="el-icon-plus">创建帐号</el-button>
                <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
              </div>
            </div>

            <!-- 表单 -->
            <el-table
              v-loading="loading"
              element-loading-text="加载数据中"
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column label="用户名（ID）" align="center" header-align="center">
                <template slot-scope="scope">{{scope.row.caccount}}({{scope.row.cuserid}})</template>
              </el-table-column>
              <el-table-column label="员工姓名" prop="cusername" align="center" header-align="center"></el-table-column>
              <el-table-column label="注册时间" prop="cadddate" align="center" header-align="center">
                <template></template>
              </el-table-column>
              <el-table-column label="操作" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click="lookAction(scope.row)">查看</el-button>
                  <el-button type="danger" @click="deleteBtn(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              style="margin-top: 16px; text-align:center;"
              layout="total, prev, pager, next"
              :total="total"
              :page-size="listQuery.pageSize"
              :current-page.sync="listQuery.pageNo"
              @current-change="handleCurrentChange"
            ></el-pagination>

            <div class="shade2" v-show="showInfo">
              <div class="shade-wrap">
                <p>账号信息</p>
                <div class="input-wrap">
                  <div class="input-item">用户名：{{infoList.caccount}}</div>
                  <div class="input-item">员工姓名：{{infoList.cusername}}</div>
                  <div class="input-item">
                    登录密码：
                    <template v-if="editPass==false">{{infoList.cpassword}}</template>
                    <template v-else>
                      <el-input v-model="wordPass" placeholder="密码"></el-input>
                    </template>
                  </div>
                  <div class="btn-wrap">
                    <el-button @click="editPass=true" v-if="editPass==false">修改</el-button>
                    <el-button @click="passAction" v-else>确认修改</el-button>
                    <el-button @click="cancelAction">取消</el-button>
                  </div>
                </div>
              </div>
            </div>

            <div class="shade" v-show="showSet">
              <div class="shade-wrap">
                <p>创建账号</p>
                <div class="input-wrap">
                  <div class="input-item">
                    用户名：
                    <el-input v-model="listQuery.account" placeholder></el-input>
                  </div>
                  <div class="input-item">
                    员工姓名：
                    <el-input v-model="listQuery.userName" placeholder></el-input>
                  </div>
                  <div class="input-item">
                    登录密码：
                    <el-input v-model="listQuery.password" placeholder></el-input>
                  </div>
                  <div class="btn-wrap">
                    <el-button @click="setBtn">确认</el-button>
                    <el-button @click="showSet=false">取消</el-button>
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
import { loadAdminList, editUser, delUser } from "@/request/api";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      loading: false,
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        account: "",
        password: "",
        userName: ""
      },
      infoList: "",
      showInfo: false,
      editPass: false,
      showSet: false,
      wordPass: ""
    };
  },
  methods: {
    getLoadAdminList() {
      loadAdminList(this.listQuery).then(res => {
        this.tableData = res.data.data.array;
        this.total = parseInt(res.data.data.totalRows);
      });
    },
    lookAction(row) {
      console.log(row);
      this.infoList = row;
      this.showInfo = true;
    },
    cancelAction() {
      this.showInfo = false;
      this.editPass = false;
    },
    deleteBtn(row) {
      delUser({
        userId: row.cuserid
      }).then(res => {
        if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getLoadAdminList();
          } else {
            this.$message.error(res.data.message);
          }
      })
    },
    handleCurrentChange(value) {
      this.listQuery.pageNo = value;
      this.getLoadAdminList();
    },
    setBtn() {
      if (
        this.listQuery.account != "" &&
        this.listQuery.password != "" &&
        this.listQuery.userName != ""
      ) {
        editUser(this.listQuery).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getLoadAdminList();
            this.showSet = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("请填写正确信息");
      }
    },
    passAction() {
      editUser({
        userId: this.infoList.cuserid,
        account: this.infoList.caccount,
        password: this.wordPass,
        userName: this.infoList.cusername
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.getLoadAdminList();
          this.editPass = false;
          this.showInfo = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  created() {
    this.getLoadAdminList();
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
  width: 180px;
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
    height: 320px;
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
      margin-top: 20px;

      .input-item {
        margin: 10px 0;
        padding-left: 40px;
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

.shade2 {
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
    height: 260px;
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
      margin-top: 20px;

      .input-item {
        margin: 10px 0;
        padding-left: 40px;
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
