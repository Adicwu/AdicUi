<template >
  <div class="aw-option" :class="optionClass" @click="clickHandler">
    <slot />
    <span>{{ label }}</span>
  </div>
</template>
<script>
export default {
  name: "AwOption",
  props: {
    label: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isActive() {
      return this.$parent.value === this.value;
    },
    optionClass() {
      return {
        "aw-option-active": this.isActive,
        "aw-option-disabled": this.disabled,
      };
    },
  },
  methods: {
    clickHandler() {
      if (this.disabled) return;
      const fn = this.$parent.optionClick;
      fn && fn(this.value);
    },
  },
};
</script>
<style lang="less" scoped>
.aw-option {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  &-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background: none !important;
  }
  &-active {
    color: #f5f8fa;
    background: #01c5c480 !important;
  }
}
</style>