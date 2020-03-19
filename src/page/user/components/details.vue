<template>
  <div>
    <el-row class="box">
      <el-col :span="4" class="user-img">
        <img :src="infoList.head" />
        <span class="tab">lv{{infoList.viplevel}}</span>
        <el-button type="primary" round size="small" class="mt30" @click="goUrl">编辑信息</el-button>
      </el-col>
      <el-col :span="20">
        <table class="table">
          <tr>
            <td>用户ID</td>
            <td>{{infoList.userid}}</td>
            <td>手机号</td>
            <td>{{infoList.mobileno}}</td>
          </tr>
          <tr>
            <td>昵称</td>
            <td>{{infoList.nickname}}</td>
            <td>性别</td>
            <td>
              <span v-if="infoList.gender==1">男</span>
              <span v-else-if="infoList.gender==0">女</span>
              <span v-else></span>
            </td>
          </tr>
          <tr>
            <td>生日</td>
            <td>{{infoList.birthday}}</td>
            <td>身高</td>
            <td>{{infoList.height}}</td>
          </tr>
          <tr>
            <td>体重</td>
            <td>{{infoList.weight}}</td>
            <td>学历</td>
            <td>{{infoList.educational}}</td>
          </tr>
          <tr>
            <td>家乡</td>
            <td>{{infoList.hometown}}</td>
            <td>注册时间</td>
            <td>{{infoList.adddate}}</td>
          </tr>
          <tr>
            <td>活跃时间</td>
            <td>{{infoList.activedate}}</td>
            <td>帐户状态</td>
            <td>
              <span v-if="infoList.state==1">正常</span>
              <span v-else-if="infoList.state==0">注销</span>
              <span v-else></span>
            </td>
          </tr>
          <tr>
            <td>真实姓名</td>
            <td>{{infoList.crealname}}</td>
            <td>身份证号码</td>
            <td>{{infoList.idCard}}</td>
          </tr>
          <tr>
            <td>银行名称</td>
            <td>{{infoList.bankName}}</td>
            <td>银行卡号</td>
            <td>{{infoList.bankCard}}</td>
          </tr>
          <tr>
            <td>支行名称</td>
            <td>{{infoList.bankBranchName}}</td>
            <td>支付宝帐号</td>
            <td>{{infoList.alipayCcount}}</td>
          </tr>
          <tr>
            <td>个人描述</td>
            <td colspan="3">{{infoList.csignature}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <div class="box">
      <h3 class="title">
        <i class="el-icon-user-solid"></i>帐户信息
      </h3>
      <div class="p10">
        <table class="tables">
          <tr>
            <td>钻石余额</td>
            <td>{{accountList.jewel}}</td>
            <td>金币余额</td>
            <td>{{accountList.goldcoin}}</td>
            <td>累计送出礼物</td>
            <td>{{accountList.Ijewelcost}}</td>
            <td>累计获得礼物</td>
            <td>{{accountList.jewelincome}}</td>
          </tr>
          <tr>
            <td>充值总额</td>
            <td>{{accountList.fillmoney}}</td>
            <td>提现总额</td>
            <td>{{accountList.Icash}}</td>
            <td>好友总数</td>
            <td>{{accountList.friendCount}}</td>
            <td>创建俱乐部总数</td>
            <td>{{accountList.groupSum}}</td>
          </tr>
          <tr>
            <td>俱乐部总数</td>
            <td>{{accountList.group}}</td>
            <td>发布动态总数</td>
            <td>{{accountList.circleArticle}}</td>
            <td>举报数</td>
            <td>{{accountList.Report}}</td>
            <td>被举报数</td>
            <td>{{accountList.coverReport}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="box">
      <h3 class="title">
        <i class="el-icon-user-solid"></i>过审信息
      </h3>
      <div class="p10">
        <table class="table2">
          <tr>
            <th style="width: 50%;">照片</th>
            <th>视频</th>
          </tr>
          <tr>
            <td class="photo-wrap">
              <template v-if="infoList.photo1 == ''">
                <p>暂无照片</p>
              </template>
              <template v-else>
                <img :src="infoList.photo1" alt />
                <img :src="infoList.photo2" alt />
              </template>
            </td>
            <td>
              <video
                muted
                width="700"
                height="400"
                autoplay
                loop
                controls="controls"
                v-if="infoList.uservideo != ''"
              >
                <source :src="infoList.uservideo" type="video/mp4" />您的浏览器不支持 video 标签
              </video>
              <p v-else>暂无视频</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { loadUserVerifyInfo, loadUserAccountInfo } from "@/request/api";
export default {
  data() {
    return {
      infoList: "",
      accountList: "",
    };
  },
  methods: {
    goUrl() {
      this.$router.push({
        path: "/userInfo/edit",
        query: {
          userId: this.infoList.userid,
          state: this.infoList.state,
          crealname: this.infoList.crealname,
          idCard: this.infoList.idCard,
          bankBranchName: this.infoList.bankBranchName,
          csignature: this.infoList.csignature,
          alipayCcount: this.infoList.alipayCcount,
          bankCard: this.infoList.bankCard
        }
      });
    },
    getLoadUserVerifyInfo() {
      loadUserVerifyInfo({
        userId: this.$route.query.userid
      }).then(res => {
        if (res.data.code == 200) {
          this.infoList = res.data.data;
          console.log(this.infoList.uservideo)
        }
      });
    },
    getLoadUserAccountInfo() {
      loadUserAccountInfo({
        userId: this.$route.query.userid
      }).then(res => {
        if (res.data.code == 200) {
          this.accountList = res.data.data;
        }
      });
    }
  },
  created() {
    this.getLoadUserVerifyInfo();
    this.getLoadUserAccountInfo();
  }
};
</script>
<style lang='less' scoped>
.box {
  background: #fff;
  margin-bottom: 10px;
}

.user-img {
  padding: 60px 0;
  text-align: center;

  img {
    width: 120px;
    height: 120px;
    display: block;
    margin: auto;
  }

  .tab {
    width: 20px;
    display: block;
    margin: 15px auto;
    padding: 0 10px;
    background: #f56c6c;
    color: #fff;
    border-radius: 10px;
  }
}

.table {
  td {
    padding: 8px 0;
    font-size: 14px;

    &:nth-child(odd) {
      width: 15%;
      border: 1px #f8f8f8 solid;
      background: #f8f8f8;
    }

    &:nth-child(even) {
      width: 35%;
      border: 1px #f8f8f8 solid;
    }
  }
}

.tables {
  td {
    padding: 8px 0;
    font-size: 14px;
    width: 12.5%;

    &:nth-child(odd) {
      border: 1px #f8f8f8 solid;
      background: #f8f8f8;
    }

    &:nth-child(even) {
      border: 1px #f8f8f8 solid;
    }
  }
}

.table2 {
  th {
    background: #f8f8f8;
  }

  .photo-wrap {
    display: flex;
    justify-content: space-around;

    img {
      width: 350px;
      height: 350px;
      padding: 28px 0;
    }
  }
}
</style>
