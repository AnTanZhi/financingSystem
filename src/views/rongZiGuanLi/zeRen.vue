<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-date-picker type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss" style="width:240px" v-model="selectParams.time" />
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
          <el-table-column label="2021年1 - 12月份还本付息责任表 截止2021年1月15日数据">
            <el-table-column />
            <el-table-column label="还本付息总额" />
            <el-table-column label="本金" />
            <el-table-column label="利息" />
            <el-table-column label="低风险业务" />
            <el-table-column label="低风险业务明细" />
            <el-table-column label="可续贷" />
            <el-table-column label="可续贷明细" />
            <el-table-column label="还本付息净额" />
            <el-table-column label="还本付息明细" />
          </el-table-column>
        </el-table>
      </section>
    </div>
  </div>
</template>

<script>
import { tableTotal } from "@/utils/utils";
export default {
  data() {
    return {
      isYesNull: "",
      /* 查询参数 */ selectParams: { pageIndex: 1, pageSize: 10 },
      /* mixin参数 */ mixinParams: { api: "", name: "" },
    };
  },
  methods: {
    /* 导出初始化数据 */ formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "efksj") {
            return String(v[j]) == "null" ? "" : String(v[j]).substring(0, 10);
          }
          if (j === "efkjy" || j === "sxf" || j === "bzj" || j === "available")
            return Number(v[j]).toFixed(6);
          if (j === "lilv" || j === "ptlv")
            return Number(v[j]).toFixed(2) + "%";
          return v[j];
        })
      );
    },
    /* 导出 */ exportXLSX() {
      this.selectParams.pageSize = this.total;
      guanLi[this.mixinParams.name](this.selectParams).then((res) => {
        import("@/vendor/Export2Excel").then((excel) => {
          const multiHeader = [
            [
              "2021年1 - 12月份还本付息责任表 截止2021年1月15日数据",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
          ];
          const tHeader = [
            "",
            "还本付息总额",
            "本金",
            "利息",
            "低风险业务",
            "低风险业务明细",
            "可续贷",
            "可续贷明细",
            "还本付息净额",
            "还本付息明细",
          ];
          const filterVal = [];
          const list = res.data.records;
          const data = this.formatJson(filterVal, list);
          const merges = ["A1:M1"];
          excel.export_json_to_excel({
            multiHeader, //这里是第一行的表头
            header: tHeader, //这里应该是算第三行的表头
            data,
            merges,
            filename: "资金到账情况表",
            autoWidth: true,
            bookType: "xlsx",
          });
        });
      });
    },
    /* 表格合计 */ getSummaries(param) {
      return tableTotal(param, [
        "还本付息总额",
        "本金",
        "利息",
        "低风险业务",
        "可续贷",
        "还本付息净额",
      ]);
    },
  },
  mounted() {},
  components: {},
};
</script>

<style lang="scss" scoped>
</style>