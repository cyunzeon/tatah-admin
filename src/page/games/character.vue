<template>
  <div class="bg_fff main">
    <h3 class="title">
      <i class="el-icon-user-solid"></i>性格测试游戏
    </h3>
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="refreshAction">刷新</el-button>
    </div>
    <div class="p10 main">
      <h3 class="title">
        游戏题库
      </h3>
      <div class="btn-list">
        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addAction">添加题目</el-button>
      </div>
      <el-table :data="tableData" stripe border style="width: 100%;">
        <el-table-column label="序号" header-align="center" align="center" width="70">
          <template slot-scope="scope">
            <span>{{(formInline.pageNo - 1) * formInline.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="csubject" label="题目" header-align="center"></el-table-column>
        <el-table-column prop="squareAnswerlist[0].ccontent" label="选项A" header-align="center">
        </el-table-column>
        <el-table-column prop="squareAnswerlist[1].ccontent" label="选项B" header-align="center"></el-table-column>
        <el-table-column prop="squareAnswerlist[2].ccontent" label="选项C" header-align="center"></el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="editAction(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deletAction(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="shade" v-show="showLook">
      <div class="shade-wrap">
        <p>添加题目</p>
        <div class="input-wrap">
          <div class="input-item">
            题目：
            <el-input placeholder="请输入题目" v-model="subject"></el-input>
          </div>
          <div class="input-item">
            <div>
              选项A：
              <el-input placeholder="请输入答案" v-model="aSub"></el-input>
            </div>
            <div>
              选项B：
              <el-input placeholder="请输入答案" v-model="bSub"></el-input>
            </div>
            <div>
              选项C：
              <el-input placeholder="请输入答案" v-model="cSub"></el-input>
            </div>
          </div>
          <div class="btn-wrap">
            <el-button @click="agreeBtn">确认</el-button>
            <el-button @click="cancelBtn">取消</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="shade" v-show="showEdit">
      <div class="shade-wrap">
        <p>编辑题目</p>
        <div class="input-wrap">
          <div class="input-item">
            <span>题目：</span>
            <el-input placeholder="请输入题目" v-model="subject"></el-input>
            <el-button @click="agreeBtn">修改</el-button>
          </div>
          <div class="input-item">
            <div>
              <span>选项A：</span>
              <el-input placeholder="请输入答案" v-model="aSub"></el-input>
              <el-button @click="editA">修改</el-button>
            </div>
            <div>
              <span>选项B：</span>
              <el-input placeholder="请输入答案" v-model="bSub"></el-input>
              <el-button @click="editB">修改</el-button>
            </div>
            <div>
              <span>选项C：</span>
              <el-input placeholder="请输入答案" v-model="cSub"></el-input>
              <el-button @click="editC">修改</el-button>
            </div>
          </div>
          <div class="btn-wrap">
            <el-button @click="cancelBtn">取消</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="block p20 tac">
      <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
        :page-size="formInline.pageSize" :current-page.sync="formInline.pageNo" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    loadSquareQuestionList,
    editSquareQuestion
  } from "@/request/api";
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        formInline: {
          pageNo: 1,
          pageSize: 20,
          startDate: "",
          endDate: ""
        },
        questionid: "",
        subject: "",
        sort: "",
        answerid: "",
        content: "",
        serialn: ['0', '1', '2'],
        aSub: "",
        bSub: "",
        cSub: "",
        aId: "",
        bId: "",
        cId: "",
        showEdit: false,
        showLook: false
      };
    },
    methods: {
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getLoadSquareQuestionList();
      },
      getLoadSquareQuestionList() {
        loadSquareQuestionList(this.formInline).then(res => {
          if (res.data.code == 200) {
            this.total = parseInt(res.data.data.total);
            this.tableData = res.data.data.list;
          }
        });
      },
      cancelBtn() {
        this.showEdit = false;
        this.showLook = false;
        this.questionid = '';
        this.subject = '';
        this.sort = '';
        this.aSub = '';
        this.bSub = '';
        this.cSub = '';
        this.sort = '';
        this.aId = '';
        this.bId = '';
        this.cId = '';
        this.answerid = '';
        this.serialn = '';
        this.content = '';
      },
      agreeBtn() {
        this.content = '1:' + this.aSub + ',' + '2:' + this.bSub + ',' + '3:' + this.cSub;
        this.serialn = this.serialn.join(',');
        console.log(this.content)
        editSquareQuestion({
          questionid: '',
          subject: this.subject,
          sort: '',
          answerid: '',
          content: this.content,
          serialn: this.serialn,
          type: 3
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadSquareQuestionList();
            this.showLook = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      editA() {
        console.log(this.aId)
        editSquareQuestion({
          questionid: this.questionid,
          subject: this.subject,
          sort: this.sort,
          answerid: this.aId,
          content: this.aSub,
          serialn: this.serialn.join(','),
          type: 1
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadSquareQuestionList();
            this.showEdit = false;
            this.questionid = '';
            this.subject = '';
            this.sort = '';
            this.aSub = '';
            this.bSub = '';
            this.cSub = '';
            this.sort = '';
            this.aId = '';
            this.bId = '';
            this.cId = '';
            this.answerid = '';
            this.serialn = '';
            this.content = '';
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      editB() {
        editSquareQuestion({
          questionid: this.questionid,
          subject: this.subject,
          sort: this.sort,
          answerid: this.bId,
          content: this.bSub,
          serialn: this.serialn.join(','),
          type: 1
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadSquareQuestionList();
            this.showEdit = false;
            this.questionid = '';
            this.subject = '';
            this.sort = '';
            this.aSub = '';
            this.bSub = '';
            this.cSub = '';
            this.sort = '';
            this.aId = '';
            this.bId = '';
            this.cId = '';
            this.answerid = '';
            this.serialn = '';
            this.content = '';
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      editC() {
        editSquareQuestion({
          questionid: this.questionid,
          subject: this.subject,
          sort: this.sort,
          answerid: this.cId,
          content: this.cSub,
          serialn: this.serialn.join(','),
          type: 1
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadSquareQuestionList();
            this.showEdit = false;
            this.questionid = '';
            this.subject = '';
            this.sort = '';
            this.aSub = '';
            this.bSub = '';
            this.cSub = '';
            this.sort = '';
            this.aId = '';
            this.bId = '';
            this.cId = '';
            this.answerid = '';
            this.serialn = '';
            this.content = '';
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      deletAction(row) {
        console.log(row)
        editSquareQuestion({
          questionid: row.cquestionid,
          type: 2
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadSquareQuestionList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      refreshAction() {
        this.getLoadSquareQuestionList();
      },
      addAction() {
        this.showLook = true;
      },
      editAction(row) {
        this.showEdit = true;
        this.questionid = row.cquestionid;
        this.subject = row.csubject;
        this.sort = row.isort;
        this.aSub = row.squareAnswerlist[0].ccontent;
        this.bSub = row.squareAnswerlist[1].ccontent;
        this.cSub = row.squareAnswerlist[2].ccontent;
        this.aId = row.squareAnswerlist[0].canswerid;
        this.bId = row.squareAnswerlist[1].canswerid;
        this.cId = row.squareAnswerlist[2].canswerid;
        this.answerid = row.squareAnswerlist[0].canswerid;
        console.log(this.aId)
      }
    },
    created() {
      this.getLoadSquareQuestionList();
    }
  };

</script>
<style lang="scss" scoped>
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
      height: 460px;
      background: #fff;
      position: absolute;
      top: 20%;
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
        align-items: space-around;
        padding-top: 10px;

        .input-item {
          margin: 10px auto;

          div {
            margin-bottom: 10px;
          }

          .el-input {
            width: 230px;
          }

          .el-radio {
            display: block;
            margin: 10px auto;
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

</style>
