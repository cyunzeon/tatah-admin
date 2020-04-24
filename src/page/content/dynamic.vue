<template>
  <div class='dynamic-wrap'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>用户动态管理
            </p>
            <div>
              <el-button type="primary" icon="el-icon-refresh" @click="refreshAction">
                刷新
              </el-button>
            </div>
          </div>

          <div class="table-wrapper">
            <div class="palette palette-wrap">
              昵称:
              <el-input v-model="listQuery.nickName" />
            </div>
            <div class="palette palette-wrap">
              发布时间:
              <el-date-picker type="date" placeholder="选择开始日期" :picker-options="pickerOptionsStart"
                v-model="listQuery.startDate" @change="startTimeChang"></el-date-picker>
              <el-date-picker type="date" placeholder="选择结束日期" :picker-options="pickerOptionsOver"
                v-model="listQuery.endDate" @change="endTimeChang"></el-date-picker>
            </div>
            <div class="palette palette-wrap">
              <el-button type="primary" @click="handleFilter" icon="el-icon-search">
                查询
              </el-button>
            </div>
            <!-- 表单 -->
            <!-- <el-row class="table">
              <el-col :span="8" v-for="item in tableData" :key="item.carticleid" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <div class="top">
                    <div class="info">
                      <img class="head-img" :src="item.chead" alt="">
                      <div>
                        <span>{{item.cnickname}}</span>
                        <span>{{item.cadddate}}</span>
                      </div>
                    </div>
                    <el-button type="danger" @click="deletBtn">删除</el-button>
                  </div>
                  <p class="word-wrap">{{item.ccontent}}</p>
                  <div class="img-wrap">
                    <template v-for="imga in item.imgList.slice(0, 9)">
                      <img :src="imga" alt="" class="content-img">
                    </template>
                  </div>
                </el-card>
              </el-col>
            </el-row> -->
            <div class="table">
              <!-- <display-info-with-emoji :msg="inputMessage"></display-info-with-emoji> -->

              <ul>
                <li v-for="item in tableData" :key="item.carticleid" v-show="item.istate == 1">
                  <div class="top">
                    <div class="info">
                      <img class="head-img" :src="item.chead" alt="">
                      <div>
                        <span>{{item.cnickname}}</span>
                        <span>{{item.cadddate}}</span>
                      </div>
                    </div>
                    <el-button @click="talk(item)">查看评论</el-button>
                    <el-button type="danger" @click="deletBtn(item)">删除</el-button>
                  </div>
                  <p class="word-wrap">{{item.ccontent}}</p>
                  <div class="img-wrap" v-if="item.imgList != ''">
                    <template v-for="imga in item.imgList.slice(0, 9)">
                      <img :src="imga" alt="" class="content-img">
                    </template>
                  </div>
                  <div class="img-wrap" v-else>
                    <video muted width="400" height="300" autoplay loop controls="controls">
                      <source :src="item.videoList[0]" type="video/mp4" />您的浏览器不支持 video 标签
                    </video>

                  </div>
                </li>
              </ul>
            </div>
            <!-- 分页 -->
            <el-pagination style="margin-top: 16px; text-align:center;" layout="total, prev, pager, next" :total="total"
              :page-size="listQuery.pageSize" :current-page.sync="listQuery.pageNo"
              @current-change="handleCurrentChange"></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="shade" v-show="showTalk">
      <div class="shade-wrap">
      </div>
    </div>
  </div>
</template>
<script>
  import {
    loadUserCircleArticleList,
    updateUserCircleArticleList,
    getArticleDynamic,
    deleteCommentById
  } from '@/request/api'
  import {
    smileEmoji,
    CEmoji,
    DisplayInfoWithEmoji,
    EmojiItem,
    convertEmoji2Str,
    convertStr2Emoji
  } from "w-vue-emoji"
  export default {
    components: {
      CEmoji,
      DisplayInfoWithEmoji,
      EmojiItem
    },
    created() {
      this.getLoadUserCircleArticleList();
      setInterval(this.getTime, 1000);
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    data() {
      return {
        tableData: [],
        talkList: [],
        loading: false,
        showTalk: false,
        total: 0,
        dialogFormVisible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          nickName: '',
          state: '',
          endDate: '',
          startDate: ''
        },
        time: '',
        timer: '',
        //
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        },
        pickerOptionsOver: {
          disabledDate(time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        }
      }
    },
    methods: {
      talk(item) {
        this.$router.push({
          path: '/dynamic/talkDetail',
          query: {
            carticleId: item.carticleid
          }})
      },
      deletTalk(item) {
        deleteCommentById().then(res => {

        })
      },
      deletBtn(item) {
        console.log(item)
        updateUserCircleArticleList({
          state: 0,
          carticleId: item.carticleid
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getLoadUserCircleArticleList();
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      handleFilter() {
        if (this.listQuery.endDate == '' && this.listQuery.startDate != '') {
          this.listQuery.endDate = this.timer
        }
        this.listQuery.pageNo = 1;
        this.getLoadUserCircleArticleList();
      },
      getLoadUserCircleArticleList() {
        loadUserCircleArticleList(this.listQuery).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.total = parseInt(res.data.data.total);
          }
        })
      },
      lookAction(index, row) {
        this.$router.push({
          path: '/report/detail',
          query: {
            jbrMobileNo: row.jbrMobileNo,
            bjbrMobileNo: row.bjbrMobileNo,
            cadddate: row.cadddate,
            reportimg: row.reportimg,
            state: row.state
          }
        })
      },
      refreshAction() {
        this.getLoadUserCircleArticleList();
      },
      handleCurrentChange(value) {
        this.listQuery.pageNo = value;
        this.getLoadUserCircleArticleList();
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
        this.listQuery.startDate = startTime;
      },
      endTimeChang(val) {
        let endTime = this.dateFilter(val);
        this.listQuery.endDate = endTime;
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
      }
    }
  };

</script>
<style lang='scss' scoped>
  .dynamic-wrap {
    width: 100%;
    height: 100%;
    /* .top {
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            border-radius: 15px;

            .info {
              display: flex;

              .head-img {
                width: 50px;
                height: 50px;
              }

              div {
                display: flex;
                flex-direction: column;
                padding-left: 10px;
              }
            }
          } */

    .word-wrap {
      display: block;
      width: 460px;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      padding-left: 20px;
    }

    .img-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: space-around;

      .content-img {
        display: block;
        width: 150px;
        height: 150px;
        margin: 10px 0;
      }
    }

    .table {
      width: 100%;
      height: 100%;

      ul {
        width: 100%;
        height: 100%;
        display: flex;
        /* justify-content: space-around; */
        flex-wrap: wrap;

        li {
          width: 500px;
          border: 1px solid #eee;
          margin: 0 40px 20px 0;

          .top {
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            border-radius: 15px;

            .info {
              display: flex;

              .head-img {
                width: 50px;
                height: 50px;
              }

              div {
                display: flex;
                flex-direction: column;
                padding-left: 10px;
              }
            }
          }

          .word-wrap {
            display: block;
            width: 460px;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
            padding-left: 20px;
          }

          .img-wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: space-around;
            padding-bottom: 10px;
            box-sizing: border-box;

            .video-wrap {
              width: 400px;
              height: 300px;
            }

            .content-img {
              display: block;
              width: 150px;
              height: 150px;
              margin: 10px 0;
            }
          }
        }
      }
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
        width: 1000px;
        height: 600px;
        background: #fff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 5px;

        .box-ul {
          .talk-item {
            padding: 20px;
            .top {
              display: flex;
              justify-content: space-between;

              .left {
                display: flex;
                align-items: center;

                img {
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }

  .top-wrap {
    width: 97.8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 6px 20px;
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
