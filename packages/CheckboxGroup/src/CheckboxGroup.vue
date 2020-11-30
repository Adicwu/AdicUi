<template>
  <div class="aw-checkbox-group" :class="checkboxGroupClass">
    <slot />
  </div>
</template>
<script>
export default {
  name: "AwCheckboxGroup",
  props: {
    value: {
      type: [Array, String, Number],
      default: () => [],
    },
    column: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      AwCheckboxGroup: this,
    };
  },
  data() {
    return {
      name: Math.random(),
      checkboxs: [],
    };
  },
  computed: {
    checkboxGroupClass() {
      return {
        "aw-checkbox-group-column": this.column,
      };
    },
  },
  methods: {
    checkboxsChangeHanlder() {
      let res = this.getcheckboxsValue();
      this.$emit("input", res);
      this.$emit("change", res);
    },
    getcheckboxsValue() {
      const children = this.$children;
      let res = [];
      children.forEach((item, index) => {
        if (item.checkbox.checked) res.push(item.checkbox.value);
      });
      return res;
    },
  },
};
</script>
<style lang="less" scoped>
.aw-checkbox-group {
  display: flex;
  &-column {
    flex-direction: column;
  }
}
</style>