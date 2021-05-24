<script>
import ElTable from "element-ui/lib/table";
import { getPropsAndAttrs } from '../../utils';

export default {
  name: 'KoTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      defaultPagination: {
        'current-page': 1,
        'page-sizes': [10, 20, 30, 40, 50, 100],
        'page-size': 10,
        'layout': 'total, sizes, prev, pager, next, jumper',
      },
    }
  },
  computed: {
    mergedPagination() {
      const total = this.data.length;
      return { total, ...this.defaultPagination, ...this.pagination }
    },
    pageListeners() {
      return {
        'size-change': pageSize => {
          this.defaultPagination['page-size'] = pageSize;
          this.defaultPagination['current-page'] = 1;
          this.$emit('page-change', {pageSize, currentPage: this.defaultPagination['current-page']});
        },
        'current-change': currentPage => { 
           this.defaultPagination['current-page'] = currentPage;
          this.$emit('page-change', {pageSize: this.mergedPagination['page-size'], currentPage});
        },
      }
    },
  },
  methods: {
    ElTable() {
      return this.$refs.ElTable;
    }
  },
  render() {
    const elTableProps = ElTable.props;
    // 从$attrs里提取作为prop的值
    const { props, attrs } = getPropsAndAttrs(this.$attrs, elTableProps);
    
    const tableAttrs = {
      attrs,
      on: {
        ...this.$listeners,
      },
      props: {
        ...props,
        data: this.data,
      },
      ref: 'ElTable'
    };

    /**分页器的attr */ 
    const paginnationAttrs = {
      props: this.mergedPagination, 
      on: {
        'size-change': pageSize => {
          this.defaultPagination['page-size'] = pageSize;
          this.defaultPagination['current-page'] = 1;
          this.$emit('page-change', { pageSize, currentPage: this.defaultPagination['current-page']});
        },
        'current-change': currentPage => { 
          this.defaultPagination['current-page'] = currentPage;
          this.$emit('page-change', {pageSize: this.mergedPagination['page-size'], currentPage});
        }
      }
    };
    return (
      <div class="el-table-jsx">
        <el-table {...tableAttrs}>
          { this.columns.map((column, index) => {
            const { scopedSlots, ...columnProps } = column;
            return (
              <el-table-column
                key={index}
                props={columnProps}
                scopedSlots={scopedSlots}
              />
            );
          }) }
        </el-table>
        { this.showPagination && <el-pagination {...paginnationAttrs}/> }
      </div>
    );
  },
};
</script>
