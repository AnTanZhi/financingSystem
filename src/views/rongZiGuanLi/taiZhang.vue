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
                  <div style="display:flex;">
                    <el-select v-model="isNull" style="width:120px">
                      <el-option :value="0" label="金融机构" />
                      <el-option :value="1" label="融资主体" />
                    </el-select>
                    <span v-text="`:`" style="font-size:.2rem;margin-left:.125rem;margin-right:.125rem" />
                    <el-input v-model="isNull" clearable style="width:150px" />
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="isNull" style="width:80px">
                    <el-option label="2019" value="2019"></el-option>
                    <el-option label="2020" value="2020"></el-option>
                    <el-option label="2021" value="2021"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <BiZhong v-model="isNull" style="width:90px" />
                </el-form-item>
                <el-form-item>
                  <GongSi v-model="isNull" style="width:110px" />
                </el-form-item>
                <el-form-item>
                  <KeShi v-model="isNull" style="width:110px" />
                </el-form-item>
                <el-form-item>
                  <el-date-picker v-model="isNull" type="daterange" range-separator="~" start-placeholder="贷款日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px" />
                </el-form-item>
              </div>
              <div>
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
          element-loading-text="加载中，请稍候……" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column label="融资台账(金额单位:万元)">
            <el-table-column label="序号" prop="pname" align="left" />
            <el-table-column label="合同编号" prop="pname" align="left" />
            <el-table-column label="融资主体" prop="pname" align="left" />
            <el-table-column label="金融机构" prop="pname" align="left" />
            <el-table-column label="融资类型" prop="pname" align="left" />
            <el-table-column label="期限" prop="pname" align="left" width="110" />
            <el-table-column label="年利率" prop="pname" align="left" width="120" />
            <el-table-column label="融资金额(万元)" prop="pname" align="left" width="120" />
            <el-table-column label="本期余额(万元)" prop="pname" align="left" width="120" />
            <el-table-column label="币种" prop="pname" align="left" />
            <el-table-column label="2020" prop="pname" align="left">
              <el-table-column label="还本" prop="pname" align="left" />
              <el-table-column label="利息" prop="pname" align="left" />
            </el-table-column>
          </el-table-column>
        </el-table>
      </section>
      <el-pagination style="text-align: end;" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="selectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="addOrUpdateDig" :close-on-click-modal="false">
      <el-form :rules="rules" :model="addOrUpdateParams" label-width="120px" ref="addOrUpdateParams">
        <el-form-item label="主体名称" prop="pname">
          <el-input v-model="addOrUpdateParams.pname" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateDig = false">取 消</el-button>
        <el-button type="primary" @click="addLeiXing" v-loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import canShu from "@/api/canShu";
import DaLei from "@/myComponents/DaLei";

import LeiXing from "@/myComponents/LeiXing";
import BiZhong from "@/myComponents/BiZhong";
import GongSi from "@/myComponents/GongSi";
import KeShi from "@/myComponents/KeShi";
import ShangChuan from "@/myComponents/ShangChuan";
export default {
  data() {
    return {
      isNull: "",
      /* 查询参数 */
      selectParams: {
        pageIndex: 1,
        pageSize: 10,
      },
      /* mixin参数 */
      mixinParams: {
        api: canShu,
        name: "getFinancingBody",
      },
      /* 添加/修改参数 */
      addOrUpdateParams: {},
      /* 校验 */
      rules: {
        pname: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
          { max: 25, message: "长度在最多到 25 个字符", trigger: "blur" },
        ],
      },
      /* 删除参数 */
      ids: [],
      /* 是否展示更多搜索框 */
      isShow: false,
    };
  },
  methods: {
    /* 删除(多个) */
    delS() {
      if (this.ids == "") {
        this.$message.error("请至少选择一条数据");
        return;
      }
      this.publicDel("delRepaymentFrequency", this.ids);
    },
    /* 修改前置 */
    goUpd(id) {
      canShu.infoFinancingType(id).then((res) => {
        this.addOrUpdateParams = res.data;
        this.title = "参数编辑";
        this.addOrUpdateDig = true;
      });
    },
    /* 添加融资主体 */
    addLeiXing() {
      if (this.publicRules("addOrUpdateParams")) {
        this.publicAdd("addFinancingBody", this.addOrUpdateParams, "");
      }
    },
    /* 添加前置 */
    goAdd() {
      this.addOrUpdateParams = {};
      this.title = "参数添加";
      this.addOrUpdateDig = true;
    },
    handleSelectionChange(val) {
      this.ids = [];
      this.ids = val.map((v) => v.pid);
    },
    /* 获取表格数据 */
    getTablData() {
      this.publicSelect();
    },
  },
  mounted() {
    /* 获取表格数据 */
    this.publicSelect();
  },
  components: { LeiXing, BiZhong, GongSi, KeShi, ShangChuan },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>