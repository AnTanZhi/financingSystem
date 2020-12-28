<template>
  <el-select
    v-model="copyFid"
    placeholder="所属大类"
    @change="getChange"
  >
    <el-option
      v-for="item in fidData"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import index from "@/api/index";
export default {
  watch: {
    fid() {
      this.copyFid = this.fid;
    },
  },
  model: { prop: "fid", event: "change" },
  props: {
    fid: {
      type: [String, Number, Array],
      default: 18,
      required: false,
    },
  },
  data() {
    return {
      /* 角色 */
      fidData: [],
      /* model */
      copyFid: this.fid,
    };
  },
  methods: {
    getChange(val) {
      this.$emit("change", val);
    },
    /* 获取角色 */
    getFid() {
      index.getCategories(0).then((res) => {
        this.fidData = res.data;
      });
    },
  },
  mounted() {
    this.getFid();
  },
};
</script>

<style>
</style>