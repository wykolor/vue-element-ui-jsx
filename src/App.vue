<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- 查询组件 -->
    <KolorQueryForm :formItems="formItems" v-model="model" @form-item-change="formItemChange" />
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
          prop: null,
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
          prop: null,
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
        },
        {
          type: 'input',
          prop: 'studentNumber',
          label: '学生ＩＤ',
          // isAutoComplete: false, // 新增
          itemList: {
            type: 'text',
            clearable: true
          },
        },
        {
          type: 'timePicker',
          prop: null,
          label: '学生上学时间',
          itemLists: [
            {
              prop: 'startTime',
              timePickerSelect: true, // 是否使用时间下拉选择
              'picker-options': {
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }
            },
            {
              prop: 'endTime',
              'is-range': true,
            }
          ]
        },
        {
          type: 'datePicker',
          prop: null,
          label: '学生报名日期',
          itemLists: [
            {
              prop: 'startDate',
              type: 'date',
            },
            {
              prop: 'endDate',
              type: 'datetime'
            }
          ]
        },
        {
          type: 'switch',
          prop: 'isSchool',
          label: '是否在上学',
          itemList: {
            'active-color': "red"
          }
        },
        {
          type: 'cascader',
          prop: 'address',
          label: '地址',
          isCascaderPanel: false, // 是否为级联面板
          itemList: {
             options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
          }
        },
        {
          type: 'radio',
          prop: 'hobby',
          label: '爱好',
          groupType: '', // 单选框格式 可选值 normal| button
          groupProps: {}, // Radio-group Attributes
          itemLists: [
            // Radio Attributes
            {
              label: 'sing',
            },
            {
              label: 'jump',
            }
          ]
        },
        {
          type: 'checkbox',
          prop: 'eatList',
          label: '今晚吃啥',
          groupType: 'button', // 复选框样式 可选值 normal | button,
          groupProps: {}, // checkbox-Group Attributes
          itemLists: [
            {
              label: '大盘鸡'
            },
            { 
              label: '西北面'
            }
          ]
        }
      ],
      model: {
        eatList: []
      }
    }
  },
  created() {},
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
      console.log('表单湘发生变化', value);
      console.log(this.model);
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
