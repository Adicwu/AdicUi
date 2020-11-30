<template>
  <div class="aw-collapse-item" :class="itemStyle">
    <div class="aw-collapse-item__title" @click="handleHeaderClick">
      <slot name="title">{{ title }}</slot>
      <i class="">x</i>
    </div>
    <AwCollapseTransition>
      <div class="aw-collapse-item__inner" v-show="isActive" ref="$inner">
        <div class="aw-collapse-item__inner-content">
          <slot />
        </div>
      </div>
    </AwCollapseTransition>
  </div>
</template>
<script>
import AwCollapseTransition from "@src/transitions/collapse-transition";
export default {
  name: "AwCollapseItem",
  components: {
    AwCollapseTransition,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "item",
    },
    name: {
      type: [String, Number],
      default: Math.random(),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: ["collapse"],
  data() {
    return {
      active: false,
    };
  },
  computed: {
    itemStyle() {
      return {
        "aw-collapse-item-active": this.isActive,
        _disabled: this.disabled,
      };
    },
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) != -1;
    },
  },
  methods: {
    handleHeaderClick() {
      this.collapse.activeNamesAdd(this.name);
    },
  },
};
</script>
<style lang="less" scoped>
.aw-collapse-item {
  width: 100%;
  background: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  overflow: hidden;
  &-active {
    margin: 10px 0;
    border-radius: 8px;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
  &__inner {
    width: 100%;
    &-content {
      width: 100%;
      padding: 0 24px 16px;
      box-sizing: border-box;
    }
  }
}
</style>