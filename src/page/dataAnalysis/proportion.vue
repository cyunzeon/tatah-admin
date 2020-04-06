<template>
  <div class="proportion-wrap">
    <div class="top-wrap">
      <p>
        <i class="el-icon-user-solid"></i>
        用户画像
      </p>
      <div>
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
      </div>
    </div>

    <div class="sex-wrap">
      <div class="sex-box">
        <div id="sex-echarts" ref="sex-echarts"></div>
      </div>
    </div>
    <div class="age-wrap">
      <p>年龄比例</p>
      <div class="age-box">
        <div class="age-data">
          <div id="age-echarts" ref="age-echarts"></div>
        </div>
        <div class="age-table">
          <table>
            <tr>
              <td>年龄</td>
              <td>占比</td>
              <td>人数</td>
            </tr>
            <tr>
              <td>18-23</td>
              <td>{{ageTable.stageby1}}%</td>
              <td>{{ageList.stage1}}</td>
            </tr>
            <tr>
              <td>24-29</td>
              <td>{{ageTable.stageby2}}%</td>
              <td>{{ageList.stage2}}</td>
            </tr>
            <tr>
              <td>30-39</td>
              <td>{{ageTable.stageby3}}%</td>
              <td>{{ageList.stage3}}</td>
            </tr>
            <tr>
              <td>40-49</td>
              <td>{{ageTable.stageby4}}%</td>
              <td>{{ageList.stage4}}</td>
            </tr>
            <tr>
              <td>50+</td>
              <td>{{ageTable.stageby5}}%</td>
              <td>{{ageList.stage5}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="map-wrap">
      <p>地域分布</p>
      <div class="map-box">
        <div class="map-data">
          <div id="map-echarts"></div>
        </div>
        <div class="map-table">
          <el-table
            :data="tableData3"
            height="500"
            border
            style="width: 100%"
            highlight-current-row
            :row-style="{height: '20px'}"
            :cell-style="{padding:'10px'}"
          >
            <el-table-column prop="date" label="省份" align="center" width="119"></el-table-column>
            <el-table-column prop="name" label="占比" align="center" width="140"></el-table-column>
            <el-table-column prop="address" label="人数" align="center" width="140"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js";
import { loadUserStatistics } from "@/request/api";
export default {
  data() {
    return {
      charts: "",
      mapChart: "",
      sexCharts: "",
      peopleNum: "",
      ageList: "",
      ageTable: "",
      mapList: "",
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市"
        }
      ]
    };
  },
  mounted() {
    /*this.sexEcharts();
    this.$nextTick(() => {
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} (%)"
        },
        visualMap: {
          min: 0,
          max: 32,
          text: ["32%", "0%"],
          realtime: false,
          calculable: false,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"]
          }
        },
        series: [
          {
            roam: true,
            name: "Iyou使用人口分布",
            type: "map",
            mapType: "china", 
            itemStyle: {
              normal: {
                label: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: [
              {
                name: "北京",
                value: 5.3
              },
              {
                name: "天津",
                value: 3.8
              },
              {
                name: "上海",
                value: 4.6
              },
              {
                name: "重庆",
                value: 3.6
              },
              {
                name: "河北",
                value: 3.4
              },
              {
                name: "河南",
                value: 88
              },
              {
                name: "云南",
                value: 1.6
              },
              {
                name: "辽宁",
                value: 4.3
              },
              {
                name: "黑龙江",
                value: 4.1
              },
              {
                name: "湖南",
                value: 2.4
              },
              {
                name: "安徽",
                value: 3.3
              },
              {
                name: "山东",
                value: 3.0
              },
              {
                name: "新疆",
                value: 1
              },
              {
                name: "江苏",
                value: 3.9
              },
              {
                name: "浙江",
                value: 3.5
              },
              {
                name: "江西",
                value: 2.0
              },
              {
                name: "湖北",
                value: 2.1
              },
              {
                name: "广西",
                value: 3.0
              },
              {
                name: "甘肃",
                value: 1.2
              },
              {
                name: "山西",
                value: 3.2
              },
              {
                name: "内蒙古",
                value: 3.5
              },
              {
                name: "陕西",
                value: 2.5
              },
              {
                name: "吉林",
                value: 4.5
              },
              {
                name: "福建",
                value: 2.8
              },
              {
                name: "贵州",
                value: 1.8
              },
              {
                name: "广东",
                value: 3.7
              },
              {
                name: "青海",
                value: 0.6
              },
              {
                name: "西藏",
                value: 0.4
              },
              {
                name: "四川",
                value: 3.3
              },
              {
                name: "宁夏",
                value: 0.8
              },
              {
                name: "海南",
                value: 1.9
              },
              {
                name: "台湾",
                value: 0.1
              },
              {
                name: "香港",
                value: 0.1
              },
              {
                name: "澳门",
                value: 0.1
              }
            ],
            nameMap: {
              "Central and Western": "中西区",
              Eastern: "东区",
              Islands: "离岛",
              "Kowloon City": "九龙城",
              "Kwai Tsing": "葵青",
              "Kwun Tong": "观塘",
              North: "北区",
              "Sai Kung": "西贡",
              "Sha Tin": "沙田",
              "Sham Shui Po": "深水埗",
              Southern: "南区",
              "Tai Po": "大埔",
              "Tsuen Wan": "荃湾",
              "Tuen Mun": "屯门",
              "Wan Chai": "湾仔",
              "Wong Tai Sin": "黄大仙",
              "Yau Tsim Mong": "油尖旺",
              "Yuen Long": "元朗"
            }
          }
        ]
      };
      this.mapChart = echarts.init(document.getElementById("map-echarts"));
      this.mapChart.setOption(option);
    });*/
  },
  methods: {
    getLoadUserStatistics() {
      loadUserStatistics().then(res => {
        this.peopleNum = res.data.data;
        this.ageList = this.peopleNum.ageList[0].agemap;
        this.ageTable = this.peopleNum.ageList[0].ageByPercentage;
        this.mapList = this.peopleNum.regionByList
        console.log(this.ageList);
        this.draw();
        this.sexEcharts();
        this.mapDraw();
      });
    },
    draw() {
      // 实例化echarts对象
      var pieId = document.getElementById("age-echarts");
      if (!pieId) {
        return false;
      }
      //var pie = echarts.init(pieId);
      this.charts = echarts.init(document.getElementById("age-echarts"));
      //this.charts = echarts.init(this.$refs.age-echarts);
      // 绘制条形图
      let option = {
        title: {
          /*text: '地区点位、设备核对进度',*/
          top: 5,
          left: "center"
        },
        legend: {
          data: ["衣服" /*, '帽子'*/],
          top: 30
        },
        // X轴
        xAxis: {
          data: ["18-23", "24-29", "30-39", "40-49", "50+"]
        },
        // Y轴
        yAxis: {},
        // 数据
        series: [
          {
            /*name: '衣服',*/
            type: "bar",
            color: "#66b1ff",
            data: [
              this.ageList.stage1,
              this.ageList.stage2,
              this.ageList.stage3,
              this.ageList.stage4,
              this.ageList.stage5
            ],
            //data:this.peopleNum.ageList[0].agemap,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#222",
                    fontSize: 14
                  }
                }
              }
            }
          }
          /*,
                        {
                          name: '帽子',
                          type: 'bar',
                          data: [200, 120, 240, 330, 170]
                        }*/
        ]
      };
      this.charts.setOption(option);
    },
    sexEcharts() {
      this.sexCharts = echarts.init(document.getElementById("sex-echarts"));
      var data = [
        {
          name: "男性",
          value: this.peopleNum.sexCosnamelist[0].male
        },
        {
          name: "女性",
          value: this.peopleNum.sexCosnamelist[0].female
        },
        {
          name: "ios",
          value: this.peopleNum.sexCosnamelist[0].ios
        },
        {
          name: "安卓",
          value: this.peopleNum.sexCosnamelist[0].android
        }
      ];

      var titleArr = [],
        seriesArr = [],
        colors = [
          ["#389af4", "#dfeaff"],
          ["#fd6f97", "#fed4e0"],
          ["#ff8c37", "#ffdcc3"],
          ["#a181fc", "#e3d9fe"]
        ];
      data.forEach(function(item, index) {
        titleArr.push({
          text: item.name,
          left: index * 20 + 10 + "%",
          //top: '65%',
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: "16",
            color: colors[index][0],
            textAlign: "center"
          }
        });
        seriesArr.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: [60, 70],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: [index * 20 + 10 + "%", "50%"],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function(params) {
                    return params.value + "%";
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "20",
                    fontWeight: "bold",
                    color: colors[index][0]
                  }
                }
              }
            },
            {
              value: 100 - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: colors[index][1]
                },
                emphasis: {
                  color: colors[index][1]
                }
              }
            }
          ]
        });
      });

      let option = {
        backgroundColor: "#fff",
        title: titleArr,
        series: seriesArr
      };
      this.sexCharts.setOption(option);
    },
    mapDraw() {
      this.$nextTick(() => {
        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>{c} (%)"
          },
          visualMap: {
            min: 0,
            max: 32,
            text: ["32%", "0%"],
            realtime: false,
            calculable: false,
            inRange: {
              color: ["lightskyblue", "yellow", "orangered"]
            }
          },
          series: [
            {
              roam: true,
              name: "Iyou使用人口分布",
              type: "map",
              mapType: "china",
              itemStyle: {
                normal: {
                  label: {
                    show: true
                  }
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              data: [
                {
                  name: "北京",
                  value: 5.3
                },
                {
                  name: "天津",
                  value: 3.8
                },
                {
                  name: "上海",
                  value: 4.6
                },
                {
                  name: "重庆",
                  value: 3.6
                },
                {
                  name: "河北",
                  value: 3.4
                },
                {
                  name: "河南",
                  value: 88
                },
                {
                  name: "云南",
                  value: 1.6
                },
                {
                  name: "辽宁",
                  value: 4.3
                },
                {
                  name: "黑龙江",
                  value: 4.1
                },
                {
                  name: "湖南",
                  value: 2.4
                },
                {
                  name: "安徽",
                  value: 3.3
                },
                {
                  name: "山东",
                  value: 3.0
                },
                {
                  name: "新疆",
                  value: 1
                },
                {
                  name: "江苏",
                  value: 3.9
                },
                {
                  name: "浙江",
                  value: 3.5
                },
                {
                  name: "江西",
                  value: 2.0
                },
                {
                  name: "湖北",
                  value: 2.1
                },
                {
                  name: "广西",
                  value: 3.0
                },
                {
                  name: "甘肃",
                  value: 1.2
                },
                {
                  name: "山西",
                  value: 3.2
                },
                {
                  name: "内蒙古",
                  value: 3.5
                },
                {
                  name: "陕西",
                  value: 2.5
                },
                {
                  name: "吉林",
                  value: 4.5
                },
                {
                  name: "福建",
                  value: 2.8
                },
                {
                  name: "贵州",
                  value: 1.8
                },
                {
                  name: "广东",
                  value: 3.7
                },
                {
                  name: "青海",
                  value: 0.6
                },
                {
                  name: "西藏",
                  value: 0.4
                },
                {
                  name: "四川",
                  value: 3.3
                },
                {
                  name: "宁夏",
                  value: 0.8
                },
                {
                  name: "海南",
                  value: 1.9
                },
                {
                  name: "台湾",
                  value: 0.1
                },
                {
                  name: "香港",
                  value: 0.1
                },
                {
                  name: "澳门",
                  value: 0.1
                }
              ],
              nameMap: {
                "Central and Western": "中西区",
                Eastern: "东区",
                Islands: "离岛",
                "Kowloon City": "九龙城",
                "Kwai Tsing": "葵青",
                "Kwun Tong": "观塘",
                North: "北区",
                "Sai Kung": "西贡",
                "Sha Tin": "沙田",
                "Sham Shui Po": "深水埗",
                Southern: "南区",
                "Tai Po": "大埔",
                "Tsuen Wan": "荃湾",
                "Tuen Mun": "屯门",
                "Wan Chai": "湾仔",
                "Wong Tai Sin": "黄大仙",
                "Yau Tsim Mong": "油尖旺",
                "Yuen Long": "元朗"
              }
            }
          ]
        };
        this.mapChart = echarts.init(document.getElementById("map-echarts"));
        this.mapChart.setOption(option);
      });
    }
  },
  created() {
    this.getLoadUserStatistics();
  }
};
</script>

<style lang="scss" scoped>
.proportion-wrap {
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

  .sex-wrap {
    .sex-box {
      background-color: #fff;
      border-radius: 5px;
    }

    #sex-echarts {
      width: 1000px;
      height: 300px;
      margin: 0 auto;
      padding-top: 40px;
    }

    .title-wrap {
      display: flex;
      position: relative;
      left: 1300px;
      bottom: 20px;

      .man-wrap {
        display: flex;
        align-items: center;

        span {
          display: block;
          width: 20px;
          height: 20px;
          background-color: #509afd;
        }
      }

      .woman-wrap {
        display: flex;
        margin: 0 30px;
        align-items: center;

        span {
          display: block;
          width: 20px;
          height: 20px;
          background-color: #fc5249;
        }
      }
    }
  }

  .age-wrap {
    p {
      padding: 10px 30px;
    }

    .age-box {
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .age-data {
        #age-echarts {
          width: 600px;
          height: 400px;
        }
      }

      .age-table {
        width: 400px;
      }
    }
  }

  .map-wrap {
    p {
      padding: 10px 30px;
    }

    .map-box {
      height: 700px;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .map-data {
        #map-echarts {
          width: 1000px;
          height: 400px;
        }
      }

      .map-table {
        width: 400px;
      }
    }
  }
}

.el-table__row {
  height: 80px;
}
</style>
