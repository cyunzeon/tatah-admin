<template>
  <div class='daily-wrap'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>编辑用户
            </p>
            <div>
              <el-button type="primary" icon="el-icon-refresh" @click="refreshAction">
                刷新
              </el-button>
            </div>
          </div>

          <div class="table-wrapper">
            <div class="palette palette-wrap">
              <el-button type="primary" @click="addRole = true" icon="el-icon-plus">
                添加角色
              </el-button>
            </div>

            <!-- 表单 -->
            <el-table v-loading="loading" element-loading-text="加载数据中" :data='tableData' border style="width: 100%">
              <el-table-column label="角色名称" prop="cname" align="center" header-align="center">
              </el-table-column>
              <el-table-column label="操作" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click="editNameBtn(scope.row)" icon="el-icon-edit">
                    编辑名称
                  </el-button>
                  <el-button type="primary" @click="settingBtn(scope.row)" icon="el-icon-setting">
                    设置权限
                  </el-button>
                  <el-button type="danger" @click="deletRole(scope.row)">
                    删除角色
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="shade" v-show="editName">
              <div class="shade-wrap">
                <p>编辑名称</p>
                <div class="input-wrap">
                  <div class="input-item">
                    角色名称：<el-input v-model="editForm.roleName" placeholder="编辑名称"></el-input>
                  </div>
                  <div class="input-item">
                    备注：<el-input v-model="editForm.description" placeholder="编辑名称"></el-input>
                  </div>
                  <div class="input-item">
                    角色代码编号：<el-input v-model="editForm.roleCode" placeholder="编辑名称"></el-input>
                  </div>
                  <div class="btn-wrap">
                    <el-button @click="editBtn">
                      确定
                    </el-button>
                    <el-button @click="editName = false">
                      取消
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="shade" v-show="addRole">
              <div class="shade-wrap">
                <p>添加角色</p>
                <div class="input-wrap">
                  <div class="input-item">
                    角色名称：<el-input v-model="editForm.roleName" placeholder="编辑名称"></el-input>
                  </div>
                  <div class="input-item">
                    备注：<el-input v-model="editForm.description" placeholder="编辑名称"></el-input>
                  </div>
                  <div class="input-item">
                    角色代码编号：<el-input v-model="editForm.roleCode" placeholder="编辑名称"></el-input>
                  </div>
                  <div class="btn-wrap">
                    <el-button @click="addRoleBtn">
                      确定
                    </el-button>
                    <el-button @click="addRole = false">
                      取消
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    loadRoleList,
    editRole,
    delRole
  } from '@/request/api';
  export default {
    data() {
      return {
        tableData: [],
        loading: false,
        addRole: false,
        editName: false,
        total: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
        },
        editForm: {
          roleId: '',
          roleName: '',
          description: '',
          roleCode: ''
        }
      }
    },
    methods: {
      editNameBtn(row) {
        this.editForm.roleId = row.croleid;
        this.editForm.roleName = row.cname;
        this.editForm.description = row.cdesc;
        this.editForm.roleCode = row.crolecode;
        this.editName = true;
        console.log(row)
      },
      addRoleBtn() {
        editRole(this.editForm).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.addRole = false;
            this.editForm.roleName = '';
            this.editForm.description = '';
            this.editForm.roleCode = '';
            this.getLoadRoleList();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      settingBtn(row) {
        this.$router.push({
          path: '/jurisdiction',
          query: {
            roleId: row.croleid,
            name: row.cname
          }
        })
      },
      deletRole(row) {
        delRole({
          roleId: row.croleid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadRoleList();
          } else {
            this.$message.error(res.message);
          }

        })
        this.getLoadRoleList();
      },
      editBtn() {
        editRole(this.editForm).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.editName = false;
            this.getLoadRoleList();
            this.editForm.roleName = '';
            this.editForm.description = '';
            this.editForm.roleCode = '';
            this.editForm.roleId = '';
          } else {
            this.$message.error(res.message);
          }
        })
      },
      getLoadRoleList() {
        loadRoleList(this.listQuery).then(res => {
          this.tableData = res.data.data.array;
          this.total = res.data.data.array.length;
        })
      },
      refreshAction() {
        this.getLoadRoleList();
      },
      handleCurrentChange(value) {
        this.listQuery.pageNo = value;
        this.getLoadRoleList();
      },
    },
    created() {
      this.getLoadRoleList();
    }
  };

</script>
<style lang='scss' scoped>
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
      height: 300px;
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
        height: 40px;
        line-height: 40px;
        background: #409eff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: #fff;
        padding-left: 20px;
      }

      .input-wrap {
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-top: 30px;


        .input-item {
          margin-top: 20px;

        }

        .btn-wrap {
          width: 100%;
          display: flex;
          justify-content: space-around;
          margin-top: 20px;

        }
      }
    }
  }

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
