<script>
function createFormatFunc (options) {
  return val => {
    const doit = t => {
      if (Array.isArray(options)) {
        const find = options.find(c => c.value === t)
        return find ? find.label : ''
      }
      return options ? options[t] : ''
    }
    if (Array.isArray(val)) {
      return val.map(doit)
    }
    return doit(val)
  }
}

function isObject (opt) {
  return Object.prototype.toString.call(opt) === '[object Object]'
}

function normalizeOptions(opt) {
  if (Array.isArray(opt)) {
    return opt.map(item => {
      if (typeof item === 'string' || typeof item === 'number' || item === null || item === undefined) {
        return { label: item, value: item }
      }
      return item
    })
  }
  if (isObject(opt)) {
    const keys = Object.keys(opt)
    return keys.map(key => ({ value: key, label: opt[key] }))
  }
  return []
}

export default {
  name: 'biz-select',
  inject: {
    bizForm: {
      default: ''
    },
    bizFormItem: {
      default: ''
    }
  },
  props: {
    options: [Array, Object],
    value: {},
    optionProp: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' })
    }
  },
  inheritAttrs: false,
  render () {
    const { value, options, optionProp } = this
    const realOptions = normalizeOptions(options)

    if (
      (!this.bizForm || !this.bizFormItem) ||
      (!this.bizForm.readonly && !this.bizFormItem.readonly)
    ) {
      return (
        <el-select collapse-tags {...{ props: { value, ...this.$attrs }, on: this.$listeners }}>
          {realOptions.map((option) => (
            <el-option key={option[optionProp.value]} label={option[optionProp.label]} value={option[optionProp.value]} disabled={option.disabled}></el-option>
          ))}
        </el-select>
      )
    }

    const val = createFormatFunc(realOptions)(value)

    return (
      <span class="biz-select-value__readonly">{Array.isArray(val) ? val.join('、') : val}</span>
    )
  }
}
</script>

<style lang="scss">
.biz-select-value__readonly {
  color: #666666;
  line-height: 36px;
}
</style>
