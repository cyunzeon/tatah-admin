<template>
  <div class="gift-wrap">

    <el-row>
      <el-col :span='24'>
        <el-card>
          <h3 class="title">
            <i class="el-icon-user-solid"></i>冒险游戏
          </h3>

          <div class="refresh-btn">
            <el-button type="primary" icon="el-icon-plus" @click="showAdd=true">添加任务</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refreshBtn">刷新</el-button>
          </div>

          <el-table :data="tableData" stripe border style="width: 100%" highlight-current-row>
            <el-table-column label="序号" width="120" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{(form.pageNo - 1) * form.pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ccontent" label="任务" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="cupdatetime" label="更新时间" header-align="center" align="center">
            </el-table-column>
            <!-- <el-table-column label="状态" header-align="center" align="center">
              <template slot-scope="scope">
                <p v-if="scope.row.exstate == 0">下架</p>
                <p v-else-if="scope.row.exstate == 1">上架</p>
                <p v-else></p>
              </template>
            </el-table-column> -->
            <el-table-column prop="coperator" label="发布人" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="lookAction(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" @click="delAction(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
            :page-size="form.pageSize" :current-page.sync="form.pageNo" @current-change="handleCurrentChange">
          </el-pagination>


          <div class="shade2" v-show="showLook">
            <div class="shade-wrap">
              <p>查看任务</p>
              <div class="input-wrap">
                <div class="input-item">
                  <span>任务内容：</span>
                  <el-input v-model="editForm.ccontent"></el-input>
                </div>
                <div class="btn-wrap">
                  <el-button @click="agreeBtn">确认</el-button>
                  <el-button @click="cancelBtn">取消</el-button>
                </div>
              </div>
            </div>
          </div>

          <div class="shade2" v-show="showAdd">
            <div class="shade-wrap">
              <p>添加任务</p>
              <div class="input-wrap">
                <div class="input-item">
                  任务内容：<el-input v-model="addForm.ccontent" placeholder="请填写内容"></el-input>
                </div>
                <div class="btn-wrap">
                  <el-button @click="addBtn">确认</el-button>
                  <el-button @click="cancelBtn">取消</el-button>
                </div>
              </div>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>]

<script>
  import {
    loadAdventureTaskList,
    editAdventureByCtastId
  } from '@/request/api'
  export default {
    data() {
      return {
        total: 0,
        tableData: [],
        form: {
          pageNo: 1,
          pageSize: 20
        },
        editForm: {
          ctitleid: '',
          ccontent: '',
          type: 1
        },
        addForm: {
          ccontent: '',
          type: 3
        },
        showLook: false,
        showAdd: false,
        placeholder: ''
      }
    },
    methods: {
      refreshBtn() {
        this.getLoadAdventureTaskList();
      },
      lookAction(index, row) {
        this.editForm.ctitleid = row.ctitleid,
          this.editForm.state = row.exstate,
          this.editForm.ccontent = row.ccontent
        console.log(row.exstate)
        if (row.exstate == 0) {
          this.placeholder = '下架'
        } else if (row.exstate == 1) {
          this.placeholder = '上架'
        } else {
          this.placeholder = ''
        }
        this.showLook = true;
      },
      agreeBtn() {
        editAdventureByCtastId(this.editForm).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.showLook = false;
            this.getLoadAdventureTaskList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      delAction(row) {
        editAdventureByCtastId({
          type: 2,
          ctitleid: row.ctitleid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadAdventureTaskList();
          } else {
            this.$message.error(res.data.message);
          }

        })
      },
      cancelBtn() {
        this.editForm.ccontent = '';
        this.editForm.state = '';
        this.addForm.ccontent = '';
        this.addForm.state = '';
        this.showLook = false;
        this.showAdd = false;
      },
      addBtn() {
        editAdventureByCtastId(this.addForm).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.showAdd = false;
            this.addForm.ccontent = '';
            this.addForm.state = '';
            this.getLoadAdventureTaskList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      getLoadAdventureTaskList() {
        loadAdventureTaskList(this.form).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.total = parseInt(res.data.data.total);
          }
        })
      },
      //分页器
      handleCurrentChange(pgno) {
        this.form.pageNo = pgno;
        this.getLoadAdventureTaskList();
      }
    },
    created() {
      this.getLoadAdventureTaskList()
    }
  }

</script>

<style lang="scss" scoped>
  .gift-wrap {
    .refresh-btn {
      float: right;
      margin-bottom: 20px;
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
      background: rgba(0, 0, 0, .5);
      display: block;

      .shade-wrap {
        width: 400px;
        background: #fff;
        margin: 100px auto;
        border-radius: 5px;

        p {
          display: block;
          height: 30px;
          line-height: 30px;
          background: #409EFF;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          color: #fff;
          padding-left: 20px;
        }

        .input-wrap {
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;

          .input-item {
            width: 100%;
            margin: 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .el-select {
              width: 120px;
            }

            .el-input {
              width: 200px;
            }

            img {
              width: 100px;
              height: 100px;
            }
          }

          .input-item:nth-of-type(4),
          .input-item:nth-of-type(5) {
            margin-left: -56px;
          }

          .btn-wrap {
            width: 100%;
            display: flex;
            margin: 40px 0 20px 0;
            justify-content: space-around;
          }
        }
      }

    }

  }

</style>
