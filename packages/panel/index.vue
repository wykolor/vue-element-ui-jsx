<template>
  <div class="biz-panel">
    <div class="biz-panel-title" :class="{'border-bottom': !($scopedSlots.subtitle || subtitle)}" v-if="$scopedSlots.title || title">
      <slot name="title">
        <span class="biz-panel-title__text">{{title}}</span>
      </slot>
    </div>
    <div class="biz-panel-subtitle"  v-if="$scopedSlots.subtitle || subtitle">
      <slot name="subtitle">
        <span class="biz-panel-subtitle__text" :style="{'color': subtitleColor}">{{subtitle}}</span>
      </slot>
    </div>
    <div class="biz-panel-body" :class="[{ 'has-title': $scopedSlots.title || title }, bodyClass]"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'biz-panel',
  props: ['title', 'subtitle', 'subtitleColor', 'bodyClass']
}
</script>

<style lang="scss">
.biz-panel {
  border: 1px solid #e3e7f1;
  background: #fff;
  border-radius: 2px;
  padding: 20px;
  margin: 16px;
  &-body {
    &.has-title {
      padding: 20px;
    }
  }
  &-title {
    margin: -16px -16px 0;
    min-height: 54px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    &__text {
      line-height: 54px;
      font-size: 18px;
      font-weight: 700;
    }
    &.border-bottom {
      border-bottom: 1px solid #e3e7f1;
    }
  }
  &-subtitle {
    font-size: 14px;
    margin: -16px -16px 0;
    border-bottom: 1px solid #e3e7f1;
    padding: 10px;
  }
}
</style>
