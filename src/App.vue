<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- 查询组件 -->
    <KolorQueryForm :formItems="formItems" v-model="model" @form-item-change="formItemChange"  />
    <!-- 表单组件 -->
    <KolorTable 
      :data="tableData" 
      :columns="columns" 
      :border="true" 
      :pagination="pagination"
      :show-pagination="true"
      @page-change="pageChange"
      @row-click="rowClick"
      stripe
      ref="multipleTable"
      class="kolor"
      id='wangyan'
    />
    <el-button @click="clearSelection">清空所有选择</el-button>
  </div>
</template>

<script>
import KolorTable from './components/kolor-table-jsx.vue';
import KolorQueryForm from './components/kolor-query-form-jsx.vue';

export default {
  name: 'App',
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: 'kolor',
          age: 18,
          sex: 'female'
        },
        {
          id: 2,
          name: '王嘉尔',
          age: 19,
          sex: 'male'
        },
        {
          id: 3,
          name: '周杰伦',
          age: 18,
          sex: 'female'
        },
        {
          id: 4,
          name: '林俊杰',
          age: 19,
          sex: 'male'
        },
        {
          id: 5,
          name: '林宥嘉',
          age: 18,
          sex: 'female'
        },
        {
          id: 6,
          name: '陈奕迅',
          age: 19,
          sex: 'male'
        },
      ],
      columns: [
        {
          type: "selection",
          width: "55"
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄',
          sortable: true
          // formatter: row => {
          //   return row.age > 18 ? `${row.age}(成年)`: `${row.age}(未成年)`
          // },
        },
        {
          prop: 'sex',
          label: '性别',
          scopedSlots: {
            default: ({ row }) => {
              return row.sex === 'male' ? <el-tag>男</el-tag> : <el-tag type={"warning"}>女</el-tag>
            }
          }
        },
        {
          prop: 'handle',
          label: '操作',
          scopedSlots: {
            default: () => {
              return (<div>
                <el-button type="text" size="small">删除</el-button>
                <el-button type="text" size="small">编辑</el-button>
             </div>)
            }
          }
        }
      ],
      pagination: {
      },
      formItems: [
        {
          type: 'select',
          prop: null,
          label: '校区',
          itemLists: [
            {
              prop: 'area',
              multiple: true,
              filterable: true,
              clearable: true,
              formatDataKey: {
                label: 'name',
                value: 'id'
              },
              dataLists: [
               {
                  name: '北京',
                  id: 'beijing',
                },
                {
                  name: '上海',
                  id: 'shanghai'
                },
                {
                  name: '四川',
                  id: 'sichuan'
                },
              ]
            },
            {
              prop: 'region',
              dataLists: [
               {
                  label: '东城区',
                  value: '21212'
                },
                {
                  label: '西南区',
                  value: 'kolor'
                }
              ]
            }
          ],
        },
        {
          type: 'select',
          prop: '',
          label: '班型',
          itemLists: [
            {
              prop: 'classType',
              multiple: true,
              filterable: true,
              dataLists: [
               {
                  label: '精品',
                  value: 'beijing',
                },
                {
                  label: '常规',
                  value: 'shanghai'
                },
                {
                  label: '一对一',
                  value: 'sichuan'
                },
              ]
            },
            {
              prop: 'class',
              dataLists: [
               {
                  label: '急死',
                  value: '21212'
                },
                {
                  label: '寄去',
                  value: 'kolor'
                }
              ]
            }
          ],
        },
        {
          type: 'select',
          prop: '',
          label: '年份',
          itemLists: [
            {
              prop: 'year',
              dataLists: [
               {
                  label: '2019',
                  value: '2019',
                },
                {
                  name: '2020',
                  value: '2020'
                },
                {
                  name: '2021',
                  value: '2021'
                },
              ]
            }
          ],
        }
      ],
      model: {
        region: 'kolor'
      }
    }
  },
  created() {
    // setTimeout(() => {
    //   this.tableData = [
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //     {
    //       id: 1,
    //       name: 'kolor',
    //       age: 18,
    //       sex: 'female'
    //     },
    //     {
    //       id: 2,
    //       name: '王嘉尔',
    //       age: 19,
    //       sex: 'male'
    //     },
    //   ]
    // }, 5000)
  },
  components: {
    KolorTable,
    KolorQueryForm
  },
  methods: { 
    pageChange(pagination) {
      console.log('页码变化', pagination)
    },
    rowClick(row) {
      console.log(row.name)
    },
    clearSelection() {
      this.$refs.multipleTable.ElTable().clearSelection();
    },
    formItemChange(value) {
      console.log('表单湘发生变化', value)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
