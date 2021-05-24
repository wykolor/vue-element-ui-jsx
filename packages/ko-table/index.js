import KoTable from './src/ko-table.vue';

KoTable.install = function(Vue) {
  Vue.component(KoTable.name, KoTable)
}

export default KoTable