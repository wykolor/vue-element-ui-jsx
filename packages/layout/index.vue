<template>
  <div class="biz-layout" :class="{ 'is-full': isFull }">
    <div class="biz-layout-tab" v-if="!type">
      <el-tabs :before-leave="beforeLeave" :value="currentTab" @input="$emit('update:currentTab', $event)" :type="type" v-on="$listeners" v-if="tabs && tabs.length">
        <el-tab-pane v-for="item in tabs" :key="item.key" :label="item.label" :name="item.key" lazy>
          <component v-if="item.component" :is="item.component" v-bind="getComponentProps(item)" v-on="item.on || {}" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-tabs :before-leave="beforeLeave" :value="currentTab" @input="$emit('update:currentTab', $event)" :type="type" v-on="$listeners" v-else-if="tabs && tabs.length">
      <el-tab-pane v-for="item in tabs" :key="item.key" :label="item.label" :name="item.key" lazy>
        <component v-if="item.component" :is="item.component" v-bind="getComponentProps(item)" v-on="item.on || {}" />
      </el-tab-pane>
    </el-tabs>
    <div class="biz-layout-body" v-if="isFull">
      <div class="biz-layout-body__scroll">
        <div class="biz-layout-sider">
          <slot name="sider" />
        </div>
        <div class="biz-layout-main">
          <slot />
        </div>
      </div>
    </div>
    <div class="biz-layout-body" v-else>
      <div class="biz-layout-sider">
        <slot name="sider" />
      </div>
      <div class="biz-layout-main">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'biz-layout',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'card'
    },
    tabs: Array,
    isFull: {
      type: Boolean,
      default: true
    },
    currentTab: {}
  },
  methods: {
    getComponentProps (tabItem) {
      const { component, key, label, on, ...rest } = tabItem
      return { ...rest, tab: key, tabLabel: label }
    },
    beforeLeave (active) {
      const currentItem = this.tabs.find(item => item.key === active)
      if (!currentItem || !currentItem.component) {
        this.$message('该功能还未上线，敬请期待!')
        return false
      }
    }
  },
}
</script>

<style lang="scss">
.biz-layout {
  &-tab {
    .el-tabs__header {
      background: #fff;
      margin: 16px 16px 0;
      padding: 0 16px;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
    .el-tabs__item {
      padding: 16px;
      height: inherit;
      line-height: inherit;
    }
    .el-tabs__item.is-active {
      border-top: none;
      border-right: none;
      background: transparent;
    }
  }
  &.is-full {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .biz-layout-main {
      flex: 1;
      min-width: 0;
    }
    .biz-layout-body {
      flex: 1;
      position: relative;
      min-width: 0;
    }
    .biz-layout-body__scroll {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      overflow-y: auto;
      display: flex;
    }
  }
  &-main {
    flex: 1;
    min-width: 0;
  }

  &-body {
    display: flex;
  }

  &-sider {
    position: sticky;
    top: 0;
    & > .biz-panel {
      margin-right: 0;
    }
  }

  .el-tabs--card {
    .el-tabs__header.is-top {
      margin-bottom: 0;
      padding-top: 20px;
    }
  }

  .el-tabs__content {
    padding: 0;
  }
}
</style>
