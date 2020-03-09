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
            <el-table-column prop="cname" label="任务" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="itop" label="更新时间" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="状态" header-align="center" align="center">
              <template slot-scope="scope">
                <p v-if="scope.row.istate == 0">未上架</p>
                <p v-else>已上架</p>
              </template>
            </el-table-column>
            <el-table-column prop="itop" label="发布人" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="lookAction(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" @click="lookAction(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
            @current-change="handleCurrentChange">
          </el-pagination>


          <div class="shade" v-show="showLook">
            <div class="shade-wrap">
              <p>查看任务</p>
              <div class="input-wrap">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="任务内容：">
                    <el-input v-model="addForm.name" placeholder=""></el-input>
                  </el-form-item>
                </el-form>
                <div class="input-item">
                  任务内容<el-input v-model="addForm.name" placeholder=""></el-input>
                </div>
                <div class="input-item">
                  状态：
                  <el-select v-model="addForm.state" placeholder="请选择">
                    <el-option label="未上架" value="0"></el-option>
                    <el-option label="已上架" value="1"></el-option>
                  </el-select>
                </div>
                <div class="btn-wrap">
                  <el-button @click="agreeBtn">确认</el-button>
                  <el-button @click="showLook=false">取消</el-button>
                </div>
              </div>
            </div>
          </div>

          <div class="shade2" v-show="showAdd">
            <div class="shade-wrap">
              <p>添加任务</p>
              <div class="input-wrap">
                <div class="input-item">
                  任务内容<el-input v-model="addForm.name" placeholder=""></el-input>
                </div>
                <div class="input-item">
                  状态：
                  <el-select v-model="addForm.state" placeholder="请选择">
                    <el-option label="未上架" value="0"></el-option>
                    <el-option label="已上架" value="1"></el-option>
                  </el-select>
                </div>
                <div class="btn-wrap">
                  <el-button @click="addBtn">确认</el-button>
                  <el-button @click="showAdd=false">取消</el-button>
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
    loadUserGiftList,
    operationGift
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
          giftId: '',
          name: '',
          pictureUrl: '',
          price: '',
          top: '',
          state: '',
          type: 1
        },
        addForm: {
          giftId: '',
          name: '',
          pictureUrl: '',
          price: '',
          top: '',
          state: '',
          type: 2
        },
        lookList: '',
        showLook: false,
        showAdd: false,
        placeholder: '',
        istate: '',
        fileList: []
      }
    },
    methods: {
      refreshBtn() {
        this.getLoadUserGiftList();
      },
      lookAction(index, row) {
        this.lookList = row;
        console.log(row)
        this.editForm.giftId = row.cgiftid;
        this.editForm.name = row.cname;
        this.editForm.pictureUrl = row.cpictureurl;
        this.editForm.price = row.iprice;
        this.editForm.state = this.istate;
        this.editForm.top = row.itop;
        if (row.istate == 0) {
          this.placeholder = '未上架'
        } else {
          this.placeholder = '已上架'
        }
        this.showLook = true;
      },
      agreeBtn() {
        operationGift(this.editForm).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.showLook = false;
            this.getLoadUserGiftList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      addBtn() {
        operationGift(this.addForm).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.showAdd = false;
            this.addForm.name = '';
            this.addForm.pictureUrl = '';
            this.addForm.price = '';
            this.addForm.top = '';
            this.addForm.state = '';
            this.fileList = [];
            this.getLoadUserGiftList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      getLoadUserGiftList() {
        loadUserGiftList(this.form).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data;
            this.total = res.data.data.length;
          }
        })
      },
      //分页器
      handleCurrentChange(pgno) {
        this.form.pageNo = pgno;
        this.getLoadUserGiftList();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      success(response, file, fileList) {
        this.addForm.pictureUrl = response.data.imageUrl;
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    created() {
      this.getLoadUserGiftList()
    }
  }

</script>

<style lang="scss" scoped>
  .gift-wrap {
    .refresh-btn {
      float: right;
      margin-bottom: 20px;
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
      background: rgba(0, 0, 0, .5);
      display: block;

      .shade-wrap {
        width: 400px;
        height: 460px;
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
          background: #409EFF;
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
            padding-left: 100px;

            .el-select {
              width: 120px;
            }

            img {
              width: 100px;
              height: 100px;
            }
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
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .input-item {
            margin: 10px 0;

            .el-select {
              width: 120px;
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
