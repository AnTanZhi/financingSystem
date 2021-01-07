<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-form-item>
                  <el-date-picker v-model="isNull" type="month" placeholder="选择月" clearable />
                </el-form-item>
              </div>
              <div style="text-align: end;">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked">导出</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus">添加计划</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </header>
      <section class="table-container view-section">
        <el-table :header-cell-style="{background:'#F0FAFF',color:'#787878'}" border stripe v-loading="loading"
          element-loading-text="加载中，请稍候……" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange" :summary-method="getSummaries" show-summary>
          <el-table-column label="1月份拟放款项目">
            <el-table-column label="序号" />
            <el-table-column label="金融机构" />
            <el-table-column label="资金品种" />
            <el-table-column label="额度(万元)" />
            <el-table-column label="期限" />
            <el-table-column label="进展情况" />
            <el-table-column label="预计到账时间" />
            <el-table-column label="实际到账金额(万元)" />
            <el-table-column label="实际到账时间" />
            <el-table-column label="负责人" />
            <el-table-column label="备注" />
            <el-table-column label="操作"></el-table-column>
          </el-table-column>
        </el-table>
      </section>
      <el-pagination style="text-align: end;" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="selectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="添加月计划" :visible.sync="addOrUpdateDig">
      <el-form :model="isNull" label-position="right" label-width="110px">
        <el-form-item label="年月：">
          <el-date-picker v-model="isNull" type="month" placeholder="选择月" clearable />
        </el-form-item>
        <el-form-item label="金融机构：">
          <el-input clearable style="width:220px" />
        </el-form-item>
        <el-form-item label="资金品种：">
          <el-input clearable style="width:220px" />
        </el-form-item>
        <el-form-item label="额度：">
          <el-input clearable type="number" style="width:220px;margin-right:10px" />万元
        </el-form-item>
        <el-form-item label="期限：">
          <el-input clearable type="number" style="width:220px" />
        </el-form-item>
        <el-form-item label="进展情况：">
          <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入内容" style="width:220px" />
        </el-form-item>
        <el-form-item label="预计到账时间：">
          <el-input clearable type="number" style="width:220px" />
        </el-form-item>
        <el-form-item label="实际到账金额：">
          <el-input clearable type="number" style="width:220px;margin-right:10px" />万元
        </el-form-item>
        <el-form-item label="实际到账时间：">
          <el-date-picker type="date" placeholder="选择日期" clearable />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入内容" style="width:220px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateDig = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateDig = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
export default {
  data() {
    return {
      isNull: "",
      /* 查询参数 */ selectParams: { pageIndex: 1, pageSize: 10 },
    };
  },
  methods: {},
  mounted() {},
  components: {},
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>