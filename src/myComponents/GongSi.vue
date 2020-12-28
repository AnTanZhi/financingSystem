<template>
  <el-select
    v-model="copyCompanyId"
    placeholder="所属公司"
    :clearable="cle"
    @change="getChange"
  >
    <el-option
      v-for="(item,index) in companyData"
      :key="index"
      :label="item"
      :value="index"
    ></el-option>
  </el-select>
</template>
<script>
import index from "@/api/index";
export default {
  watch: {
    posId() {
      this.copyCompanyId = this.companyId;
    },
  },
  model: { prop: "companyId", event: "change" },
  props: {
    companyId: {
      type: [String, Number],
      default: "",
      required: false,
    },
    cle: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      /* 职位 */
      companyData: [],
      copyCompanyId: this.companyId,
    };
  },
  methods: {
    getChange(val) {
      this.$emit("change", val);
    },
    getCompany() {
      index.getCompany().then((res) => {
        this.companyData = res.data;
      });
    },
  },
  mounted() {
    this.getCompany();
  },
};
</script>

<style>
</style>