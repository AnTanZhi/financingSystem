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
                  <el-date-picker v-model="isYesNull" type="daterange" range-separator="~" start-placeholder="检索日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" clearable />
                </el-form-item>
                <el-form-item>
                  <KeShi v-model="isYseNull" />
                </el-form-item>
                <el-form-item>
                  <GongSi v-model="isYseNull" />
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="isYesNull">存单质押参与汇总</el-checkbox>
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
          <el-table-column label="融资汇总">
            <el-table-column label="合同编号" />
            <el-table-column label="融资主体" />
            <el-table-column label="金融机构" />
            <el-table-column label="日期" />
            <el-table-column label="融资类型" />
            <el-table-column label="授信额度" />
            <el-table-column label="融资成本(或利率%)" />
            <el-table-column label="期限(天)" />
            <el-table-column label="提款金额" />
            <el-table-column label="质押金额" />
            <el-table-column label="保证金" />
            <el-table-column label="已还贷款">
              <el-table-column label="本金" />
              <el-table-column label="利息" />
            </el-table-column>
            <el-table-column label="尚欠贷款">
              <el-table-column label="小计" />
              <el-table-column label="本金" />
              <el-table-column label="利息" />
            </el-table-column>
            <el-table-column label="还款计划">
              <el-table-column label="2021年1月" />
              <el-table-column label="2021年" />
            </el-table-column>
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
import GongSi from "@/myComponents/GongSi";
export default {
  data() {
    return { isYesNull: "" };
  },
  methods: {},
  mounted() {},
  components: { LeiXing, KeShi, GongSi },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped
</style>