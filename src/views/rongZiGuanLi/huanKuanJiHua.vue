<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-form-item>
                  <el-date-picker v-model="timeParams" type="daterange" range-separator="~" start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px"
                    @change="setTimeParams" />
                </el-form-item>
              </div>
              <div style="text-align: end;">
                <el-form-item>
                  <ShangChuan @getTable="getRepaymentPlan" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked">导出</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-download">模板下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-money" @click="addOrUpdPrincipalManagement">本金管理</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-s-operation">利率调整</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" @click="delRepaymentPlan">删除选中</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </header>
      <section class="table-container view-section" style="text-align: center;">
        <el-link type="primary" style="margin:10px 0" @click="generateRepaymentPlan">计算时间 2021/1/6 17:24 点击重新计算
        </el-link>
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
          element-loading-text="加载中，请稍候……" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
          <el-table-column
            :label="`${financingInfo.zwmc} 还款计划 （注：${financingInfo.bzcontext==null?'':financingInfo.bzcontext}）`">
            <el-table-column type="selection" width="40" align="center" />
            <el-table-column label="计划还款日期" prop="jhhkrq"
              :formatter="row=>row.jhhkrq+''=='null'?'':String(row.jhhkrq).substring(0,10)" width="110"
              align="center" />
            <el-table-column label="贷款总额(万元)" show-overflow-tooltip :formatter="row=>Number(row.dkzy).toFixed(6)"
              align="right" />
            <el-table-column label="利率(%)" show-overflow-tooltip :formatter="row=>row.lilv+'%'" width="80"
              align="center" />
            <el-table-column label="天数" show-overflow-tooltip prop="tianshu" width="50" align="center" />
            <el-table-column label="预估本金(万元)" show-overflow-tooltip prop="benjin"
              :formatter="row=>Number(row.benjin).toFixed(6)" align="right" />
            <el-table-column label="预估利息(万元)" show-overflow-tooltip prop="ykls"
              :formatter="row=>Number(row.ykls).toFixed(6)" align="right" />
            <el-table-column label="预估其他(万元)" show-overflow-tooltip prop="qita"
              :formatter="row=>Number(row.qita).toFixed(6)" align="right" />
            <el-table-column label="预估合计(万元)" show-overflow-tooltip prop="estimateSum"
              :formatter="row=>Number(row.estimateSum).toFixed(6)" align="right" />
            <el-table-column label="实还日期" :formatter="row=>row.shrq+''=='null'?'':String(row.shrq).substring(0,10)"
              width="100" align="center" />
            <el-table-column label="实还本金(万元)" show-overflow-tooltip prop="hkbj"
              :formatter="row=>Number(row.hkbj).toFixed(6)" align="right" />
            <el-table-column label="实还利息(万元)" show-overflow-tooltip prop="sjhkls"
              :formatter="row=>Number(row.sjhkls).toFixed(6)" align="right" />
            <el-table-column label="实还合计(万元)" show-overflow-tooltip prop="realSum"
              :formatter="row=>Number(row.realSum).toFixed(6)" align="right" />
            <el-table-column width="50" label="操作" align="center" fixed="right">
              <template slot-scope="s">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                  <i class="el-icon-edit-outline edit-btn" @click="goUpd(s.row.id)" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </section>
      <el-pagination style="text-align: end;" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="selectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 本金管理对话框 -->
    <el-dialog title="本金管理" :visible.sync="principalDia">
      <div style="margin-bottom:20px">
        <el-form :model="principalManagementParams" label-position="right" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="放款金额(万元)">
                <el-select placeholder="放款金额" style="width:220px">
                  <el-option label="2800.000000" value="2800.000000" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="还款日期">
                <el-date-picker v-model="isYesNull" type="date" placeholder="还款日期" value-format="yyyy-MM-dd HH:mm:ss"
                  clearable>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="本金金额(万元)">
                <el-input v-model="isYesNull" placeholder="本金金额" clearable style="width:220px" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="利率(%)">
                <el-input v-model="isYesNull" placeholder="利率" clearable style="width:220px" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button type="primary" @click="dialogFormVisible = false">添加</el-button>
        </div>
      </div>
      <div style="text-align:end;margin-bottom:10px">
        <el-button type="danger">删除选中</el-button>
      </div>
      <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
        element-loading-text="加载中，请稍候……" :data="principalManagement" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
        <el-table-column type="selection" />
        <el-table-column label="放款金额(万元)" />
        <el-table-column label="还款日期" />
        <el-table-column label="本金金额(万元)" prop="efksj" />
        <el-table-column label="利率(%)" prop="efkll" />
        <el-table-column label="日期" prop="efksj" />
      </el-table>
      <el-pagination style="text-align: end;margin-top:20px" background @size-change="pmSelectSize"
        @current-change="pmSelectIndex" :current-page="pmSelectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="pmSelectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pmTotal">
      </el-pagination>
    </el-dialog>
    <!-- 利率调整 -->
    <el-dialog title="利率调整" :visible.sync="interestRateDia">
      <div style="margin-bottom:20px">
        <el-form :model="isYesNull" label-position="right" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="放款金额(万元)">
                <el-select placeholder="放款金额" style="width:220px">
                  <el-option label="2800.000000" value="2800.000000" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="调整日期：">
                <el-date-picker v-model="isYesNull" type="date" placeholder="调整日期" value-format="yyyy-MM-dd HH:mm:ss"
                  clearable style="width:220px">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调整利率(%)：">
                <el-input v-model="isYesNull" placeholder="利率" clearable style="width:220px" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button type="primary" @click="dialogFormVisible = false">添加</el-button>
        </div>
      </div>
      <div style="text-align:end;margin-bottom:10px">
        <el-button type="danger">删除选中</el-button>
      </div>
      <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
        element-loading-text="加载中，请稍候……" :data="tableData" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
        <el-table-column type="selection" />
        <el-table-column label="放款金额(万元)" />
        <el-table-column label="调整日期" />
        <el-table-column label="调整利率(%)" />
        <el-table-column label="日期" />
      </el-table>
      <el-pagination style="text-align: end;margin-top:20px" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="selectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-dialog>
    <!-- 还款计划修改 -->
    <el-dialog title="还款计划修改" :visible.sync="updRepaymentPlan">
      <div style="margin-bottom:20px">
        <el-form :model="repaymentPlanParams" label-position="right" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划还款日期：">
                <span>{{repaymentPlanParams.jhhkrq}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款总额(万元)：">
                <span>{{repaymentPlanParams.dkzy}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="天数：">
                <el-input type="number" clearable style="width:220px" v-model="repaymentPlanParams.tianshu" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调整利率(%)：">
                <el-input type="number" clearable style="width:220px" v-model="repaymentPlanParams.lilv" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预估本金(万元)：">
                <el-input type="number" clearable style="width:220px" v-model="repaymentPlanParams.benjin" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预估利息(万元)：">
                <el-input type="number" clearable style="width:220px" v-model="repaymentPlanParams.ykls" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预估其他(万元)：">
                <el-input type="number" clearable style="width:220px" v-model="repaymentPlanParams.qita" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实还日期：">
                <el-date-picker v-model="repaymentPlanParams.shrq" type="date" placeholder="选择日期" clearable
                  value-format="yyyy-MM-dd HH:mm:ss" style="width:220px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="实还本金(万元)：">
                <el-input type="number" clearable style="width:220px" v-model="repaymentPlanParams.hkbj" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实还利息(万元)：">
                <el-input type="number" clearable style="width:220px" v-model="repaymentPlanParams.sjhkls" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button type="primary" @click="setRepaymentPlan">修改</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ShangChuan from "@/myComponents/ShangChuan";
import publicMixin from "@/mixin/publicMixin";
import guanLi from "@/api/guanLi";
import { tableTotal, isNull } from "@/utils/utils";
export default {
  data() {
    return {
      isYesNull: "",
      /* 本金管理对话框 */ principalDia: false,
      /* 利率调整对话框 */ interestRateDia: false,
      /* 修改还款计划对话框 */ updRepaymentPlan: false,
      /* 查询参数 */ selectParams: {
        pageIndex: 1,
        pageSize: 10,
        rongziId: this.$route.query.id,
      },
      /* mixin参数 */ mixinParams: { api: guanLi, name: "getRepaymentPlan" },
      /* 融资详细 */ financingInfo: {},
      /* 日期参数 */ timeParams: "",
      /* 修改还款计划参数 */ repaymentPlanParams: {},
      /* 还款计划删除ids */ repaymentPlanIds: [],
      /* 本金管理参数 */ principalManagementParams: {},
      /* 本金管理 */ principalManagement: [],
      /* 本金管理查询参数 */ pmSelectParams: {
        pageIndex: 1,
        pageSize: 10,
        rongziId: this.$route.query.id,
      },
      /* 本金管理总条数 */ pmTotal: 0,
    };
  },
  methods: {
    /* 本金管理分页查询 */ pmSelectIndex(index) {
      this.pmSelectParams.pageIndex = index;
      this.getPrincipalManagement();
    },
    /* 本金管理更改展示数量 */ pmSelectSize(size) {
      this.pmSelectParams.pageSize = size;
      this.getPrincipalManagement();
    },
    /* 本金管理表格 */
    getPrincipalManagement() {
      guanLi.getPrincipalManagement(this.pmSelectParams).then((res) => {
        this.principalManagement = res.data.records;
        this.pmTotal = res.data.total;
      });
    },
    /* 添加/修改本金管理 */ addOrUpdPrincipalManagement() {
      this.principalDia = true;
      this.principalManagementParams = {};
      this.getPrincipalManagement();
    },
    /* 生成还款计划 */ generateRepaymentPlan() {
      this.$confirm("确定要重新计算?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        guanLi.generateRepaymentPlan(this.$route.query.id).then(() => {
          this.$message.success("生成成功");
          guanLi.getRepaymentPlan(this.selectParams).then((r) => {
            this.tableData = r.data.records || r.data;
            this.loading = false;
            this.total = r.data.total;
          });
        });
      });
    },
    /* 还款计划删除 */ delRepaymentPlan() {
      if (this.repaymentPlanIds == "")
        this.$message.error("请至少选择一条数据");
      else this.publicDel("delRepaymentPlan", this.repaymentPlanIds);
    },
    /* 多选赋值 */ handleSelectionChange(val) {
      this.repaymentPlanIds = [];
      this.repaymentPlanIds = val.map((v) => v.id);
    },
    /* 还款计划修改 */ setRepaymentPlan() {
      guanLi.setRepaymentPlan(this.repaymentPlanParams).then((res) => {
        this.$message.success("修改成功");
        this.publicSelect();
        this.repaymentPlanParams = {};
        this.updRepaymentPlan = false;
      });
    },
    /* 还款计划修改前置 */ goUpd(id) {
      guanLi.getRepaymentPlanInfo(id).then((res) => {
        this.repaymentPlanParams = res.data;
        this.repaymentPlanParams.id = id;
        this.updRepaymentPlan = true;
      });
    },
    /* 初始化查询时间参数 */ setTimeParams(val) {
      if (isNull(val)) {
        this.selectParams.startDate = "";
        this.selectParams.endDate = "";
      } else {
        this.selectParams.startDate = val[0];
        this.selectParams.endDate = val[1];
      }
      this.publicSelect();
    },
    /* 合计 */ getSummaries(param) {
      return tableTotal(param, [
        "预估本金(万元)",
        "预估利息(万元)",
        "预估其他(万元)",
        "预估合计(万元)",
        "实还本金(万元)",
        "实还利息(万元)",
        "实还合计(万元)",
      ]);
    },
    /* 融资表详细 */ getFinancingInfo() {
      guanLi.getFinancingInfo(this.$route.query.id).then((res) => {
        this.financingInfo = res.data.rongZiEntityInfo;
        this.getRepaymentPlan();
      });
    },
    /* 还款计划列表 */ getRepaymentPlan() {
      this.loading = true;
      guanLi.getRepaymentPlan(this.selectParams).then((res) => {
        this.tableData = res.data.records || res.data;
        this.loading = false;
        this.total = res.data.total;
        if (isNull(this.tableData)) {
          this.loading = true;
          guanLi.generateRepaymentPlan(this.$route.query.id).then(() => {
            guanLi.getRepaymentPlan(this.selectParams).then((r) => {
              this.tableData = r.data.records || r.data;
              this.loading = false;
              this.total = r.data.total;
            });
          });
        }
      });
    },
  },
  mounted() {
    /* 融资表详细(回调表格数据) */ this.getFinancingInfo();
  },
  components: { ShangChuan },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>