# vue-element-ui-jsx

基于vue2+ 使用jsx二次封装element-ui的业务组件，通过全数据配置方式生成视图

## Project setup
```
npm install / yarn
```

### Compiles and hot-reloads for development
```
npm run serve / yarn serve / yarn start
```

### Compiles and minifies for production
```
npm run build / yarn build
```

### Lints and fixes files
```
npm run lint 
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### KolorTable组件 Attributes

> 根容器为el-table组件，组件的Attributes除了以下新增的之外，还支持所有el-table的Attributes

| 新增参数 | 说明 | 类型 | 可选值 | 默认值 |
| :----: | :----: | :----: | :----: | :----: |
| data | 表格数据对象 | Array | |   -     |    -    |
| columns | 单元格数据对象(用于渲染<el-table-column>) | Array |全部为el-table-column的Attributes |  -      |      
| show-pagination | 是否展示分页器 | boolean | false/true |    true    |       
| pagination | 分页配置 | Object | 全部为el-pagination的Attributes |     -  |        


### KolorTable组件 Events 

> 除了下面新增的events之外，还支持所有el-table的events

| 事件名 | 说明 | 返回值 | 
| :----: | :----: | :----: | 
| page-change | 监听分页变化，映射 <el-pagination>组件的所有事件 | { currentPage, pageSize } | 


### 父组件访问el-table组件实例

```JavaScript

<KolorTableJsx 
  :data="tableData" 
  :columns="columns" 
  :border="true" 
  :pagination="pagination"
  :show-pagination="true"
  @page-change="pageChange"
  @row-click="rowClick"
  stripe
  ref="kolorTable"
/>

...

this.$refs.multipleTable.ElTable();

// 拿到实例时候，可以执行所有官方el-table的Methods

// 例： 用于多选表格，清空用户的选择  其余Methods查看element-ui官方文档 

<[链接地址](https://element.eleme.cn/#/zh-CN/component/table#table-methods)>

this.$refs.multipleTable.ElTable().clearSelection();

```

### KolorQueryFormJsx 组件 Attributes

> 根容器为el-form组件，组件的Attributes除了以下新增的之外，还支持所有el-form的Attributes和事件

| 新增参数 | 说明 | 类型 | 可选值 | 默认值 |
| :----: | :----: | :----: | :----: | :----: |
| v-model | 表单的双向绑定值 | object | |   -     |    -    |
| formItems | 表单的数据对象(用于渲染<el-form-item>) | Array(数据格式见下文说明) | - |  -      |    

## formItems数据格式说明