<script>
import ElForm from "element-ui/lib/form";
import { getPropsAndAttrs } from '../utils/index';

export default {
  model: {
    prop: 'model',
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatFormItem (formItem) {
      let itemEl = null;
      switch (formItem.type) {
        case 'select': 
          itemEl = formItem.itemLists.map(item => (
            <el-select props={item} v-model={this.model[item.prop]} on={{change: (value) => this.$emit('form-item-change', {prop: item.prop, value})}}>
              {item.dataLists.map(list => (
                <el-option props={list} label={list[item.formatDataKey && item.formatDataKey.label ? item.formatDataKey.label : 'label']} value={list[item.formatDataKey && item.formatDataKey.value ? item.formatDataKey.value : 'value']} key={list.value}></el-option>
              ))}
            </el-select>
          ))
          break;
        case 'default': 
          itemEl = null;
      }
      return itemEl;
    }
  },
  render() {

    const elTableProps = ElForm.props;
    // 从$attrs里提取作为prop的值
    const { props, attrs } = getPropsAndAttrs(this.$attrs, elTableProps);
    const formAttrs = {
      attrs,
      on: {
        ...this.$listeners,
      },
      props: {
        ...props,
        model: this.model,
      },
    };
    return (
      <div>
        <el-form {...formAttrs}>
          {this.formItems.map((formItem, index) => (
            <el-form-item props={formItem} key={index}>
              { this.formatFormItem(formItem)}
            </el-form-item>
          ))}
        </el-form>
      </div>
    )
  }
}
</script>