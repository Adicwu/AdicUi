<template>
  <div class="aw-checkbox" :class="checkboxClass" @click="clickHandler">
    <div
      class="aw-checkbox__control"
      :class="{ 'aw-checkbox__control-active': isActive }"
    ></div>
    <label for="">{{ label }}</label>
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
  name: "AwCheckbox",
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
        "aw-checkbox-disabled": this.isDisabled,
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
.aw-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 6px;
  &-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    .aw-checkbox__control:hover {
      background: none !important;
    }
    label {
      cursor: not-allowed !important;
    }
  }
  &__control {
    position: relative;
    border-radius: 50%;
    height: 34px;
    transition: inherit;
    width: 34px;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    &::before {
      content: "";
      position: absolute;
      left: 20%;
      top: 20%;
      width: 60%;
      height: 60%;
      box-sizing: border-box;
      border-style: solid;
      border-width: 2px;
      border-color: #777;
      border-radius: 4px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 35%;
      top: 35%;
      width: 30%;
      height: 30%;
      border-radius: 50%;
    }
    &-active {
      &::before {
        border-color: #1867c0;
      }
      &::after {
        background: #1867c0;
      }
    }
  }
  label {
    color: #777;
    font-size: 16px;
    line-height: 14px;
    cursor: pointer;
  }
  input[type="checkbox"] {
    display: none;
  }
}
</style>