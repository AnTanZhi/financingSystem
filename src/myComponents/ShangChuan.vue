<template>
  <el-upload style="display:flex" class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
    :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :limit="1" :on-exceed="beyond"
    :on-change="updIsShow">
    <el-button v-if="!isShow" slot="trigger" type="primary" icon="el-icon-document-add">导入数据
    </el-button>
    <el-button v-if="isShow" style="margin-right:10px" type="primary" icon="el-icon-upload2">开始导入</el-button>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      isShow: false,
    };
  },
  methods: {
    updIsShow(file, fileList) {
      file.name =
        file.name.length > 10 ? file.name.substring(0, 7) + "..." : file.name;
      this.isShow = !this.isShow;
    },
    beyond() {
      this.$message.error("只允许上传一个附件,请删除后重试");
    },
    handleRemove(file, fileList) {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style>
</style>