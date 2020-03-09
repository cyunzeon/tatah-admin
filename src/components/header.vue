<template>
	<el-row type="flex" class="row-bg" justify="space-between">
	  <el-col :span="9" class='login'>后台管理系统</el-col>
	  <el-col :span="3" class='flex-right'>
	  	<div class="user-box">
	  		<img :src="uerUrl" />
	  		<span>{{userName}}</span>
	  		&nbsp;&nbsp;|&nbsp;&nbsp;
	  		<span @click="outAction">退出</span>
	  	</div>
	  </el-col>
	</el-row>
</template>
<script>
	  import {
		loginOut
  } from '@/request/api'
	export default{
		data(){
			return{
				uerUrl:require('../assets/img/usermr.png'),
				userName: ''
			}
		},
		methods: {
			outAction() {
				loginOut().then(res => {
					sessionStorage.removeItem('tata_username')
                    sessionStorage.removeItem('tata_token')
                    this.$router.replace('/login');
				})
			}
		},
		created() {
			this.userName = sessionStorage.getItem('tata_username')
		}
	};
</script>
<style lang="less" scoped>
	.login{
		font-size: 20px;
		text-align: left;
	}
	.user-box{
		img{
			width: 30px;
			height: 30px;
			margin-right: 5px;
		}
		a{
			color: #fff;
		}
	}
</style>