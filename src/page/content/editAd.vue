<template>
  <div class="bg_fff main">
    <h3 class="title">
      <i class="el-icon-user-solid"></i>修改广告
    </h3>
    <div class="p10 w30">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="广告标题：">
          <el-input v-model="form.ctitle"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.upperstate" :placeholder="placeholder">
            <el-option label="已上架" value="1"></el-option>
            <el-option label="已下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动图片：">
          <img :src="form.curl" alt />
          <el-upload
            class="upload-demo"
            action="/api/system/uploadImage"
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
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告地址：">
          <el-input v-model="form.cadverturl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
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
        curl: this.$route.query.curl,
        ctitle: this.$route.query.ctitle,
        upperstate: this.$route.query.upperstate,
        cadverturl: this.$route.query.cadverturl,
        cadvertid: this.$route.query.cadvertid,
        type: 1,
        top: ""
      },
      fileList: [],
      placeholder: ''
    };
  },
  created() {
    if(this.$route.query.upperstate == 0) {
      this.placeholder = '下架'
    } else if(this.$route.query.upperstate == 1) {
      this.placeholder = '上架'
    }
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
      this.fileLists = [];
      this.fileLists = [file];
      this.form.curl = response.data.imageUrl;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>


<style lang="scss" scoped>
  img {
    width: 200px;
    height: 200px;
  }
</style>