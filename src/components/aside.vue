<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>
<script>
  import {
    loadMenuInfo
  } from '@/request/api';
  export default {
    data() {
      return {
        data: [{
            label: '用户管理',
            children: [{
                label: '用户信息管理',
                url: '/userInfo',
              },
              {
                label: '用户审核管理',
                url: '/userCheck'
              },
              {
                label: '俱乐部管理',
                url: '/userClub'
              },
              {
                label: '流失用户管理',
                url: '/loseUser'
              },
            ]
          },
          {
            label: '内容管理',
            children: [{
                label: '活动广告管理',
                url: '/activityAd'
              },
              {
                label: '首页弹窗管理',
                url: '/indexTk'
              },
              {
                label: '用户头像管理',
                url: '/contentUserImg'
              },
              {
                label: '用户举报管理',
                url: '/report'
              },
              {
                label: '用户礼物管理',
                url: '/gift'
              },
            ]
          },
          {
            label: '游戏管理',
            children: [{
              label: '性格测试游戏',
              url: '/games'
            }, ]
          },
          {
            label: '财务管理',
            children: [{
                label: '充值订单管理',
                url: '/recharge'
              },
              {
                label: '提现订单管理',
                url: '/cash'
              },
              {
                label: '添加钻石审核',
                url: '/addDiamonds'
              }
            ]
          },
          {
            label: '数据统计',
            children: [{
                label: '数据分析',
                url: '/analysis'
              },
              {
                label: '用户画像',
                url: '/proportion'
              },
            ]
          },
          {
            label: '系统管理',
            children: [{
                label: '帐号管理',
                url: '/account'
              },
              {
                label: '用户角色设置',
                url: '/userrole'
              }, {
                label: '角色设置',
                url: '/role'
              },
              {
                label: '系统日志',
                url: '/daily'
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        idList: [],
        idWrap: []
      }
    },
    methods: {
      handleNodeClick(data) {
        let currentPath = this.$route.path;
        if (currentPath == data.url) {
          return
        }
        if (data.url) {
          this.$router.push(data.url)
        }
      },
      checkAuth() {
        let token = sessionStorage.getItem('tata_token');
        if (!token) {
          this.$router.replace('/login');
        }
      },
      getLoadMenuInfo() {
        loadMenuInfo().then(res => {
          this.idList = res.data.data;
          this.idList.map(item => {
            //console.log(item.onlyId)
            this.idWrap.push(item.onlyId);
            //console.log(this.idWrap)
          })

        })
      }
    },
    created() {
      this.checkAuth();
      this.getLoadMenuInfo();
    }
  };

</script>
