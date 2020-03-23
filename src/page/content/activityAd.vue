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
        <el-table-column label="广告类型" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.iadvertposition==0">首页banner广告</p>
            <p v-else-if="scope.row.iadvertposition==1">首页公告</p>
            <p v-else-if="scope.row.iadvertposition==2">首页广告</p>
            <p v-else-if="scope.row.iadvertposition==3">朋友圈banner</p>
            <p v-else-if="scope.row.iadvertposition==4">启动页</p>
            <p v-else-if="scope.row.iadvertposition==5">发现banner</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.upperstate==1">上架</p>
            <p v-else-if="scope.row.upperstate==0">下架</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="coperator" label="发布人" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editAction(scope.$index, scope.row)" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button type="info" size="small" @click="delAction(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block p20 tac">
      <el-pagination
      style="margin-top: 16px; text-align:center;"
      layout="total, prev, pager, next"
      :total="total"
      :page-size="formInline.pageSize"
      :current-page.sync="formInline.pageNo"
      @current-change="handleCurrentChange"
    ></el-pagination>
</div>
  </div>
</template>
<script>
  import {
    loadManageAdvertisingList,
    operationManageAdvertising,
    delManageAdvertising
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
        }
      }
    },
    methods: {
      getLoadManageAdvertisingList() {
        loadManageAdvertisingList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = parseInt(res.data.data.total);
            this.tableData = res.data.data.list;
          }
        })
      },
      //修改
      editAction(index, row) {
        this.$router.push({
          path: '/activityAd/editAd',
          query: {
            cadvertid: row.cadvertid,
            ctitle: row.ctitle,
            cadverturl: row.cadverturl,
            curl: row.curl,
            upperstate: row.upperstate
          }
        })
      },
      delAction(index, row) {
        console.log(row)
        delManageAdvertising({
          cadvertid: row.cadvertid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getLoadManageAdvertisingList()
          } else {
            this.$message.error(res.data.message)
          }
        })
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
