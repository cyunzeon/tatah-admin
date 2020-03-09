<template>
  <div class="jurisdiction-wrap">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="top-wrap">
            <p>
              <i class="el-icon-user-solid"></i>组权限分配
            </p>
            <!-- <div>
              <el-button type="primary" icon="el-icon-refresh">
                刷新
              </el-button>
            </div>-->
          </div>

          <div slot="header" class="header">
            <div>
              <el-button
                type="primary"
                icon="el-icon-edit-outline"
                @click="saveAction"
              >保存</el-button>
            </div>
          </div>
          <table>
            <tr>
              <td>一级模块</td>
              <td>二级模块</td>
              <td>三级模块</td>
              <td>权限分配</td>
            </tr>
            <tr>
              <td rowspan="10">
                <el-checkbox v-model="user">用户信息</el-checkbox>
              </td>
              <td rowspan="7">
                <el-checkbox v-model="userInfo">用户信息管理</el-checkbox>
              </td>
              <td rowspan="7">
                <el-checkbox v-model="userDetail">用户详情</el-checkbox>
              </td>
              <td rowspan="7">
                <el-checkbox v-model="detailLook">用户账户详情</el-checkbox>
                <el-checkbox v-model="detailEdit">编辑</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <!-- <el-checkbox v-model="userAccount">账户明细</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="accountLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <!-- <el-checkbox v-model="userExpenditure">消费记录</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="expenditureLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <!-- <el-checkbox v-model="userEarnings">收益记录</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="earningsLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td>
                <!-- <el-checkbox v-model="topUpLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <!-- <el-checkbox v-model="userWithdraw">提现记录</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="withdrawLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <!-- <el-checkbox v-model="userConversion">兑换记录</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="conversionLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="userCheck">用户审核管理</el-checkbox>
              </td>
              <td>
                <!-- <el-checkbox v-model="userCheckDetail">用户审核详情</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="checkDetailLook">查看</el-checkbox> -->
                <el-checkbox v-model="checkDetailExamine">用户审核</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="club">俱乐部管理</el-checkbox>
              </td>
              <td>
                <!-- <el-checkbox v-model="clubDetail">俱乐部详情</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="clubDetailLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="loseUser">流失用户管理</el-checkbox>
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="loseUserLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td rowspan="5">
                <el-checkbox v-model="contentAd">内容管理</el-checkbox>
              </td>
              <td>
                <el-checkbox v-model="activityAd">广告列表</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="editAd">编辑</el-checkbox>
                <el-checkbox v-model="detelAd">删除</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="indexTk">弹窗列表</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="editTk">编辑</el-checkbox>
                <el-checkbox v-model="detelTk">删除</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="userImg">用户头像管理列表</el-checkbox>
              </td>
              <td>
                <!-- <el-checkbox v-model="headImg">用户头像</el-checkbox> -->
              </td>
              <td>
                <el-checkbox v-model="detelImg">删除</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="reportDetail">用户举报管理列表</el-checkbox>
              </td>
              <td>
                <!-- <el-checkbox v-model="reportDetail">举报详情</el-checkbox> -->
              </td>
              <td>
                <!-- <el-checkbox v-model="addGiftLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="gifts">用户礼物管理列表</el-checkbox>
              </td>
              <td>
                <!-- <el-checkbox v-model="giftDetail">礼物详情</el-checkbox> -->
              </td>
              <td>
                <el-checkbox v-model="addGift">添加礼物</el-checkbox>
                <!-- <el-checkbox v-model="addGiftLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td rowspan="4">
                <el-checkbox v-model="money">财务管理</el-checkbox>
              </td>
              <td>
                <el-checkbox v-model="userTopUp">充值订单列表</el-checkbox>
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="rechargeLook">查看</el-checkbox> -->
                <el-checkbox v-model="addDiamonds">加钻石</el-checkbox>
                <el-checkbox v-model="reduceDiamonds">扣钻石</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="userWithdraw">提现订单列表</el-checkbox>
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="cashLook">查看</el-checkbox> -->
                <el-checkbox v-model="cashHandle">处理提现</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="exchangerate">汇率列表</el-checkbox>
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="cashLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="addDiamondsManage">添加钻石列表</el-checkbox>
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="manageLook">查看</el-checkbox> -->
                <el-checkbox v-model="addHandle">处理审核</el-checkbox>
              </td>
            </tr>
            <tr>
              <td rowspan="2">
                <!-- <el-checkbox v-model="dataTotal">数据统计</el-checkbox> -->
                数据统计
              </td>
              <td>
                <!-- <el-checkbox v-model="dataAnalysis">概览分析</el-checkbox> -->
                概览分析
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="analysiLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td>
                <!-- <el-checkbox v-model="portrait">用户画像</el-checkbox> -->
                用户画像
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="portraitLook">查看</el-checkbox> -->
              </td>
            </tr>
            <tr>
              <td rowspan="1">
                <el-checkbox v-model="games">游戏管理</el-checkbox>
              </td>
              <td>
                <el-checkbox v-model="character">性格测试游戏</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="characterCom">操作性格测试游戏</el-checkbox>
              </td>
            </tr>
            <tr>
              <td rowspan="6">
                <el-checkbox v-model="systems">系统权限管理</el-checkbox>
              </td>
              <td>
                <el-checkbox v-model="systemUser">用户管理</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="editUser">编辑用户</el-checkbox>
                <el-checkbox v-model="detelUser">删除用户</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="systemRole">角色管理</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="editRole">编辑角色</el-checkbox>
                <el-checkbox v-model="detelRole">删除角色</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="jurisdiction">权限管理</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="editJurisdiction">编辑权限</el-checkbox>
                <el-checkbox v-model="detelJurisdiction">删除权限</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="userRole">用户角色管理</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="editUserRole">编辑用户角色</el-checkbox>
                <el-checkbox v-model="detelUserRole">删除用户角色</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="roleJurisdiction">角色权限管理</el-checkbox>
              </td>
              <td></td>
              <td>
                <el-checkbox v-model="setRole">设置角色权限</el-checkbox>
              </td>
            </tr>
            <tr>
              <td>
                <el-checkbox v-model="daily">系统日志</el-checkbox>
              </td>
              <td></td>
              <td>
                <!-- <el-checkbox v-model="dailyLook">查看</el-checkbox> -->
              </td>
            </tr>
          </table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  loadRoleList, //账户列表
  loadRolePermission, //权限
  handlerRolePermission
} from "@/request/api";
export default {
  data() {
    return {
      user: "", //用户管理
      userInfo: "", //用户信息管理
      userDetail: "", //用户详情
      detailLook: "", //用户详情查看
      detailEdit: "", //用户详情编辑
      userAccount: "", //账户明细
      accountLook: "", //账户明细查看
      userExpenditure: "", //消费记录
      expenditureLook: "", //消费记录查看
      userEarnings: "", //收益记录
      earningsLook: "", //收益记录查看
      userTopUp: "", //充值记录
      topUpLook: "", //充值记录查看
      userWithdraw: "", //提现记录
      withdrawLook: "", //提现记录查看
      userConversion: "", //兑换记录
      conversionLook: "", //兑换记录查看
      exchangerate: "", //汇率列表
      userCheck: "", //用户审核管理
      userCheckDetail: "", //用户审核管理详情
      checkDetailLook: "", //用户审核管理查看
      checkDetailExamine: "", //用户审核管理审核
      club: "", //俱乐部
      clubDetail: "", //俱乐部详情
      clubDetailLook: "", //俱乐部详情查看
      loseUser: "", //流失用户管理
      loseUserLook: "", //流失用户管理查看
      contentAd: "", //内容管理
      activityAd: "", //活动广告管理
      editAd: "", //添加广告编辑
      detelAd: "", //添加广告删除
      editTk: "", //添加弹窗编辑
      detelTk: "", //添加弹窗删除
      indexTk: "", //首页弹窗管理
      userImg: "", //用户头像管理
      headImg: "", //用户头像
      detelImg: "", //用户头像删除
      report: "", //用户举报管理
      reportDetail: "", //举报详情
      gifts: "", //礼物列表
      giftDetail: "", //礼物详情
      addGift: "", //举报详情添加礼物
      addGiftLook: "", //举报详情查看
      money: "", //财务管理
      recharge: "", //充值订单管理
      rechargeLook: "", //充值订单管理查看
      addDiamonds: "", //充值订单管理加钻石
      reduceDiamonds: "", //充值订单管理扣钻石
      cash: "", //提现订单管理
      cashLook: "", //提现订单管理查看
      cashHandle: "", //提现订单管理处理
      addDiamondsManage: "", //添加钻石管理
      manageLook: "", //添加钻石管理查看
      addHandle: "", //添加钻石管理处理
      dataTotal: "", //数据统计
      dataAnalysis: "", //概览分析
      analysiLook: "", //概览分析查看
      portrait: "", //用户画像
      portraitLook: "", //用户画像查看
      systemUser: "", //用户管理
      systemRole: "", //角色管理
      jurisdiction: "", //权限管理
      userRole: "", //用户角色管理
      roleJurisdiction: "", //角色权限管理
      editUser: "", //编辑用户
      detelUser: "", //删除用户
      editRole: "", //编辑角色
      detelRole: "", //删除用角色
      editJurisdiction: "", //编辑权限
      detelJurisdiction: "", //删除权限
      editUserRole: "", //编辑用户角色
      detelUserRole: "", //删除用户角色
      setRole: "", //设置角色权限
      daily: "", //系统日志
      dailyLook: "", //系统日志查看
      systems: "",
      games: "",  //游戏管理
      character: "",  //性格测试游戏
      characterCom: "",  //操作性格测试
      form: {
        pageNo: 1,
        pageSize: 100
      },
      nchoose: [
        600,
        700,
        712,
        731,
        500,
        602,
        701,
        704,
        707,
        709,
        710,
        702,
        703,
        705,
        706,
        708,
        711,
        723,
        724,
        727,
        729,
        726,
        728,
        730,
        732,
        742,
        744,
        746,
        733,
        734,
        743,
        501,
        502,
        503,
        504,
        505,
        506,
        507,
        508,
        509,
        510,
        511,
        512,
        513,
        514,
        747,
        748,
        749
      ], //未选择
      choose: [], //选择
      temp: [],
      states: [], //账户列表
      roldList: [],
      roldId: "",
      yjmk: [] //判断一级模块
    };
  },
  methods: {
    getLoadRoleList() {
      loadRoleList().then(res => {
        this.states = res.data.data.array;
      });
    },
    saveAction() {
      //去重
      this.temp = this.nchoose.filter(item => {
        return this.choose.every(item2 => {
          return item != item2;
        });
      });

      console.log("nchoose", this.temp.join(","));
      console.log("choose", this.choose.join(","));

      handlerRolePermission({
        roleId: this.$route.query.roleId,
        checkedIds: this.choose.join(","),
        deleteIds: this.temp.join(",")
      }).then(res => {
        if (res.data.code == 200) {
                  this.$message({
          message: res.data.message,
          type: "success"
        });
        this.getLoadRolePermission();
        } else {
          this.$message.error(res.data.message)
        }
      });

    },
    getLoadRolePermission() {
      loadRolePermission({
        roleId: this.$route.query.roleId
      }).then(res => {
        console.log("选取列表后第一次choose", this.choose);
        this.choose = [];
        this.roldList = res.data.data;
        console.log("切换", this.choose);

        //加载系统日志列表管理
        if (this.roldList[0].array[0].isSelect == 0) {
          this.daily = false;
        } else {
          this.daily = true;
          this.choose.push(this.roldList[0].array[0].permissionId);
        }
        //加载内容管理
        if (this.roldList[1].isSelect == 0) {
          this.contentAd = false;
        } else {
          this.contentAd = true;
          this.choose.push(this.roldList[1].permissionId);
        }
        //加载广告列表
        if (this.roldList[1].array[0].isSelect == 0) {
          this.activityAd = false;
        } else {
          this.activityAd = true;
          this.choose.push(this.roldList[1].array[0].permissionId);
        }
        //加载弹窗列表
        if (this.roldList[1].array[1].isSelect == 0) {
          this.indexTk = false;
        } else {
          this.indexTk = true;
          this.choose.push(this.roldList[1].array[1].permissionId);
        }
        //加载用户头像管理列表
        if (this.roldList[1].array[2].isSelect == 0) {
          this.userImg = false;
        } else {
          this.userImg = true;
          this.choose.push(this.roldList[1].array[2].permissionId);
        }
        //加载用户举报管理列表
        if (this.roldList[1].array[3].isSelect == 0) {
          this.reportDetail = false;
        } else {
          this.reportDetail = true;
          this.choose.push(this.roldList[1].array[3].permissionId);
        }
        //加载用户礼物管理列表
        if (this.roldList[1].array[4].isSelect == 0) {
          this.gifts = false;
        } else {
          this.gifts = true;
          this.choose.push(this.roldList[1].array[4].permissionId);
        }
        //加载操作广告
        if (this.roldList[1].array[5].isSelect == 0) {
          this.editAd = false;
        } else {
          this.editAd = true;
          this.choose.push(this.roldList[1].array[5].permissionId);
        }
        //加载删除广告
        if (this.roldList[1].array[6].isSelect == 0) {
          this.detelAd = false;
        } else {
          this.detelAd = true;
          this.choose.push(this.roldList[1].array[6].permissionId);
        }
        //加载操作弹窗
        if (this.roldList[1].array[7].isSelect == 0) {
          this.editTk = false;
        } else {
          this.editTk = true;
          this.choose.push(this.roldList[1].array[7].permissionId);
        }
        //加载删除弹窗
        if (this.roldList[1].array[8].isSelect == 0) {
          this.detelTk = false;
        } else {
          this.detelTk = true;
          this.choose.push(this.roldList[1].array[8].permissionId);
        }
        //加载删除头像
        if (this.roldList[1].array[9].isSelect == 0) {
          this.detelImg = false;
        } else {
          this.detelImg = true;
          this.choose.push(this.roldList[1].array[9].permissionId);
        }
        //加载操作礼物
        if (this.roldList[1].array[10].isSelect == 0) {
          this.addGift = false;
        } else {
          this.addGift = true;
          this.choose.push(this.roldList[1].array[10].permissionId);
        }
        //加载财务管理
        if (this.roldList[2].isSelect == 0) {
          this.money = false;
        } else {
          this.money = true;
          this.choose.push(this.roldList[2].permissionId);
        }
        //加载汇率列表
        if (this.roldList[2].array[0].isSelect == 0) {
          this.exchangerate = false;
        } else {
          this.exchangerate = true;
          this.choose.push(this.roldList[2].array[0].permissionId);
        }
        //加载充值列表
        if (this.roldList[2].array[1].isSelect == 0) {
          this.userTopUp = false;
        } else {
          this.userTopUp = true;
          this.choose.push(this.roldList[2].array[1].permissionId);
        }
        //加载提现订单列表
        if (this.roldList[2].array[2].isSelect == 0) {
          this.userWithdraw = false;
        } else {
          this.userWithdraw = true;
          this.choose.push(this.roldList[2].array[2].permissionId);
        }
        //加载加钻石审批列表
        if (this.roldList[2].array[3].isSelect == 0) {
          this.addDiamondsManage = false;
        } else {
          this.addDiamondsManage = true;
          this.choose.push(this.roldList[2].array[3].permissionId);
        }
        //加载加钻石
        if (this.roldList[2].array[4].isSelect == 0) {
          this.addDiamonds = false;
        } else {
          this.addDiamonds = true;
          this.choose.push(this.roldList[2].array[4].permissionId);
        }
        //加载扣钻石
        if (this.roldList[2].array[5].isSelect == 0) {
          this.reduceDiamonds = false;
        } else {
          this.reduceDiamonds = true;
          this.choose.push(this.roldList[2].array[5].permissionId);
        }
        //加载提现审批
        if (this.roldList[2].array[6].isSelect == 0) {
          this.cashHandle = false;
        } else {
          this.cashHandle = true;
          this.choose.push(this.roldList[2].array[6].permissionId);
        }
        //加载钻石审核
        if (this.roldList[2].array[7].isSelect == 0) {
          this.addHandle = false;
        } else {
          this.addHandle = true;
          this.choose.push(this.roldList[2].array[7].permissionId);
        }
        //加载用户管理
        if (this.roldList[3].isSelect == 0) {
          this.user = false;
        } else {
          this.user = true;
          this.choose.push(this.roldList[3].permissionId);
        }
        //加载用户信息管理列表
        if (this.roldList[3].array[0].isSelect == 0) {
          this.userInfo = false;
        } else {
          this.userInfo = true;
          this.choose.push(this.roldList[3].array[0].permissionId);
        }
        //加载用户审核列表
        if (this.roldList[3].array[1].isSelect == 0) {
          this.userCheck = false;
        } else {
          this.userCheck = true;
          this.choose.push(this.roldList[3].array[1].permissionId);
        }
        //加载俱乐部列表
        if (this.roldList[3].array[2].isSelect == 0) {
          this.club = false;
        } else {
          this.club = true;
          this.choose.push(this.roldList[3].array[2].permissionId);
        }
        //加载流失用管理列表
        if (this.roldList[3].array[3].isSelect == 0) {
          this.loseUser = false;
        } else {
          this.loseUser = true;
          this.choose.push(this.roldList[3].array[3].permissionId);
        }
        //加载用户详情
        if (this.roldList[3].array[4].isSelect == 0) {
          this.userDetail = false;
        } else {
          this.userDetail = true;
          this.choose.push(this.roldList[3].array[4].permissionId);
        }
        //加载用户账户详情
        if (this.roldList[3].array[5].isSelect == 0) {
          this.detailLook = false;
        } else {
          this.detailLook = true;
          this.choose.push(this.roldList[3].array[5].permissionId);
        }
        //加载用户审核
        if (this.roldList[3].array[6].isSelect == 0) {
          this.checkDetailExamine = false;
        } else {
          this.checkDetailExamine = true;
          this.choose.push(this.roldList[3].array[6].permissionId);
        }

        //加载游戏管理
        if (this.roldList[4].isSelect == 0) {
          this.games = false;
        } else {
          this.games = true;
          this.choose.push(this.roldList[4].permissionId);
        }
        //加载性格游戏
        if (this.roldList[4].array[0].isSelect == 0) {
          this.character = false;
        } else {
          this.character = true;
          this.choose.push(this.roldList[4].array[0].permissionId);
        }
        //加载操作性格游戏
        if (this.roldList[4].array[1].isSelect == 0) {
          this.characterCom = false;
        } else {
          this.characterCom = true;
          this.choose.push(this.roldList[4].array[1].permissionId);
        }
                //加载系统管理
        if (this.roldList[5].isSelect == 0) {
          this.systems = false;
        } else {
          this.systems = true;
          this.choose.push(this.roldList[5].permissionId);
        }
        //加载用户管理
        if (this.roldList[5].array[0].isSelect == 0) {
          this.systemUser = false;
        } else {
          this.systemUser = true;
          this.choose.push(this.roldList[5].array[0].permissionId);
        }
        //加载角色管理
        if (this.roldList[5].array[1].isSelect == 0) {
          this.systemRole = false;
        } else {
          this.systemRole = true;
          this.choose.push(this.roldList[5].array[1].permissionId);
        }
        //加载权限管理
        if (this.roldList[5].array[2].isSelect == 0) {
          this.jurisdiction = false;
        } else {
          this.jurisdiction = true;
          this.choose.push(this.roldList[5].array[2].permissionId);
        }
        //加载用户角色管理
        if (this.roldList[5].array[3].isSelect == 0) {
          this.userRole = false;
        } else {
          this.userRole = true;
          this.choose.push(this.roldList[5].array[3].permissionId);
        }
        //加载角色权限管理
        if (this.roldList[5].array[4].isSelect == 0) {
          this.roleJurisdiction = false;
        } else {
          this.roleJurisdiction = true;
          this.choose.push(this.roldList[5].array[4].permissionId);
        }
        //加载编辑用户
        if (this.roldList[5].array[5].isSelect == 0) {
          this.editUser = false;
        } else {
          this.editUser = true;
          this.choose.push(this.roldList[5].array[5].permissionId);
        }
        //加载删除用户
        if (this.roldList[5].array[6].isSelect == 0) {
          this.detelUser = false;
        } else {
          this.detelUser = true;
          this.choose.push(this.roldList[5].array[6].permissionId);
        }
        //加载编辑角色
        if (this.roldList[5].array[7].isSelect == 0) {
          this.editRole = false;
        } else {
          this.editRole = true;
          this.choose.push(this.roldList[5].array[7].permissionId);
        }
        //加载删除用户角色
        if (this.roldList[5].array[8].isSelect == 0) {
          this.detelRole = false;
        } else {
          this.detelRole = true;
          this.choose.push(this.roldList[5].array[8].permissionId);
        }
        //加载编辑权限
        if (this.roldList[5].array[9].isSelect == 0) {
          this.editJurisdiction = false;
        } else {
          this.editJurisdiction = true;
          this.choose.push(this.roldList[5].array[9].permissionId);
        }
        //加载删除权限
        if (this.roldList[5].array[10].isSelect == 0) {
          this.detelJurisdiction = false;
        } else {
          this.detelJurisdiction = true;
          this.choose.push(this.roldList[5].array[10].permissionId);
        }
        //加载编辑用户角色
        if (this.roldList[5].array[11].isSelect == 0) {
          this.editUserRole = false;
        } else {
          this.editUserRole = true;
          this.choose.push(this.roldList[5].array[11].permissionId);
        }
        //加载删除用户角色
        if (this.roldList[5].array[12].isSelect == 0) {
          this.detelUserRole = false;
        } else {
          this.detelUserRole = true;
          this.choose.push(this.roldList[5].array[12].permissionId);
        }
        //加载设置角色权限
        if (this.roldList[5].array[13].isSelect == 0) {
          this.setRole = false;
        } else {
          this.setRole = true;
          this.choose.push(this.roldList[5].array[13].permissionId);
        }
        console.log("选取后加载choose", this.choose);
      });
    }
  },
  created() {
    this.getLoadRoleList();
    this.getLoadRolePermission();
  },
  mounted() {},
  watch: {
    user(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].permissionId) == -1) {
          this.choose.push(this.roldList[3].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].permissionId
        );
      }
    },
        games(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[4].permissionId) == -1) {
          this.choose.push(this.roldList[4].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[4].permissionId
        );
      }
    },
            character(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[4].array[0].permissionId) == -1) {
          this.choose.push(this.roldList[4].array[0].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[4].array[0].permissionId
        );
      }
    },
            characterCom(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[4].array[1].permissionId) == -1) {
          this.choose.push(this.roldList[4].array[1].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[4].array[1].permissionId
        );
      }
    },

    systems(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].permissionId) == -1) {
          this.choose.push(this.roldList[5].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].permissionId
        );
      }
    },
    daily(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[0].array[0].permissionId) == -1) {
          this.choose.push(this.roldList[0].array[0].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[0].array[0].permissionId
        );
      }
    },
    contentAd(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].permissionId) == -1) {
          this.choose.push(this.roldList[1].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].permissionId
        );
      }
    },
    activityAd(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[0].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[0].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[0].permissionId
        );
      }
    },
    indexTk(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[1].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[1].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[1].permissionId
        );
      }
    },
    userImg(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[2].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[2].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[2].permissionId
        );
      }
    },
    reportDetail(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[3].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[3].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[3].permissionId
        );
      }
    },
    gifts(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[4].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[4].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[4].permissionId
        );
      }
    },
    editAd(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[5].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[5].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[5].permissionId
        );
      }
    },
    detelAd(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[6].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[6].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[6].permissionId
        );
      }
    },
    editTk(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[7].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[7].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[7].permissionId
        );
      }
    },
    detelTk(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[8].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[8].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[8].permissionId
        );
      }
    },
    detelImg(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[1].array[9].permissionId) == -1) {
          this.choose.push(this.roldList[1].array[9].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[9].permissionId
        );
      }
    },
    addGift(newVal, oldVal) {
      if (newVal == true) {
        if (
          this.choose.indexOf(this.roldList[1].array[10].permissionId) == -1
        ) {
          this.choose.push(this.roldList[1].array[10].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[1].array[10].permissionId
        );
      }
    },
    money(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].permissionId) == -1) {
          this.choose.push(this.roldList[2].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].permissionId
        );
      }
    },
    exchangerate(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[0].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[0].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[0].permissionId
        );
      }
    },
    userTopUp(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[1].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[1].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[1].permissionId
        );
      }
    },
    userWithdraw(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[2].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[2].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[2].permissionId
        );
      }
    },
    addDiamondsManage(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[3].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[3].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[3].permissionId
        );
      }
    },
    addDiamonds(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[4].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[4].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[4].permissionId
        );
      }
    },
    reduceDiamonds(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[5].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[5].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[5].permissionId
        );
      }
    },
    cashHandle(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[6].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[6].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[6].permissionId
        );
      }
    },
    addHandle(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[2].array[7].permissionId) == -1) {
          this.choose.push(this.roldList[2].array[7].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[2].array[7].permissionId
        );
      }
    },
    userInfo(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].array[0].permissionId) == -1) {
          this.choose.push(this.roldList[3].array[0].permissionId);
          console.log("test", this.roldList[3].array[0].permissionId);
          console.log("选取", this.choose);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].array[0].permissionId
        );
        console.log("取消", this.choose);
      }
    },
    userCheck(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].array[1].permissionId) == -1) {
          this.choose.push(this.roldList[3].array[1].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].array[1].permissionId
        );
      }
    },
    club(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].array[2].permissionId) == -1) {
          this.choose.push(this.roldList[3].array[2].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].array[2].permissionId
        );
      }
    },
    loseUser(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].array[3].permissionId) == -1) {
          this.choose.push(this.roldList[3].array[3].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].array[3].permissionId
        );
      }
    },
    userDetail(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].array[4].permissionId) == -1) {
          this.choose.push(this.roldList[3].array[4].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].array[4].permissionId
        );
      }
    },
    detailLook(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].array[5].permissionId) == -1) {
          this.choose.push(this.roldList[3].array[5].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].array[5].permissionId
        );
      }
    },
    checkDetailExamine(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[3].array[6].permissionId) == -1) {
          this.choose.push(this.roldList[3].array[6].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[3].array[6].permissionId
        );
      }
    },
    systemUser(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[0].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[0].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[0].permissionId
        );
      }
    },
    systemRole(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[1].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[1].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[1].permissionId
        );
      }
    },
    jurisdiction(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[2].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[2].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[2].permissionId
        );
      }
    },
    userRole(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[3].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[3].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[3].permissionId
        );
      }
    },
    roleJurisdiction(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[4].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[4].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[4].permissionId
        );
      }
    },
    editUser(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[5].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[5].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[5].permissionId
        );
      }
    },
    detelUser(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[6].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[6].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[6].permissionId
        );
      }
    },
    editRole(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[7].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[7].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[7].permissionId
        );
      }
    },
    detelRole(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[8].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[8].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[8].permissionId
        );
      }
    },
    editJurisdiction(newVal, oldVal) {
      if (newVal == true) {
        if (this.choose.indexOf(this.roldList[5].array[9].permissionId) == -1) {
          this.choose.push(this.roldList[5].array[9].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[9].permissionId
        );
      }
    },
    detelJurisdiction(newVal, oldVal) {
      if (newVal == true) {
        if (
          this.choose.indexOf(this.roldList[5].array[10].permissionId) == -1
        ) {
          this.choose.push(this.roldList[5].array[10].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[10].permissionId
        );
      }
    },
    editUserRole(newVal, oldVal) {
      if (newVal == true) {
        if (
          this.choose.indexOf(this.roldList[5].array[11].permissionId) == -1
        ) {
          this.choose.push(this.roldList[5].array[11].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[11].permissionId
        );
      }
    },
    detelUserRole(newVal, oldVal) {
      if (newVal == true) {
        if (
          this.choose.indexOf(this.roldList[5].array[12].permissionId) == -1
        ) {
          this.choose.push(this.roldList[5].array[12].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[12].permissionId
        );
      }
    },
    setRole(newVal, oldVal) {
      if (newVal == true) {
        if (
          this.choose.indexOf(this.roldList[5].array[13].permissionId) == -1
        ) {
          this.choose.push(this.roldList[5].array[13].permissionId);
        }
      } else {
        this.choose = this.choose.filter(
          t => t != this.roldList[5].array[13].permissionId
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.jurisdiction-wrap {
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

  .header {
    display: flex;
    justify-content: space-between;
  }
}

.el-select {
  margin-left: 20px;
  width: 240px;
}
</style>
