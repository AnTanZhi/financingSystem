<template>
  <div class="view-container bg-gray">
    <div class="border-card">
      <header class="view-header" style="margin-bottom:0px !important">
        <div class="header-container">
          <el-form :inline="true" :model="selectParams" class="demo-form-inline">
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-form-item>
                  <div style="display:flex">
                    <el-select v-model="isNull" clearable style="width:130px">
                      <el-option label="保证合同编号" value="保证合同编号" />
                      <el-option label="债权机构" value="债权机构" />
                      <el-option label="被担保人" value="被担保人" />
                    </el-select>：
                    <el-input v-model="isNull" placeholder="请输入关键字" style="width:200px" />
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-date-picker v-model="isNull" type="daterange" range-separator="~" start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div style="text-align:end">
                <el-form-item>
                  <ShangChuan v-model="isNull" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-download">模板下载</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-document-checked">导出</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus">添加</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete">删除选中</el-button>
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
          <el-table-column type="selection" />
          <el-table-column label="序号" />
          <el-table-column label="保证合同编号" />
          <el-table-column label="被担保人" />
          <el-table-column label="债权机构" />
          <el-table-column label="还款责任金额" />
          <el-table-column label="借款金额" />
          <el-table-column label="担保金额" />
          <el-table-column label="起始日期" />
          <el-table-column label="到期日期" />
          <el-table-column label="备注" />
          <el-table-column label="操作">
            <template>
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <i class="el-icon-edit-outline edit-btn" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <i class="el-icon-delete edit-btn" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <el-pagination style="text-align: end;" background @size-change="publicSizeSelect"
        @current-change="publicPageSelect" :current-page="selectParams.pageIndex" :page-sizes="[10, 20, 50, 100]"
        :page-size="selectParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="0">
      </el-pagination>
    </div>
    <el-dialog title="对外担保信息" :visible.sync="addOrUpdateDig">
      <el-form :model="isNull" label-position="right" label-width="170px">
        <el-form-item label="保证合同编号：">
          <el-input v-model="isNull" clearable style="width:80%" />
        </el-form-item>
        <el-form-item label="债权机构：">
          <el-input v-model="isNull" clearable style="width:80%" />
        </el-form-item>
        <el-form-item label="被担保人：">
          <el-input v-model="isNull" clearable style="width:80%" />
        </el-form-item>
        <el-form-item label="还款责任金额：">
          <el-input v-model="isNull" clearable type="number" style="width:80%" />
        </el-form-item>
        <el-form-item label="借款金额：">
          <el-input v-model="isNull" clearable type="number" style="width:80%" />
        </el-form-item>
        <el-form-item label="担保余额：">
          <el-input v-model="isNull" clearable type="number" style="width:80%" />
        </el-form-item>
        <el-form-item label="起始日期：">
          <el-date-picker v-model="isNull" type="date" value-format="yyyy-MM-dd HH:mm:ss" clearable style="width:80%" />
        </el-form-item>
        <el-form-item label="到期日期：">
          <el-date-picker v-model="isNull" type="date" value-format="yyyy-MM-dd HH:mm:ss" clearable style="width:80%" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="isNull" style="width:80%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateDig = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateDig = false" v-loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import ShangChuan from "@/myComponents/ShangChuan";
export default {
  data() {
    return {
      isNull: "",
      /* 查询参数 */ selectParams: { pageIndex: "", pageSize: "" },
      addOrUpdateDig: true,
    };
  },
  methods: {},
  mounted() {},
  components: { ShangChuan },
  mixins: [publicMixin],
};
</script>

<style lang="scss" scoped>
</style>