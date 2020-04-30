<template>
  <div class="bg_fff main">
    <h3 class="title"><i class="el-icon-user-solid"></i>动态评论管理</h3>
    <!-- <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size='small' @click="refreshAction">刷新</el-button>
    </div> -->
    <div class="p10">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="昵称：">
          <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="时间：">
          <div class="block">
            <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
              v-model="formInline.startDate" @change="startTimeChang"></el-date-picker>
            <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
              v-model="formInline.endDate" @change="endTimeChang"></el-date-picker>
          </div>
        </el-form-item>
        <!-- <el-form-item label="是否处理：">
          <el-select v-model="formInline.handle" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="已审核" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <ul class="ul-box">
        <li v-for="(item, index) in dataList" :key="index">
          <div class="left">
            <img :src="item.img" alt="">
            <div class="comment">
              <p>{{item.name}}</p>
              <p>{{item.time}}</p>
            </div>
          </div>
          <span>评论内容：{{item.content}}</span>
          <span>动态内容：{{item.pcontent}}</span>
          <el-button type="primary" @click="onSubmit(item, index)" v-if="item.del == 0">审核评论</el-button>
          <el-button type="danger" @click="onDel(item, index)" v-else>删除评论</el-button>
        </li>
        <!-- <li>
          <div class="left">
            <img src="../../assets/img/cyh.jpg" alt="">
            <div class="comment">
              <p>陈以后</p>
              <p>2020-04-29 09:36:21</p>
            </div>
          </div>
          <span>评论内容：美短吗？</span>
          <span>动态内容：睡个觉都是爱我的形状</span>
          <el-button type="primary" @click="onSubmit">审核评论</el-button>
        </li>
        <li>
          <div class="left">
            <img src="../../assets/img/k.jpg" alt="">
            <div class="comment">
              <p>K！</p>
              <p>2020-04-29 09:21:06</p>
            </div>
          </div>
          <span>评论内容：来成都吃串串</span>
          <span>动态内容：有成都重庆的小伙伴吗？目前能出游吗？</span>
          <el-button type="primary" @click="onSubmit">审核评论</el-button>
        </li>
        <li>
          <div class="left">
            <img src="../../assets/img/mar.jpg" alt="">
            <div class="comment">
              <p>Martix</p>
              <p>2020-04-29 09:21:06</p>
            </div>
          </div>
          <span>评论内容：你这是怎么了。。</span>
          <span>动态内容：本不富裕的家庭，雪上加霜~
          </span>
          <el-button type="danger" @click="onSubmit">删除评论</el-button>
        </li> -->
      </ul>
    </div>
    <div class="block p20 tac">
      <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
        :page-size="formInline.pageSize" :current-page.sync="formInline.pageNo" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
  import {
    findAllTask,
    taskOpt
  } from '@/request/api'
  export default {
    data() {
      return {
        tableData: [],
        total: 3,
        dialogImgUrl: '',
        imgVisible: false,
        formInline: {
          mobileNo: '',
          nickName: '',
          pageSize: 20,
          pageNo: 1,
          startDate: '',
          endDate: '',
          handle: '',
          state: ''
        },
        dataList: [{
          'name': '陈以后',
          'img': require('../../assets/img/cyh.jpg'),
          'time': '2020-04-29 09:36:21',
          'content': '美短吗？',
          'pcontent': '睡个觉都是爱我的形状',
          'del': 0
        },
        {
          'name': 'Martix',
          'img': require('../../assets/img/mar.jpg'),
          'time': '2020-04-29 09:21:06',
          'content': '你这是怎么了。。',
          'pcontent': '本不富裕的家庭，雪上加霜~',
          'del': 0
        },{
          'name': 'K！',
          'img': require('../../assets/img/k.jpg'),
          'time': '2020-04-29 09:21:06',
          'content': '来成都吃串串',
          'pcontent': '有成都重庆的小伙伴吗？目前能出游吗？',
          'del': 0
        }],
        //时间选择
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        },
        pickerOptionsOver: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        },
        value: '',
        timer: ''
      }
    },
    methods: {
      getFindAllTask() {
        findAllTask(this.formInline).then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data)
            //this.total = parseInt(res.data.data.total);
            this.tableData = res.data.data.list;
          }
        })
      },
      //点击看大图
      openImg(head) {
        if (head) {
          this.imgVisible = true
          this.dialogImgUrl = head
        }
      },
      refreshAction() {
        this.getFindAllTask()
      },
      passBtn(index, row) {
        taskOpt({
          type: 1,
          itaskid: row.itaskid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getFindAllTask();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      delAction(index, row) {
        taskOpt({
          type: 2,
          itaskid: row.itaskid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getFindAllTask();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      //分页器
      handleCurrentChange(pgno) {
        this.formInline.pageNo = pgno;
        this.getFindAllTask();
      },
      //时间选择
      dateFilter(input) {
        var d = new Date(input);
        var year = d.getFullYear();
        var month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + '-' + month + '-' + day;
      },
      startTimeChang(val) {
        let startTime = this.dateFilter(val);
        this.formInline.startDate = startTime;
      },
      endTimeChang(val) {
        let endTime = this.dateFilter(val);
        this.formInline.endDate = endTime;
      },
      getTime() {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm =
          (new Date().getMonth() + 1) < 10 ?
          "0" + (new Date().getMonth() + 1) :
          (new Date().getMonth() + 1);
        let dd =
          new Date().getDate() < 10 ?
          "0" + new Date().getDate() :
          new Date().getDate();
        _this.timer = yy + "-" + mm + "-" + dd;
      },
      onSubmit(item, index) {
        console.log(item)
        /*if (this.formInline.endDate == '' && this.formInline.startDate != '') {
          this.formInline.endDate = this.timer
        }
        this.getFindAllTask();*/
        this.$set(item,'del',1)
      },
      onDel(item, index) {
        this.dataList.splice(this.dataList.indexOf(item),1);
        this.total--;
      }
    },
    created() {
      this.getFindAllTask();
      setInterval(this.getTime, 1000);
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  };

</script>

<style lang="scss" scoped>
  .el-select {
    width: 120px;
  }

  .ul-box {
    li {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 10px 100px;

      .left {
        display: flex;
        align-items: center;
        margin-right: 240px;

        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }

      span {
        margin-right: 240px;
        width: 250px;
      }
    }
  }

</style>
