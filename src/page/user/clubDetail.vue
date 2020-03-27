<template>
  <div class="main bg_fff">
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small' @click="refreshAction">刷新</el-button>
      <el-button type="primary" icon="el-icon-back" size='small' @click="backAction">返回</el-button>
    </div>
    <h3 class="title"><i class="el-icon-user-solid"></i>俱乐部详情</h3>
    <div class="p10">
      <table class="tableEven">
        <tr>
          <td>俱乐部名称</td>
          <td>{{$route.query.cgroupname}}</td>
          <td>俱乐部创建人</td>
          <td>{{$route.query.cnickname}}</td>
          <td>俱乐部状态</td>
          <td>
            <p v-if="$route.query.istate == 0">解散</p>
            <p v-else-if="$route.query.istate == 1">正常</p>
            <p v-else-if="$route.query.istate == 2">冻结</p>
            <p v-else></p>
          </td>
          <td>创建时间</td>
          <td>{{$route.query.cadddate}}</td>
        </tr>
        <tr>
          <td>礼物发放时间</td>
          <td>每日{{$route.query.isendhour}}:00</td>
          <td>每日礼物数量(钻石/人)</td>
          <td>{{$route.query.iredpacketnum}}</td>
          <td>累计送出礼物(钻石)</td>
          <td>{{$route.query.itotalnum}}</td>
          <td>俱乐部成员总数</td>
          <td>{{$route.query.ipersoncount}}</td>
        </tr>
        <tr>
          <td>俱乐部公告</td>
          <td colspan="7">{{$route.query.cgroupnotice}}</td>
        </tr>
      </table>
    </div>
    <h3 class="title"><i class="el-icon-user-solid"></i>俱乐部成员</h3>
    <div class="p10">
      <el-table :data="tableData" stripe border style="width: 100%" highlight-current-row>
        <el-table-column prop="mobileno" label="手机号" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="头像" header-align="center" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.head" style="width: 50px;height:50px;" alt="" @click="openImg(scope.row.head)">
          </template>
        </el-table-column>
        <el-table-column label="性别" header-align="center" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.gender == 1">男</p>
            <p v-else>女</p>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="生日" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="viplevel" label="VIP等级" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="receivenum" label="累计领取礼物数" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="adddate" label="加入俱乐部时间" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="lookAction(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
      style="margin-top: 16px; text-align:center;"
      layout="total, prev, pager, next"
      :total="total"
      :page-size="formInline.pageSize"
      :current-page.sync="formInline.pageNo"
      @current-change="handleCurrentChange"
    ></el-pagination>
      

      <el-dialog width="400px" :visible.sync="imgVisible">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="dialogImgUrl" width="100%" height="100%">
        </el-card>
      </el-dialog>
  
    </div>
  </div>

</template>
<script>
  import {
    loadGroupMemberList
  } from '@/request/api';
  export default {
    data() {
      return {
        formInline: {
          groupid: this.$route.query.cgroupid,
          pageSize: 20,
          pageNo: 1
        },
        tableData: [],
        imgVisible: false,
        dialogImgUrl: '',
        total: 0
      };
    },
    methods: {
      getLoadGroupMemberList() {
        loadGroupMemberList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.total = parseInt(res.data.data.total);
          }
        })
      },
      refreshAction() {
        this.getLoadGroupMemberList();
      },
            //分页器
        handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadGroupMemberList();
      },
      backAction() {
        this.$router.go(-1)
      },
      lookAction(index, row) {
        this.$router.push({
          path: '/userInfo/detail',
          query: {
            userid: row.userId
          }
        })
      },
      openImg(head) {
        if (head) {
          this.imgVisible = true
          this.dialogImgUrl = head
        }
      },

    },
    created() {
      this.getLoadGroupMemberList();
    }
  };

</script>
<style lang='less' scoped>

</style>
