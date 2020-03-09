<template>
  <div class="bg_fff p5">
    <div class="p10">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="IP"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地区">
        </el-table-column>
        <el-table-column
          prop="address"
          label="渠道号">
        </el-table-column>
      </el-table>
    </div>
    <div class="block p20 tac">
      <el-pagination
        :page-size="10"
        background
        layout="total, prev, pager, next, jumper"
        @current-change='handleCurrentChange'
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        region:'',
        number:'',
        tableData:[]
      };
    },
    methods: {
      onSubmit(tab, event) {
        console.log(tab, event);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>
<style lang='less' scoped> 

</style>