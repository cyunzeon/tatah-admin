<template>
  <el-tree :data="idList" node-key="onlyId" ref="tree" highlight-current :props="defaultProps" @check='slesCheck' @node-click="handleNodeClick" v-if="idList">
  </el-tree>
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
                label: '用户注册审核',
                url: '/userCheck'
              },
              {
                label: '俱乐部管理',
                url: '/userClub'
              },
              {
                label: '流失用户管理',
                url: '/loseUser'
              },{
                label: '用户实名审核',
                url: '/realName'
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
              },{
                label: '用户视频管理',
                url: '/uservideo'
              },
              {
                label: '用户举报管理',
                url: '/report'
              },{
                label: '用户动态管理',
                url: '/dynamic'
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
              url: '/character'
            },{
              label: '冒险游戏',
              url: '/adventure'
            } ]
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
              },
              {
                label: '订单补单审核',
                url: '/supplement'
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
          label: 'title'
        },
        idList: [],
        dataList: [],
        idWrap: []
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
        let currentPath = this.$route.path;
        if (currentPath == data.href) {
          return
        }
        if (data.href) {
          this.$router.push(data.href)
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
          this.idList = res.data.data.slice(0, 6);
          //this.dataList = res.data.data;
          console.log(res.data.data.slice(4, 6))
          /*this.idList.push(res.data.data.slice(2, 3)[0]);
          this.idList.push(res.data.data.slice(0, 1)[0]);
          this.idList.push(res.data.data.slice(3, 4)[0]);
          this.idList.push(res.data.data.slice(1, 2)[0]);
          this.idList.push(res.data.data.slice(4, 5)[0]);
          this.idList.push(res.data.data.slice(5, 6)[0]);*/
          //this.idList = res.data.data.slice(0, 6);
          /*this.idList.map(item => {
            console.log('item', typeof(item))
              this.idWrap.push(item.onlyId);
          })*/

        })
      },
      slesCheck() {
        let parentArr = this.$refs.tree.getHalfCheckedKeys()
        let childArr = this.$refs.tree.getCheckedKeys()
        this.addRoleForm.rolePower = parentArr.concat(childArr)
      }

    },
    created() {
      this.checkAuth();
      this.getLoadMenuInfo();
    }
  };

</script>
