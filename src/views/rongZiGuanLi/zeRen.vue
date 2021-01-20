<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-date-picker v-model="yearMonth" type="monthrange" range-separator="~" :clearable="false"
                  start-placeholder="开始月份" end-placeholder="结束月份" style="width:190px" value-format="yyyy-MM"
                  @change="setYearMonth" />
              </div>
              <div style="text-align: end;">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked" @click="exportXLSX">导出</el-button>
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
          <el-table-column :label="tableTitle">
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
import { tableTotal, isNull } from "@/utils/utils";
import publicMixin from "@/mixin/publicMixin";
import guanLi from "@/api/guanLi";
export default {
  data() {
    return {
      /* 年月日期 */ yearMonth: [
        `${new Date().getFullYear()}-01`,
        `${new Date().getFullYear()}-12`,
      ],
      isYesNull: "",
      /* 查询参数 */ selectParams: {
        pageIndex: 1,
        pageSize: 10,
        startDate: `${new Date().getFullYear()}-01`,
        endDate: `${new Date().getFullYear()}-12`,
      },
      /* mixin参数 */ mixinParams: {
        api: guanLi,
        name: "getTableDebtServiceLiability",
      },
      /* 表格标题 */ tableTitle: "",
    };
  },
  methods: {
    /* 获取表格标题 */ getTableTitle() {
      let xzn = String(this.yearMonth[0]).substring(0, 4);
      let xzy = String(this.yearMonth[0]).substring(5, 7);
      let jsn = String(this.yearMonth[1]).substring(0, 4);
      let jsy = String(this.yearMonth[1]).substring(5, 7);
      let dqn = new Date().getFullYear();
      let dqy = new Date().getMonth() + 1;
      let dqr = new Date().getDate();
      this.tableTitle = `${xzn}年${xzy}-${jsn}年${jsy}月份还本付息责任表 截止${dqn}年${dqy}月${dqr}日数据`;
    },
    /* 获取还本付息责任表 */ getTableDebtServiceLiability() {
      this.publicSelect();
    },
    /* 初始化年月日期 */ setYearMonth(val) {
      this.selectParams.startDate = val[0];
      this.selectParams.endDate = val[1];
      let xzn = String(val[0]).substring(0, 4);
      let xzy = String(val[0]).substring(5, 7);
      let jsn = String(val[1]).substring(0, 4);
      let jsy = String(val[1]).substring(5, 7);
      let dqn = new Date().getFullYear();
      let dqy = new Date().getMonth() + 1;
      let dqr = new Date().getDate();
      this.tableTitle = `${xzn}年${xzy}-${jsn}年${jsy}月份还本付息责任表 截止${dqn}年${dqy}月${dqr}日数据`;
      this.getTableDebtServiceLiability();
    },
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
  mounted() {
    /* 获取表格标题 */ this.getTableTitle();
    /* 获取还本付息责任表 */ this.getTableDebtServiceLiability();
  },
  components: {},
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>