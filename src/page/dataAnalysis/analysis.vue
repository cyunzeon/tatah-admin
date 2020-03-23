<template>
  <div class="analysis-wrap">
    <div class="top-wrap">
      <p>
        <i class="el-icon-user-solid"></i>概况分析
      </p>
      <div>
        <el-button type="primary" icon="el-icon-refresh" @click="refreshBtn">
          刷新
        </el-button>
      </div>
    </div>

    <div class="people-total">
      <div>
        <p>{{dataList.num}}</p>
        <p>用户总数</p>
      </div>
      <div>
        <p>{{dataList.daynum}}</p>
        <p>本日新增用户</p>
      </div>
      <div>
        <p>{{dataList.weeknum}}</p>
        <p>本周新增用户</p>
      </div>
      <div>
        <p>{{dataList.monthnum}}</p>
        <p>本月新增用户</p>
      </div>
    </div>

    <div class="people-total">
      <div>
        <p>{{dataList.num}}</p>
        <p>在线用户人数</p>
      </div>
      <div>
        <p>{{dataList.activedaynum}}</p>
        <p>本日活跃用户</p>
      </div>
      <div>
        <p>{{dataList.activeweeknum}}</p>
        <p>本周活跃用户</p>
      </div>
      <div>
        <p>{{dataList.activemonthnum}}</p>
        <p>本月活跃用户</p>
      </div>
    </div>

    <div class="date-wrap">
      <div class="top-box">
        <p>用户统计</p>
        <!-- <el-select v-model="listQuery.dateTime" placeholder="请选择时间段">
          <el-option v-for="item in states" :key="item.name" :label="item.name" :value="item.value" />
        </el-select> -->
      </div>

      <div id="my-echarts"></div>
    </div>
  </div>
</template>

<script>
  import {
    loadUserData
  } from '@/request/api';
  import echarts from 'echarts';
  export default {
    data() {
      return {
        listQuery: {
          dateTime: ''
        },
        states: [{
            value: 1,
            name: '本日'
          },
          {
            value: 0,
            name: '本周'
          },
          {
            value: 2,
            name: '本月'
          }
        ],
        charts: '',
        opinionData: ["3", "2", "4", "4", "5", "4", "4", "5"],
        dataList: [],
        adduserlist: [],
        activeuserlist: [],
        dataTimes: []
      }
    },
    methods: {
      getLoadUserData() {
        loadUserData().then(res => {
          this.dataList = res.data.data;
          res.data.data.adduserlist.map(item => {
          this.adduserlist.push(item.daynum);
          this.dataTimes.push(item.dates);
        });
        res.data.data.activeuserlist.map(items => {
          this.activeuserlist.push(items.activedaynum);
        });
        this.$nextTick(function() {
          this.drawLine("my-echarts");
        });
        })
      },
      refreshBtn() {
      this.adduserlist = [];
      this.activeuserlist = [];
      this.dataTimes = [];
      this.getLoadUserData();
    },
      drawLine(id) {
        console.log(111)
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['新增用户数', '活跃用户数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dataTimes
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              name: '新增用户数',
              data: this.adduserlist,
              type: 'line'
            },
            {
              name: '活跃用户数',
              data: this.activeuserlist,
              type: 'line'
            }
          ]
        })
      },
    },
    created() {
      this.getLoadUserData();
    },
    mounted() {
      /*this.$nextTick(function () {
        this.drawLine('my-echarts')
      })*/
    }

  }

</script>

<style lang="scss" scoped>
  .analysis-wrap {
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

    .people-total {
      width: 97.8%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #fff;
      padding: 10px 20px;
      margin-bottom: 10px;
      border-radius: 5px;

      div {
        width: 416px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-right: 1px solid #eee;

        p:nth-of-type(1) {
          font-weight: 700;
          font-size: 20px;
        }
      }

      div:last-of-type {
        border-right: 0;
      }
    }

    .date-wrap {
      width: 100%;
      background-color: #fff;
      border-radius: 5px;

      .top-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
      }

      #my-echarts {
        width: 1000px;
        height: 400px;
        margin: 0 auto;
      }
    }

    .el-select {
      padding-right: 40px;
    }
  }

</style>
