import BizForm from './form'
import BizFormItem from './form-item'
import BizPanel from './panel'
import BizTable from './table'
import BizFilterItem from './table/filter-item'
import BizLayout from './layout'
import BizSelect from './select'
import BizInput from './input'
import BizSearchInput from './search-input'

const components = [
  BizForm,
  BizFormItem,
  BizPanel,
  BizTable,
  BizFilterItem,
  BizLayout,
  BizSelect,
  BizInput,
  BizSearchInput
]

const install = function(Vue) {
  // 全局注册所有的组件
  components.forEach(component => {
    Vue.component(component.name, component);
  })
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
}


