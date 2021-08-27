<template>
  <div class="biz-search-input">
    <el-input v-on="$listeners" v-bind="$attrs" @keyup.enter.native="$emit('search', $event)">
    </el-input>
    <img class="biz-search-icon" src="@/assets/icon/search.png" @click="$emit('search', $event)">
  </div>
</template>

<script>
export default {
  name: 'biz-search-input',
  inheritAttrs: false,
}
</script>

<style lang="scss">
.biz-search-input {
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  margin-right: 20px;
  .biz-search-icon {
    vertical-align: middle;
    cursor: pointer;
  }
  .el-input {
    vertical-align: middle;
    font-size: 14px;
    width: 200px;
  }
}
</style>
