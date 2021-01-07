<template>
  <el-form label-position="right" label-width="200px" style="margin-top: 20px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="土地编号：">
          <el-input clearable style="width:240px" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地块名称：">
          <el-input clearable style="width:240px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="档案号：">
          <el-input clearable style="width:240px" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="面积：">
          <el-input clearable type="number" style="width:240px;margin-right:10px" />㎡
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="产权坐落位置：">
          <el-input clearable style="width:73%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="使用权类型：">
          <el-input clearable style="width:240px" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="土地证（或不动产证）编号：">
          <el-input clearable type="number" style="width:240px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="占地面积：">
          <el-input clearable type="number" style="width:240px;margin-right:10px" />亩
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="土地证存放地点：">
          <el-input clearable style="width:240px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="他项权证号：">
          <el-input clearable style="width:240px" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="土地出让金额：">
          <el-input clearable type="number" style="width:240px;margin-right:10px" />万元
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="价值（万元/亩）：">
          <el-input clearable type="number" style="width:240px;margin-right:10px" />万元
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="土地出让年限：">
          <el-input clearable type="number" style="width:240px;margin-right:10px" />万元
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="土地用途（地类）：">
          <el-input clearable style="width:240px" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="归属公司：">
          <GongSi v-model="isNull" style="width:240px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="抵押用于融资项目名称：">
          <el-input clearable style="width:73%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="抵押金融机构：">
          <el-input clearable style="width:73%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="抵押期限：">
          <el-date-picker v-model="isNull" type="daterange" range-separator="~" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:240px">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="抵押价值：">
          <el-input clearable type="numbe" style="width:240px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="状态：">
          <span>暂无</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{ minRows: 4}" style="width:73%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="相关附件：">
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import publicMixin from "@/mixin/publicMixin";
import GongSi from "@/myComponents/GongSi";
export default {
  data() {
    return {
      isNull: "",
    };
  },
  mounted() {},
  methods: {},
  components: { GongSi },
  mixins: [publicMixin],
};
</script>

<style>
</style>