import KoForm from './ko-form/src/ko-form.vue';
import KoTable from './ko-table/src/ko-table.vue';

const components = [
  KoForm,
  KoTable
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


