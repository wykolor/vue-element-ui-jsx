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
    /**格式化表单控件 */ 
    formatFormItem (formItem) {
      let itemEl = null;
      switch (formItem.type) {
        case 'select': 
          itemEl = formItem.itemLists && formItem.itemLists.map(item => (
            <el-select props={item} v-model={this.model[item.prop]} on={{...this.formatFormItemEvents(formItem, item.prop)}}>
              {item.dataLists.map(list => (
                <el-option props={list} label={list[item.formatDataKey && item.formatDataKey.label ? item.formatDataKey.label : 'label']} value={list[item.formatDataKey && item.formatDataKey.value ? item.formatDataKey.value : 'value']} key={list.value}></el-option>
              ))}
            </el-select>
          ));
          break;
        case 'input': 
          itemEl = (formItem.isAutoComplete ?
            <el-autocomplete props={formItem.itemList} v-model={this.model[formItem.prop]} on={{...this.formatFormItemEvents(formItem)}}></el-autocomplete>
           : 
            <el-input props={formItem.itemList} v-model={this.model[formItem.prop]} on={{...this.formatFormItemEvents(formItem)}}></el-input>
          ) 
          break;
        case 'timePicker': 
          itemEl = formItem.itemLists && formItem.itemLists.map(item => (
            item.timePickerSelect ?
            <el-time-select props={item} v-model={this.model[item.prop]} on={{...this.formatFormItemEvents(formItem, item.prop)}}></el-time-select>
            :
            <el-time-picker props={item} v-model={this.model[item.prop]} on={{...this.formatFormItemEvents(formItem, item.prop)}}></el-time-picker>
          ))
          break;
        case 'datePicker': 
          itemEl = formItem.itemLists && formItem.itemLists.map(item => (
            <el-date-picker props={item} v-model={this.model[item.prop]} on={{...this.formatFormItemEvents(formItem, item.prop)}}></el-date-picker>
          ))
          break;
        case 'switch': 
          itemEl = <el-switch props={formItem.itemList} v-model={this.model[formItem.prop]} on={{...this.formatFormItemEvents(formItem)}}></el-switch>
          break;
        case 'cascader': 
          itemEl = formItem.isCascaderPanel ? 
          <el-cascader-panel props={formItem.itemList} v-model={this.model[formItem.prop]} on={{...this.formatFormItemEvents(formItem)}}></el-cascader-panel>
          :
          <el-cascader props={formItem.itemList} v-model={this.model[formItem.prop]} on={{...this.formatFormItemEvents(formItem)}}></el-cascader>
          break;
        case 'radio': 
          itemEl = <el-radio-group props={formItem.groupProps} v-model={this.model[formItem.prop]} on={{...this.formatFormItemEvents(formItem)}}>
            {formItem.itemLists && formItem.itemLists.map(item => (
              formItem.groupType === 'button' ?
                <el-radio-button props={item}></el-radio-button>
                :
                <el-radio props={item}></el-radio>
            ))}
          </el-radio-group>
          break;
        case 'checkbox': 
          itemEl = <el-checkbox-group props={formItem.groupProps} v-model={this.model[formItem.prop]} on={{...this.formatFormItemEvents(formItem)}}>
            {formItem.itemLists && formItem.itemLists.map(item => (
              formItem.groupType === 'button' ?
                <el-checkbox-button props={item}></el-checkbox-button>
                :
                <el-checkbox props={item}></el-checkbox>
            ))}
          </el-checkbox-group>
          break;
        case 'default': 
          itemEl = null;
      }
      return itemEl;
    },

    /**格式化表单控件的事件处理, 暴露给父组件监听 */
    formatFormItemEvents(formItem, prop = formItem.prop) {
      const on = {
        change: value => this.$emit('form-item-change', { prop, value })
      };
      // switch (formItem.type) {
      //   case 'select': 
      //     on['change'] = value => this.$emit('form-item-change', { prop, value });
      //     break;
      //   case 'input': 
      //     on['change'] = value => this.$emit('form-item-change', { prop, value });
      //     break;
          
      //   case 'default': 
      //     break;
      // }
      return on;
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