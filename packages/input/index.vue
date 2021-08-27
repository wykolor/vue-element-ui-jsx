<script>
export default {
  name: 'biz-input',
  inject: {
    bizForm: {
      default: ''
    },
    bizFormItem: {
      default: ''
    }
  },
  props: {
    value: {},
    width: {
      type: Number,
      default: 240
    }
  },
  inheritAttrs: false,
  render() {
    const { value } = this
    if (
      (!this.bizForm || !this.bizFormItem) ||
      (!this.bizForm.readonly && !this.bizFormItem.readonly)
    ) {
      return (
        <el-input class="biz-input" {...{ props: { value, ...this.$attrs }, attrs: this.$attrs, on: this.$listeners, style: { width: `${this.width}px` } }} />
      )
    }

    return (
      <span class="biz-input-value__readonly">{this.value}</span>
    )
  }
}
</script>

<style lang="scss">
.biz-input {
  margin: 0 6px;
}
.biz-input-value__readonly {
  color: #666666;
  line-height: 36px;
}
</style>
