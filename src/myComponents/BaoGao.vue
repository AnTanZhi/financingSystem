<template>
  <el-select v-model="copyDataId" placeholder="征信报告" :clearable="cle" @change="getChange" style="width:33%">
    <el-option v-for="(item,index) in dataInfo" :key="index" :label="item" :value="String(index)" />
  </el-select>
</template>
<script>
import index from "@/api/index";
export default {
  watch: {
    dataId() {
      this.copyDataId = this.dataId;
    },
  },
  model: { prop: "dataId", event: "change" },
  props: {
    dataId: {
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
      dataInfo: [],
      copyDataId: this.dataId,
    };
  },
  methods: {
    getChange(val) {
      this.$emit("change", val);
    },
    getCreditReport() {
      index.getCreditReport().then((res) => {
        this.dataInfo = res.data;
      });
    },
  },
  mounted() {
    this.getCreditReport();
  },
};
</script>

<style>
</style>