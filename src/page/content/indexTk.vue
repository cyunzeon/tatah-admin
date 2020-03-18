<template>
  <div class="bg_fff main">
    <h3 class="title"><i class="el-icon-user-solid"></i>首页弹窗管理</h3>
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small' @click="refreshAction">刷新</el-button>
    </div>
    <div class="p10 main">
      <h3 class="title"><i class="el-icon-user-solid"></i>弹框列表</h3>
      <div class="btn-list">
        <el-button type="primary" icon="el-icon-circle-plus" size='mini' @click="addAction">添加弹窗</el-button>
      </div>
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
          <template slot-scope="scope">
            <p v-if="scope.row.istatus == 0">上架</p>
            <p v-else>下架</p>
          </template>
        </el-table-column>
        <el-table-column prop="cpublisher" label="发布人" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="editAction(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deletBtn(scope.row)">删除</el-button>
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
    loadHomeWindowList,
    delHomeWindow
  } from '@/request/api'
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        formInline: {
          pageNo: 1,
          pageSize: 20
        },
        formItme: {
          cwindowid: '',
          ctitle: '',
          istatus: '',
          type: 1,
          cadverturl: '',
          curl: '',
          top: ''
        },
        showEdit: [],
        showBtn: []
      }
    },
    methods: {
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadHomeWindowList();
      },
      getLoadHomeWindowList() {
        loadHomeWindowList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
          }
        })
      },
      deletBtn(row) {
        delHomeWindow({
          cwindowid: row.cwindowid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadHomeWindowList()
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      refreshAction() {
        this.getLoadHomeWindowList()
      },
      addAction() {
        this.$router.push('/indexTk/addTk')
      },
      editAction(row) {
        this.$router.push({
          path: '/indexTk/editTk',
          query: {
            ctitle: row.ctitle,
            istatus: row.istatus,
            cadverturl: row.cadverturl,
            curl: row.curl,
            cwindowid: row.cwindowid
          }
        })
      }
    },
    created() {
      this.getLoadHomeWindowList()
    }
  };

</script>
