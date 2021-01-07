<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-form-item>
                  <el-select v-model="isNull" clearable>
                    <el-option label="地号" value="地号" />
                    <el-option label="地块名称" value="地块名称" />
                    <el-option label="土地证名称" value="土地证名称" />
                    <el-option label="面积" value="面积" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="isNull" placeholder="请输入关键字" clearable />
                </el-form-item>
                <el-form-item>
                  <Gongsi v-model="isNull" />
                </el-form-item>
                <el-form-item>
                  <span>状态暂无</span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </header>
      <section class="table-container view-section">
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
          element-loading-text="加载中，请稍候……" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
          <el-table-column label="档案号" />
          <el-table-column label="地号" />
          <el-table-column label="地块名称" />
          <el-table-column label="产权坐落位置" />
          <el-table-column label="土地证(或不动产证编号)" />
          <el-table-column label="面积㎡" />
          <el-table-column label="土地出让金额(万元)" />
          <el-table-column label="土地用途(地类)" />
          <el-table-column label="抵押用于融资项目名称" />
          <el-table-column label="抵押金融机构" />
          <el-table-column label="抵押期限(月)" />
          <el-table-column label="归属公司" />
          <el-table-column label="操作">
            <template>
              <el-tooltip class="item" effect="dark" content="详细" placement="bottom">
                <i class="el-icon-reading edit-btn" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import Gongsi from "@/myComponents/GongSi";
export default {
  data() {
    return {
      isNull: "",
    };
  },
  methods: {},
  mounted() {},
  components: { Gongsi },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>