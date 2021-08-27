<template>
  <div class="biz-filter-item">
    <label v-if="label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'biz-filter-item',
  props: ['label']
}
</script>

<style lang="scss">
.biz-filter-item {
  display: flex;
  align-items: center;
  margin: 0 10px 10px 0;
  .el-input {
    &+ .el-input {
      margin-left: 5px;
    }
    &+ .el-select {
      margin-left: 5px;
    }
  }
  .el-select {
    &+ .el-input {
      margin-left: 5px;
    }
    &+ .el-select {
      margin-left: 5px;
    }
  }
  & > label {
    margin-right: 10px;
  }
}
</style>
