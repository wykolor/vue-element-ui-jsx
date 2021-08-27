<template>
  <el-form v-bind="$attrs" v-on="$listeners" class="biz-form" ref="form" :model="model" :label-suffix="labelSuffix">
    <div v-if="error" class="biz-form-init-error">
      <div>
        <img src="./form-error.png" />
        <p style="color: #79849A">{{ error.message || error }}</p>
      </div>
    </div>
    <el-row v-else>
      <slot />
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'biz-form',
  provide () {
    return {
      bizForm: this
    }
  },
  inheritAttrs: false,
  props: {
    span: {
      type: [Number],
      default: 8
    },
    labelSuffix: {
      type: String,
      default: '：'
    },
    loading: Boolean,
    readonly: Boolean,
    error: [Error, Object, String],
    model: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    getElForm() {
      return this.$refs.form
    }
  }
}
</script>

<style lang="scss">
.biz-form.el-form {
  .el-form-item .el-form-item__label {
    text-align: left;
    white-space: nowrap;
  }
  &:not(.el-form--label-left) {
    .el-form-item .el-form-item__label {
      text-align: right;
      white-space: nowrap;
    }
  }
}
.biz-form-init-error {
  text-align: center;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
