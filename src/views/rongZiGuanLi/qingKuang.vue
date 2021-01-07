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
                    <el-option label="2021" value="2021" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="isYesNull">
                    <el-option label="1" value="1" />
                    <el-option label="2" value="2" />
                    <el-option label="3" value="3" />
                    <el-option label="4" value="4" />
                    <el-option label="5" value="5" />
                    <el-option label="6" value="6" />
                    <el-option label="7" value="7" />
                    <el-option label="8" value="8" />
                    <el-option label="9" value="9" />
                    <el-option label="10" value="10" />
                    <el-option label="11" value="11" />
                    <el-option label="12" value="12" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <KeShi v-model="isYseNull" />
                </el-form-item>
                <el-form-item>
                  <el-input v-model="isYesNull" placeholder="金融机构" />
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
          <el-table-column label="城投公司2021年到账资金情况表">
            <el-table-column label="序号" />
            <el-table-column label="金融机构" />
            <el-table-column label="融资主体" />
            <el-table-column label="融资类型" />
            <el-table-column label="贷款期限(月)" />
            <el-table-column label="金额(万元)" />
            <el-table-column label="放款凭证号" />
            <el-table-column label="手续费(万元)" />
            <el-table-column label="保证金(万元)" />
            <el-table-column label="实际可使用金额(万元)" />
            <el-table-column label="项目责任科室" />
            <el-table-column label="到账日期" />
            <el-table-column label="合同利率" />
            <el-table-column label="综合利率" />
          </el-table-column>
        </el-table>
      </section>
      <el-pagination style="text-align: end;" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="selectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" />
    </div>
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import LeiXing from "@/myComponents/LeiXing";
import KeShi from "@/myComponents/KeShi";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: { LeiXing, KeShi },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>