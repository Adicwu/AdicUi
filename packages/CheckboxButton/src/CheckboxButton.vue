<template>
  <div class="aw-checkbox-button" :class="checkboxClass" @click="clickHandler">
    {{ label }}
    <input
      type="checkbox"
      :value="value"
      :name="checkboxName"
      :disabled="disabled"
      ref="$checkbox"
      @change="changeHanlder"
    />
  </div>
</template>
<script>
export default {
  name: "AwCheckboxButton",
  props: {
    value: [String, Number],
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: ["AwCheckboxGroup"],
  data() {
    return {
      checkbox: null,
    };
  },
  computed: {
    checkboxName() {
      return this.AwCheckboxGroup.name.toString();
    },
    isDisabled() {
      return this.disabled || this.AwCheckboxGroup.disabled;
    },
    isActive() {
      return this.AwCheckboxGroup.value.indexOf(this.value) != -1;
    },
    groupValue() {
      return this.AwCheckboxGroup.value;
    },
    checkboxClass() {
      return {
        "aw-checkbox-button-disabled": this.isDisabled,
        "aw-checkbox-button-active": this.isActive,
      };
    },
  },
  mounted() {
    this.checkbox = this.$refs.$checkbox;
    this.init();
  },
  methods: {
    init() {
      let key = this.groupValue.indexOf(this.value);
      if (key != -1) {
        this.checkbox.checked = true;
      }
    },
    changeHanlder(e) {
      this.AwCheckboxGroup.checkboxsChangeHanlder();
    },
    clickHandler(e) {
      if (this.isDisabled) return;
      this.$refs.$checkbox.click();
    },
  },
};
</script>
<style lang="less" scoped>
.aw-checkbox-button {
  display: flex;
  padding: 12px 20px;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  font-size: 16px;
  line-height: 14px;
  overflow: hidden;
  &:hover {
    color: #19d3da;
  }
  &-active {
    background: #19d3da;
    color: #fff !important;
    border-color: #19d3da;
  }
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-left: 1px solid #eee;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-right: 1px solid #eee;
  }
  &-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    &:hover {
      color: #000;
    }
  }
  input[type="checkbox"] {
    display: none;
  }
}
</style>