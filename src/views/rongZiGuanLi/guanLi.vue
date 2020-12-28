<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header">
        <div class="header-container">
          <el-row>
            <el-col :span="20">
              <el-row :gutter="10">
                <el-col :span="5">
                  <!-- <LeiXing v-model="" /> -->
                  <!-- <el-input
                    v-model="selectParams.subjectName"
                    placeholder="名称"
                    @input="getTablData"
                    clearable
                  /> -->
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :span="4"
              class="handle-btn"
            >
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="goAdd"
              >添加</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delS"
              >删除选中</el-button>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="40"
            align="center"
          />
          <el-table-column
            label="主体名称"
            prop="pname"
            align="left"
          />
          <el-table-column
            width="100"
            label="操作"
            align="center"
          >
            <template slot-scope="s">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <i
                  class="el-icon-edit-outline edit-btn"
                  @click="goUpd(s.row.pid)"
                ></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="bottom"
              >
                <i
                  class="el-icon-delete edit-btn"
                  @click="publicDel('delRepaymentFrequency', [s.row.pid])"
                ></i>
              </el-tooltip>
            </template>
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
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import LeiXing from "@/myComponents/LeiXing";
export default {
  data() {
    return {
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
  components: { LeiXing },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>