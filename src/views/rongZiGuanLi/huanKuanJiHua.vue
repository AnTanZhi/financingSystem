<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-form-item>
                  <el-date-picker v-model="isNull" type="daterange" range-separator="~" start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px" />
                </el-form-item>
              </div>
              <div style="text-align: end;">
                <el-form-item>
                  <ShangChuan v-model="isNull" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked">导出</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-download">模板下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-money">本金管理</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-s-operation">利率调整</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete">删除选中</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import ShangChuan from "@/myComponents/ShangChuan";
export default {
  data() {
    return {
      isNull: "",
    };
  },
  methods: {},
  mounted() {},
  components: { ShangChuan },
};
</script>

<style lang="scss" scoped>
</style>