<script>
import axios from 'axios'

export default {
  name: 'biz-table',

  inheritAttrs: false,

  provide () {
    return { bizTable: this }
  },

  props: {
    showPagination: {
      type: Boolean,
      default: true
    },

    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // selection: Boolean,
    exportFunction: Function,
    pagingFunction: Function,

    immediateFetchData: {
      type: Boolean,
      default: true
    },

    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100]
    },

    data: Array,

    columns: {
      type: Array,
      default: () => []
    },

    formModel: {
      type: Object,
      default: () => ({})
    },

    cellStyle: {
      type: Object,
      default: () => ({
        color: '#363A51',
        fontSize: '14px',
        borderBottom: 'none'
      })
    },

    headerRowStyle: {
      type: Object,
      default: () => ({
        color: '#363A51',
        fontSize: '14px'
      })
    },

    headerCellStyle: {
      type: Object,
      default: () => ({
        background: 'rgba(237,239,243, 0.6)',
        borderBottom: 'none'
      })
    },

    panelHeaderStyle: Object,
    panelBodyStyle: Object
  },

  data () {
    return {
      serverList: [],
      serverTotal: 0,
      serverError: null,
      pageNum: 1,
      pageSize: 10,
      exporting: false,
      loading: false,

      sysTime: new Date().getTime()
    }
  },

  computed: {
    isServerPaging () {
      const { pagingFunction } = this
      return typeof pagingFunction === 'function'
    },
    tableTotal () {
      const { isServerPaging, serverTotal, data } = this
      if (isServerPaging) return serverTotal
      return Array.isArray(data) ? data.length : 0
    },

    helpers () {
      return {
        fetchData: (val) => this.fetchData(val),
        refresh: () => this.fetchData(true),
        clear: () => this.clearTable()
      }
    },

    tableData () {
      const { isServerPaging, data, serverList, showPagination } = this
      if (isServerPaging) {
        return serverList
      }
      if (Array.isArray(data)) {
        if (!showPagination) return data

        const { pageNum, pageSize } = this
        const start = pageSize * (pageNum - 1)
        const end = pageSize * pageNum
        return data.slice(start, end)
      }
      return []
    }
  },

  methods: {
    async fetchData (/** @type{boolean} */ refresh) {
      if (!this.isServerPaging) return
      if (this.cancelRequest) {
        this.cancelRequest('cancel request')
        this.cancelRequest = null
      } else if (this.loading) {
        return
      }
      this.loading = true
      if (refresh === true) {
        this.pageNum = 1
      }
      let { pageNum, pageSize } = this

      try {
        let res = await this.pagingFunction({ ...this.formModel, pageNum, pageSize }, {
          cancelToken: new axios.CancelToken(cancel => {
            this.cancelRequest = cancel
          })
        })
        if ((res = res || { msg: '' }).code !== 0) {
          throw new Error(res.msg)
        }
        const { sysTime = Date.now(), data } = res
        const { list = [], total = 0 } = data || {}
        this.sysTime = sysTime
        this.serverTotal = total
        this.serverList = Array.isArray(list) ? list : []
        this.serverError = null
        this.cancelRequest = null
      } catch (error) {
        if (!axios.isCancel(error)) {
          this.sysTime = Date.now()
          this.serverTotal = 0
          this.serverList = []
          this.serverError = error?.message
          if (error?.message) {
            this.$message.error(error.message)
          }
        }
      } finally {
        this.loading = false
      }
    },
    async handleExport () {
      if (this.exporting) return
      this.exporting = true
      let { pageNum, pageSize } = this
      try {
        await this.exportFunction({ ...this.formModel, pageNum, pageSize })
      } finally {
        this.exporting = false
      }
    },

    clearTable() {
      this.pageNum = 1
      if (this.isServerPaging) {
        this.serverList = []
        this.serverTotal = 0
      }
    },

    handleCurrentChange (val) {
      this.pageNum = val
      this.fetchData()
    },

    handleSizeChange (val) {
      this.pageSize = val
      this.fetchData(true)
    },
    getElTable() {
      return this.$refs.elTable
    }
  },

  mounted () {
    if (this.immediateFetchData) {
      this.fetchData(true)
    }
  },

  render (h) {
    const { sysTime } = this
    const renderTableColumn = (column) => {
      if (!column || column.hidden) return null
      const { render, slotName, children, tooltip, renderHeader, ...rest } = column
      const data = { props: rest }
      let _renderHeader = renderHeader
      if (!_renderHeader && tooltip) {
        _renderHeader = () => {
          return (
            <el-popover content={tooltip} placement="top-start" width="200" trigger="hover">
              <span slot="reference">{rest.label}<i class="el-icon-info"></i></span>
            </el-popover>
          )
        }
      }
      let _render
      if (typeof slotName === 'string') {
        _render = child => (
          <el-table-column
            scopedSlots={{
              default: (scope) => (
                this.$scopedSlots[`${column.slotName}`] && this.$scopedSlots[`${column.slotName}`]({ ...scope, sysTime })
              )
            }}
            key={column.prop}
            renderHeader={_renderHeader}
            {...data}
          >{child}</el-table-column>
        )
      } else if (typeof render === 'function') {
        _render = val => (
          <el-table-column
            scopedSlots={{
              default: scope => render(h, { ...scope, sysTime })
            }}
            renderHeader={_renderHeader}
            key={column.prop}
            {...data}
          >{val}</el-table-column>
        )
      } else {
        _render = val => (
          <el-table-column
            renderHeader={_renderHeader}
            {...data} key={column.prop}
          >{val}</el-table-column>
        )
      }

      return _render(Array.isArray(children) ? children.map(renderTableColumn) : null)
    }

    return (
      <div class="biz-table">
        {this.$scopedSlots.filter && (
          <biz-panel bodyClass="biz-table-filter" style={this.panelHeaderStyle}>
            {this.$scopedSlots.filter({ model: this.formModel, helpers: this.helpers })}
          </biz-panel>
        )}
        <biz-panel style={this.panelBodyStyle}>
          { this.$scopedSlots.tableTop &&
            <div class="biz-table-top">
              {this.$scopedSlots.tableTop({model: this.formModel, helpers: this.helpers})}
            </div>
          }
          {(
            this.$scopedSlots.toolbar || this.$scopedSlots.toolbarRight || this.exportFunction
          ) && (
            <div class="biz-table-toolbar">
              <div class="biz-table-toolbar__l">
                {this.$scopedSlots.toolbar && this.$scopedSlots.toolbar()}
              </div>
              <div class="biz-table-toolbar__r">
                {this.$scopedSlots.toolbarRight && this.$scopedSlots.toolbarRight()}
                {this.exportFunction && (
                  <div v-loading={this.exporting}>
                    <img src={require('@/assets/icon/daochu.png')} class="export-icon" on-click={this.handleExport} />
                  </div>
                )}
              </div>
            </div>
          )}
          <el-table
            data={this.tableData}
            border
            stripe
            ref="elTable"
            header-row-style={this.headerRowStyle}
            header-cell-style={this.headerCellStyle}
            cell-style={this.cellStyle}
            {...{ props: this.$attrs, on: this.$listeners }}
            v-loading={this.loading}
          >
            {/** this.selection && (
              <el-table-column type="selection" width="40" key="_selection" />
            )**/}
            {this.columns.map(renderTableColumn)}
          </el-table>
          {this.showPagination && (
            <el-pagination
              on-current-change={this.handleCurrentChange}
              on-size-change={this.handleSizeChange}
              page-sizes={this.pageSizes}
              currentPage={this.pageNum}
              pageSize={this.pageSize}
              layout={this.pageLayout}
              total={this.tableTotal}
            >
            </el-pagination>
          )}
          {this.$scopedSlots.tableFooter && this.$scopedSlots.tableFooter()}
        </biz-panel>
      </div>
    )
  }
}
</script>

<style lang="scss">
.biz-table {
  &-filter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: -10px;
  }

  &-top {
    margin-bottom: 20px;
  }

  &-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;

    &__l {
      display: flex;
      align-items: center;
    }

    &__r {
      display: flex;
      align-items: center;
      .export-icon {
        width: 41px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
