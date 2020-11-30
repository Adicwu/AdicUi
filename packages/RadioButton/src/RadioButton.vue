<template>
  <div class="aw-radio-button" :class="radioClass" @click="clickHandler">
    {{ label }}
    <input
      type="radio"
      :value="value"
      :name="radioName"
      :disabled="disabled"
      ref="$radio"
      @change="changeHanlder"
    />
  </div>
</template>
<script>
export default {
  name: "AwRadioButton",
  props: {
    value: [String, Number],
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: ["AwRadioGroup"],
  data() {
    return {
      radio: null,
    };
  },
  computed: {
    radioName() {
      return this.AwRadioGroup.name.toString();
    },
    isDisabled() {
      return this.disabled || this.AwRadioGroup.disabled;
    },
    isActive() {
      return this.AwRadioGroup.value === this.value;
    },
    radioClass() {
      return {
        "aw-radio-button-disabled": this.isDisabled,
        "aw-radio-button-active": this.isActive,
      };
    },
  },
  mounted() {
    this.radio = this.$refs.$radio;
  },
  methods: {
    changeHanlder(e) {
      if (this.isActive) return;
      this.AwRadioGroup.radiosChangeHanlder();
    },
    clickHandler(e) {
      if (this.isDisabled) return;
      this.$refs.$radio.click();
    },
  },
};
</script>
<style lang="less" scoped>
.aw-radio-button {
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
  input[type="radio"] {
    display: none;
  }
}
</style>