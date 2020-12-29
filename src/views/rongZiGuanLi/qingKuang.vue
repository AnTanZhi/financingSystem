<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header">
        <div class="header-container">
          <el-row>
            <el-col :span="13">
              <el-row :gutter="10">
                <el-col :span="7">
                  <LeiXing v-model="isNull" />
                </el-col>
                <el-col
                  :span="7"
                  style="display:flex;align-items: center;"
                >
                  <el-select
                    v-model="isNull"
                    clearable
                  >
                    <el-option
                      :value="0"
                      label="金融机构"
                    />
                    <el-option
                      :value="0"
                      label="融资主体"
                    />
                    <el-option
                      :value="0"
                      label="债务名称"
                    />
                  </el-select>
                  ：
                  <el-input v-model="isNull" />
                </el-col>
                <el-col :span="3">
                  <BiZhong v-model="isNull" />
                </el-col>
                <el-col :span="4">
                  <GongSi v-model="isNull" />
                </el-col>
                <el-col :span="1">
                  <el-button
                    type="primary"
                    :icon="isShow?'el-icon-menu':'el-icon-s-grid'"
                    @click="()=>isShow=!isShow"
                  >{{isShow?'收起':'展开'}}</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :span="11"
              class="handle-btn"
            >
              <ShangChuan />
              <el-button
                type="primary"
                icon="el-icon-download"
                @click="goAdd"
              >模板下载</el-button>
              <el-button
                type="primary"
                icon="el-icon-document-checked"
                @click="goAdd"
              >导出</el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="()=>this.$router.push('/rongZiGuanLi/guanLiAdd')"
              >添加</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delS"
              >删除选中</el-button>
            </el-col>
          </el-row>
          <el-row
            style="margin-top:10px"
            v-if="isShow"
            :gutter="10"
          >
            <el-col :span="24">
              <el-col :span="2">
                <el-select
                  clearable
                  v-model="isNull"
                  placeholder="是否结清"
                >
                  <el-option
                    label="是"
                    :value="1"
                  />
                  <el-option
                    label="否"
                    :value="1"
                  />
                </el-select>
              </el-col>
              <el-col :span="2">
                <KeShi v-model="isNull" />
              </el-col>
              <el-col :span="4">
                <el-date-picker
                  v-model="isNull"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="贷款日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </header>
      <section class="table-container view-section">
        <el-table
          :header-cell-style="{background:'#F0FAFF',color:'#787878'}"
          border
          stripe
          v-loading="loading"
          element-loading-text="加载中，请稍候……"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="城投公司2020年到账资金情况表">
            <el-table-column
              label="序号"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="金融机构"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="融资主体"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="融资类型"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="贷款期限(月)"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="金额(万元)"
              prop="pname"
              align="left"
              width="110"
            />
            <el-table-column
              label="放款凭证号"
              prop="pname"
              align="left"
              width="120"
            />
            <el-table-column
              label="手续费(万元)"
              prop="pname"
              align="left"
              width="120"
            />
            <el-table-column
              label="保证金(万元)"
              prop="pname"
              align="left"
              width="120"
            />
            <el-table-column
              label="实际可使用金额(万元)"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="项目责任科室"
              prop="pname"
              align="left"
              width="110"
            />
            <el-table-column
              label="到账日期"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="合同利率"
              prop="pname"
              align="left"
            />
            <el-table-column
              label="综合利率"
              prop="pname"
              align="left"
            />
          </el-table-column>
        </el-table>
      </section>
      <el-pagination
        style="text-align: end;"
        background
        @size-change="publicSizeSelect"
        @current-change="publicPageSelect"
        :current-page="selectParams.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="addOrUpdateDig"
    >
      <el-form
        :rules="rules"
        :model="addOrUpdateParams"
        label-width="120px"
        ref="addOrUpdateParams"
      >
        <el-form-item
          label="主体名称"
          prop="pname"
        >
          <el-input v-model="addOrUpdateParams.pname" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addOrUpdateDig = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addLeiXing"
          v-loading="btnLoading"
        >确 定</el-button>
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