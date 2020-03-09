<template>
  <div class="bg_fff main">
    <h3 class="title"><i class="el-icon-user-solid"></i>广告列表</h3>
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-circle-plus" size='small' @click="addAction">添加广告</el-button>
    </div>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column label="序号" header-align="center" align="center">
          <template slot-scope="scope">
            <span>{{(formInline.pageNo - 1) * formInline.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctitle" label="标题" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="cupdatetime" label="更新时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="状态" header-align="center" align="center">
          <!-- <template slot-scope="scope">
            <template v-if="showEdit[scope.$index]">
              <el-select v-model="formInline.istatus" placeholder="请选择交易类型">
                <el-option label="已上架" value="0"></el-option>
                <el-option label="已下架" value="1"></el-option>
              </el-select>
            </template>
            <template v-else>
              <p v-if="scope.row.istatus==0">已上架</p>
              <p v-else-if="scope.row.istatus==1">已下架</p>
              <p v-else></p>
            </template>
          </template> -->
        </el-table-column>
        <el-table-column prop="address" label="发布人" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button v-if="showBtn[scope.$index]" type="success" size="small"
              @click="saveAction(scope.$index, scope.row)">
              保存
            </el-button>
            <el-button v-else type="primary" size="small" @click="editAction(scope.$index, scope.row)"
              icon="el-icon-edit">
              编辑
            </el-button>
            <el-button v-if="showBtn[scope.$index]" type="danger" size="small"
              @click="cancelAction(scope.$index, scope.row)">
              取消
            </el-button>
            <el-button v-else type="info" size="small" @click="delAction(scope.$index, scope.row)">
              删除
            </el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div class="block p20 tac">
      <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    loadManageAdvertisingList
  } from '@/request/api'
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        showBtn: [],
        showEdit: [],
        formInline: {
          pageSize: 20,
          pageNo: 1,
          istatus: ''
        }
      }
    },
    methods: {
      getLoadManageAdvertisingList() {
        loadManageAdvertisingList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.length;
            this.tableData = res.data.data;
          }
        })
      },
      //修改
      editAction(index, row) {
        console.log('row', row)
        //console.log('index', index)
        this.editData.advertId = row.advertId;
        this.$set(this.showEdit, index, true);
        this.$set(this.showBtn, index, true);
      },
      //取消
      cancelAction(index, row) {
        this.$set(this.showEdit, index, false);
        this.$set(this.showBtn, index, false);
      },
      //保存
      saveAction(index, row) {
        /*this.axios({
            url: '/system/editAdvert',
            method: 'post',
            data: this.editData,
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(res => {
            if (res.code == 200) {
              this.$set(this.showEdit, index, false);
              this.$set(this.showBtn, index, false);
              this.getTableData();
              this.$message({
                message: res.message,
                type: 'success'
              });
            } else {
              this.$message.error(res.message);
            }
          })*/
        //this.$router.go(0);
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadManageAdvertisingList();
      },
      //添加广告
      addAction() {
        this.$router.push('/activityAd/addAd')
      }
    },
    created() {
      this.getLoadManageAdvertisingList()
    }
  };

</script>
