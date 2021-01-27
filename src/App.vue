<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
.el-table__body tr.current-row > td {
  background: darkturquoise;
  color: #fff;
}
.el-table__body-wrapper {
  z-index: 2;
}
.has-gutter {
  tr {
    th {
      text-align: center;
    }
  }
}
</style>
