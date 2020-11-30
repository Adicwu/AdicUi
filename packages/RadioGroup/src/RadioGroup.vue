<template>
  <div class="aw-radio-group" :class="radioGroupClass">
    <slot />
  </div>
</template>
<script>
export default {
  name: "AwRadioGroup",
  props: {
    value: [String, Number],
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
      AwRadioGroup: this,
    };
  },
  data() {
    return {
      name: Math.random(),
      radios: [],
    };
  },
  computed: {
    radioGroupClass() {
      return {
        "aw-radio-group-column": this.column,
      };
    },
  },
  methods: {
    radiosChangeHanlder() {
      let res = this.getRadiosValue();
      this.$emit("input", res);
      this.$emit("change", res);
    },
    getRadiosValue() {
      const children = this.$children;
      let res = "";
      children.forEach((item, index) => {
        if (item.radio.checked) res = item.radio;
      });
      return res.value;
    },
  },
};
</script>
<style lang="less" scoped>
.aw-radio-group {
  display: flex;
  &-column {
    flex-direction: column;
  }
}
</style>