<template>
  <div class="aw-radio" :class="radioClass" @click="clickHandler">
    <div
      class="aw-radio__control"
      :class="{ 'aw-radio__control-active': isActive }"
    ></div>
    <label for="">{{ label }}</label>
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
  name: "AwRadio",
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
        "aw-radio-disabled": this.isDisabled,
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
.aw-radio {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    .aw-radio__control:hover {
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
      border-radius: 50%;
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
  input[type="radio"] {
    display: none;
  }
}
</style>