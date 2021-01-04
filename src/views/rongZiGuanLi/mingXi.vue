<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-form-item>
                  <LeiXing v-model="isNull" style="width:230px" />
                </el-form-item>
                <el-form-item>
                  <div style="display:flex">
                    <el-select v-model="isNull" style="width:105px">
                      <el-option label="金融机构" />
                      <el-option label="融资主体" />
                    </el-select>：
                    <el-input v-model="isNull" clearable style="width:200px" />
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="isNull" style="width:100px">
                    <el-option label="2020" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <BiZhong v-model="isNull" style="width:100px" />
                </el-form-item>
                <el-form-item>
                  <GongSi v-model="isNull" style="width:110px" />
                </el-form-item>
                <el-form-item>
                  <KeShi v-model="isNull" style="width:110px" />
                </el-form-item>
                <el-form-item>
                  <el-date-picker v-model="isNull" type="daterange" range-separator="~" start-placeholder="贷款日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div style="text-align: end;">
                <el-form-item>
                  <ShangChuan v-model="isNull" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked">导出</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </header>
      <section class="table-container view-section">
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
          element-loading-text="加载中，请稍候……" :data="isNull" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
          <el-table-column label="还本付息明细(金额单位:万元)">
            <el-table-column label="序号" prop="rzztName" width="260" show-overflow-tooltip />
            <el-table-column label="债务名称" prop="jinRongJiGou" width="260" show-overflow-tooltip />
            <el-table-column label="融资主体" width="350" prop="zwmc" show-overflow-tooltip />
            <el-table-column label="金融机构" prop="dkrqq" width="100" :formatter="setDkrqq" />
            <el-table-column label="融资类型" prop="dkrqz" width="100" :formatter="setDkrqz" />
            <el-table-column label="总金额(万元)" prop="qxy" width="110" align="center" />
            <el-table-column label="年初余额(万元)" prop="sxje" width="180" align="right" />
            <el-table-column label="借款起始日期" prop="dkje" width="180" align="right" />
            <el-table-column label="借款截止日期" width="180" align="right" />
            <el-table-column label="利率" prop="lilvRate" align="right" />
            <el-table-column label="币种" prop="ptlvRate" width="110" align="right" />
          </el-table-column>
        </el-table>
      </section>
      <el-pagination style="text-align: end;" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="isNull" :page-sizes="[10, 20, 50, 100]" :page-size="isNull"
        layout="total, sizes, prev, pager, next, jumper" :total="isNull">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import LeiXing from "@/myComponents/LeiXing";
import BiZhong from "@/myComponents/BiZhong";
import GongSi from "@/myComponents/GongSi";
import KeShi from "@/myComponents/KeShi";
export default {
  data() {
    return {
      isNull: "",
    };
  },
  methods: {},
  mounted() {},
  components: { LeiXing, BiZhong, GongSi, KeShi },
};
</script>

<style lang="scss" scoped>
</style>