<template>
  <div class="bg_fff main">
    <h3 class="title">
      <i class="el-icon-user-solid"></i>添加广告
    </h3>
    <div class="btn-list">
      <el-button type="primary" icon="el-icon-refresh" size="small">刷新</el-button>
      <el-button type="primary" icon="el-icon-back" size="small" @click="backAction">返回</el-button>
    </div>
    <div class="p10 w30">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="广告标题：">
          <el-input v-model="form.ctitle"></el-input>
        </el-form-item>
        <el-form-item label="广告类型：">
          <el-select v-model="form.upperstate" placeholder="请选择状态">
            <el-option label="首页banner广告" value="0"></el-option>
            <el-option label="首页公告" value="1"></el-option>
            <el-option label="首页广告" value="2"></el-option>
            <el-option label="朋友圈banner" value="3"></el-option>
            <el-option label="启动页" value="4"></el-option>
            <el-option label="发现banner" value="5"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="状态：">
          <el-select v-model="form.upperstate" placeholder="请选择状态">
            <el-option label="上架" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="活动图片：">
          <img :src="form.curl" alt />
          <el-upload
            class="upload-demo"
            action="http://iyadmin.tiantiancaidian.com/system/uploadImage"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :file-list="fileList"
            list-type="picture"
            :on-success="success"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告地址：">
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
import { operationManageAdvertising } from "@/request/api";
export default {
  data() {
    return {
      form: {
        curl: "",
        ctitle: "",
        upperstate: "",
        cadverturl: "",
        cadvertid: "",
        type: 2,
        top: ""
      },
      fileList: []
    };
  },
  methods: {
    onSubmit() {
      operationManageAdvertising(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    //返回
    backAction() {
      this.$router.go(-1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    success(response, file, fileList) {
      //this.fileLists = [];
      //this.fileLists = [file];
      this.form.curl = response.data.imageUrl;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
