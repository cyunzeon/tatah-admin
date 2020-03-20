<template>
  <div class="bg_fff main">
    <h3 class="title"><i class="el-icon-user-solid"></i>添加弹框</h3>
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-back" size='small' @click="backAction">返回</el-button>
    </div>
    <div class="p10 w30">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="弹框标题：">
          <el-input v-model="form.ctitle"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.istatus" placeholder="请选择状态">
            <el-option label="已上架" value="0"></el-option>
            <el-option label="已下架" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="弹框图片：">
          <el-upload class="upload-demo" action="http://iyadmin.tiantiancaidian.com/system/uploadImage" 
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1"
            :file-list="fileList" list-type="picture" :on-success="success">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="弹框地址：">
          <el-input v-model="form.cadverturl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
          cwindowid: '',
          ctitle: '',
          istatus: '',
          type: 2,
          cadverturl: '',
          curl: '',
          top: ''
        },
        dataList: {
          fileType: 1,
          pathType: 5
        },
        fileList: []
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
