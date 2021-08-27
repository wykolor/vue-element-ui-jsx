<script>
import GeekSkeleton from '@/components/geek-skeleton'
// import { getPropByPath } from 'element-ui/lib/utils/util'

export default {
  name: 'biz-form-item',
  components: { GeekSkeleton },
  inject: {
    bizForm: {
      default: ''
    }
  },
  provide () {
    return { bizFormItem: this }
  },
  inheritAttrs: false,
  props: {
    span: Number,
    prop: {
      type: String,
      default: '\0unset'
    },
    labelWidth: {},
    required: Boolean,
    label: String,
    maxLength: Number,
    readonly: Boolean,
    rules: {
      type: Array,
      default: () => []
    },
    format: {
      type: Function,
      default: v => v
    }
  },
  render () {
    const { bizForm, readonly, label, labelWidth, formSpan } = this
    if (!bizForm) return null

    const renderContent = () => (
      <geek-skeleton loading={bizForm.loading} title={false} active>
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </geek-skeleton>
    )

    if (bizForm.readonly || readonly) {
      return (
        <el-col span={formSpan}>
          <el-form-item label={label} labelWidth={labelWidth} key="display">
            {renderContent()}
          </el-form-item>
        </el-col>
      )
    }

    const data = {
      props: { ...this.$attrs, label, rules: this.formItemRules, prop: this.prop, labelWidth },
      on: this.$listeners
    }

    return (
      <el-col span={formSpan}>
        <el-form-item {...data} key="form-item" class="biz-form-item">
          {renderContent()}
        </el-form-item>
      </el-col>
    )
  },
  computed: {
    formSpan () {
      const { span, bizForm } = this
      let ret = 8
      if (!Number.isNaN(span) && span !== undefined) {
        ret = span
      } else if (bizForm && !Number.isNaN(bizForm.span)) {
        ret = bizForm.span
      }

      if (ret >= 0 && ret <= 24) {
        return ret
      }

      return 8
    },
    formItemRules () {
      const { rules, required, label, maxLength } = this
      let ret = []
      if (required) {
        const msg = String(label).length > 8 ? '不能为空' : `${label}不能为空`
        ret.push({ required: true, message: msg })
      }
      if (maxLength > 0) {
        ret.push({
          validator (rule, val, callback) {
            const len = String(val).length
            if (len > maxLength) {
              return callback(new Error(`长度不能大于${maxLength}`))
            }
            callback()
          }
        })
      }
      return ret.concat(rules)
    },
    // displayValue () {
    //   if (!this.bizForm) return
    //   const { readonly, model } = this.bizForm
    //   if (!readonly) return ''
    //   const { format, prop } = this
    //   const obj = getPropByPath(model, prop, true)
    //   if (obj) {
    //     return format(obj.v, model)
    //   }
    //   return ''
    // }
  }
}
</script>

<style lang="scss">
.biz-form-item.el-form-item {
  .el-select + .el-select {
    margin: 0 6px;
  }
}
</style>
