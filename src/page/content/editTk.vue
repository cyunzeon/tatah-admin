<template>
  <div class="bg_fff main">
    <h3 class="title"><i class="el-icon-user-solid"></i>编辑弹框</h3>
    <div class="p10 w30">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="弹框标题：">
          <el-input v-model="form.ctitle"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.istatus">
            <el-option label="上架" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="弹框图片：">
          <img :src="form.curl" alt="">
          <el-upload class="upload-demo" action="http://iyadmin.tiantiancaidian.com/system/uploadImage" :on-preview="handlePreview"
            :on-remove="handleRemove" multiple :limit="1" :on-success="success"
            :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="弹框地址：">
          <el-input v-model="form.cadverturl" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="backAction">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    operationHomeWindow
  } from '@/request/api';
  export default {
    data() {
      return {
        form: {
          cwindowid: this.$route.query.cwindowid,
          ctitle: this.$route.query.ctitle,
          istatus: this.$route.query.istatus,
          type: 1,
          cadverturl: this.$route.query.cadverturl,
          curl: this.$route.query.curl,
        },
        dataList: {
          fileType: 1,
          pathType: 5
        },
        fileList: [],
        showTitle: false,
        showStatus: false,
        showAdv: false
      }
    },
    created() {
      if(this.$route.query.istatus == 1) {
      this.form.istatus = '1'
    } else if(this.$route.query.istatus == 0) {
      this.form.istatus = '0'
    }
    },
    methods: {
      onSubmit() {
        operationHomeWindow(this.form).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      success(response, file, fileList) {
        this.fileLists = [];
        this.fileLists = [file];
        this.form.curl = response.data.imageUrl;
      },
      backAction() {
        this.$router.go(-1)
      }
    }
  };

</script>

<style lang="scss">
</style>