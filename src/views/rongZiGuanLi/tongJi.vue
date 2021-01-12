<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-form-item>
                  <LeiXing v-model="isYseNull" />
                </el-form-item>
                <el-form-item>
                  <el-select v-model="isYesNull">
                    <el-option value="2021" key="2021" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <KeShi v-model="isYesNull" />
                </el-form-item>
              </div>
              <div style="text-align: end;">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked">导出</el-button>
                </el-form-item>
                <el-form-item>
                  <span>金额单位：万元</span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </header>
      <section class="table-container view-section">
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
          element-loading-text="加载中，请稍候……" :data="tableData" tooltip-effect="dark" style="width: 100%"
          :summary-method="getSummaries" show-summary>
          <el-table-column label="融资类型统计表">
            <el-table-column label="序号" />
            <el-table-column label="所属大类" />
            <el-table-column label="融资类型" />
            <el-table-column label="融资到账金额" />
            <el-table-column label="融资到账可使用金额" />
            <el-table-column label="年初本金余额" />
            <el-table-column label="年初利息余额" />
            <el-table-column label="今年已还本金" />
            <el-table-column label="今年已还利息" />
            <el-table-column label="今年未还本金" />
            <el-table-column label="今年未还利息" />
            <el-table-column label="全部未还本金" />
            <el-table-column label="全部未还利息" />
          </el-table-column>
        </el-table>
      </section>
    </div>
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import KeShi from "@/myComponents/KeShi";
import LeiXing from "@/myComponents/LeiXing";
import { tableTotal, isNull } from "@/utils/utils";
export default {
  data() {
    return {
      isYesNull: "",
    };
  },
  methods: {
    /* 表格统计 */ getSummaries(param) {
      return tableTotal(param, [
        "融资到账金额",
        "融资到账可使用金额",
        "年初本金余额",
        "年初利息余额",
        "今年已还本金",
        "今年已还利息",
        "今年未还本金",
        "今年未还利息",
        "全部未还本金",
        "全部未还利息",
      ]);
    },
  },
  mounted() {},
  components: { KeShi, LeiXing },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>