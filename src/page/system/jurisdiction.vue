<template>
  <div class="jurisdiction-wrap">
    <div class="top-wrap">
      <p>
        <i class="el-icon-user-solid"></i>组权限分配
      </p>
      <el-button type="primary" icon="el-icon-edit" @click="save">
        保存
      </el-button>
    </div>

    <el-form ref="form" label-width="100px" class="form-wrap">
      <el-form-item>
        <div class="check-group" v-for="(item, index) in roldList" :key="index">
          <!-- <el-checkbox :label="item.permissionId" @change="handleCheckChange(item.permissionId)">{{item.permissionName}}</el-checkbox> -->
          <el-tag>{{item.permissionName}}</el-tag>
          <el-checkbox-group v-model="checkedEquipments[index]">
            {{checkedEquipments[index]}}
            <el-checkbox v-for="data in item.array" :label="data.permissionId" :key="data.permissionName"
              @change="handleCheckAllChange(data.permissionId)">
              {{data.permissionName}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    loadRolePermission, //权限
    handlerRolePermission,
    loadPermissionList
  } from "@/request/api";
  export default {
    data() {
      return {
        roldList: [],
        states: [],
        all: [], //所有权限
        firstList: [], //加载当前拥有的权限
        checkEquipArr: [], //选择以后的权限
        checkedEquipments: [], //随意修改后的checked项（即要传到后台的变更数据）,
        checkedIds: [],
        deleteIds: [],
        parentArr: ["500", "700", "712", "731", "750", "762", "765"],
        firstLists: [],
        uncheck: []
      };
    },
    methods: {
      save() {
        //去重
        this.checkedIds = this.checkEquipArr.filter(items => {
          return this.firstList.every(items2 => {
            return items != items2;
          });
        });
        this.uncheck = this.all.filter(items5 => {
          return this.parentArr.every(items6 => {
            return items5 != items6;
          });
        });
        this.deleteIds = this.uncheck.filter(items3 => {
          return this.checkEquipArr.every(items4 => {
            return items3 != items4;
          });
        });
        console.log('传选中', this.checkedIds)
        console.log('传不选中', this.deleteIds)

        handlerRolePermission({
          checkedIds: this.checkedIds.join(','),
          deleteIds: this.deleteIds.join(','),
          roleId: this.$route.query.roleId
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getLoadRolePermission();
            //this.$router.go(0);
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleCheckChange(event) {

      },
      handleCheckAllChange(event) {
        console.log(event)
        this.checkEquipArr = [];
        let arr = this.checkedEquipments;
        console.log('arr', arr)
        for (let i = 0; i < arr.length; i++) {
          let roldList = arr[i];
          for (let j = 0; j < roldList.length; j++) {
            this.checkEquipArr.push(roldList[j]);
          }
        }
        console.log('所有选中', this.checkEquipArr);
      },
      getLoadPermissionList() {
        loadPermissionList().then(res => {
          this.states = res.data.data.array;
          for (let j = 0; j < this.states.length; j++) {
            this.all.push(this.states[j].cpermissionid);
          }
          console.log('all', this.all)
        });
      },
      delete(i) {
        var index = this.all.indexOf(i);
        this.all.splice(index, 1)
      },
      getLoadRolePermission() {
        loadRolePermission({
          roleId: this.$route.query.roleId
        }).then(res => {
          this.roldList = res.data.data;
          // 初始化默认选中状态
          for (let i = 0; i < this.roldList.length; i++) {
            let checkArr = [];
            let testcheckArr = [];
            let item = this.roldList[i];
            //let item = this.roldList[i].array;
            //let items = this.roldList[i];

            if (item.array.length === 0) {
              this.checkedEquipments.push([])
            } else {
              for (let j = 0; j < item.array.length; j++) {
                if (item.array[j].isSelect == 1) {
                  checkArr.push(item.array[j].permissionId)
                }
              }
              this.checkedEquipments.push(checkArr);
            }

            /*if (items.length === 0) {
              this.test.push([])
            } else {
              if (items[i].isSelect == 1) {
                testcheckArr.push(items[i].permissionId)
              }
              this.test.push(testcheckArr);
            }*/
          }
          this.firstLists = this.checkedEquipments.reduce((a, b) => a.concat(b));
          this.firstList = this.firstLists.concat(this.parentArr);
          console.log('初始化默认选中状态', this.checkedEquipments)
          console.log('当前拥有', this.firstList)
        });

      }
    },
    created() {
      this.getLoadPermissionList();
      this.getLoadRolePermission();
    }
  }

</script>

<style lang='scss' scoped>
  .jurisdiction-wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;

    .top-wrap {
      display: flex;
      justify-content: space-between;
    }
  }

</style>
