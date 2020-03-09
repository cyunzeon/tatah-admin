<template>
  <div class="login-bg">
    <div class="login">
      <div class="message">管理登录</div>
      <div id="darkbannerwrap"></div>
      <div class="info">
        <p v-show='info'>{{info}}</p>
      </div>
      <input name="username" v-model="username" placeholder="用户名" type="text" class="layui-input">
      <hr class="hr15">
      <input name="password" v-model="password" placeholder="密码" type="password" class="layui-input">
      <hr class="hr15">
      <input value="登录" style="width:100%;" type="submit" id="login" @click="loginAction">
      <hr class="hr20">
    </div>
  </div>

</template>
<script>
  import {
    iULogin,
    loadMenuInfo
  } from '@/request/api'
  export default {
    data() {
      return {
        info: '',
        username: '',
        password: ''
      }
    },
    methods: {
      loginAction() {
        const self = this;
        iULogin({
          'account': self.username,
          'password': self.password
        }).then(res => {
          if (res.data.code == 200) {
            let token = res.data.data.sessionId;
            let userName = res.data.data.userName;
            sessionStorage.setItem('tata_username', userName);
            sessionStorage.setItem('tata_token', token);
            self.$router.push('/');
          } else {
            this.$message.error(res.data.message);
          }

        })
      }
    }
  };

</script>
<style lang="less" scoped>
  @import '../assets/style/varibles.less';

  .login-bg {
    height: 100%;
    background: url(../assets/img/bg.png) no-repeat center;
    background-size: cover;
    overflow: hidden;
  }

  .info {
    padding: 0 0 5px;
    height: 25px;
    line-height: 25px;
    color: #f00;
    font-size: 12px;
  }

  .login {
    margin: 120px auto 0 auto;
    min-height: 420px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    /* overflow-x: hidden; */
    box-sizing: border-box;
  }

  .login a.logo {
    display: block;
    height: 58px;
    width: 167px;
    margin: 0 auto 30px auto;
    background-size: 167px 42px;
  }

  .login .message {
    margin: 10px 0 0 0;
    padding: 18px 10px 18px 0;
    background: @mainColor;
    position: relative;
    color: #fff;
    font-size: 16px;
  }

  .login #darkbannerwrap {
    width: 18px;
    height: 1px;
    margin: 0 0 20px -58px;
    position: relative;
  }

  .login input[type=text],
  .login input[type=file],
  .login input[type=password],
  .login input[type=email],
  select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .login input[type=text]:focus,
  .login input[type=file]:focus,
  .login input[type=password]:focus,
  .login input[type=email]:focus,
  select:focus {
    border: 1px solid #27A9E3;
  }

  .login input[type=submit],
  .login input[type=button] {
    display: inline-block;
    vertical-align: middle;
    padding: 12px 24px;
    margin: 0px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    color: #ffffff;
    background: @mainColor;
    border-radius: 3px;
    border: none;
    -webkit-appearance: none;
    outline: none;
    width: 100%;
  }

  .login hr {
    background: #fff;
  }

  .login hr.hr15 {
    height: 15px;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
  }

  .login hr.hr20 {
    height: 20px;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
  }

</style>
