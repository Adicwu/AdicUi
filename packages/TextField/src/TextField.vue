<template>
  <div class="aw-text-field" :class="{ _disabled: disabled }">
    <label :class="{ '_active-label': labelActive }" for>{{ label }}</label>
    <input
      :type="type"
      :value="value"
      @input="breakData"
      @focus="onFocus"
      @blur="onblur"
      @keyup.enter="onChange"
      v-bind="$attrs"
      v-on="listeners"
      :disabled="disabled"
      :readonly="lock"
      :class="{ _active: isFocus || hasValue }"
      ref="$input"
    />
  </div>
</template>

<script>
import helper from "@src/mixins/helper";
export default {
  name: "AwTextField",
  mixins: [helper],
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "label",
    },
    value: {
      type: String | Number,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    lock: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    hasValue() {
      return this.value != "";
    },
    labelActive() {
      if (this.lock) {
        return this.hasValue || this.isFocus;
      } else {
        return this.hasValue;
      }
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.breakData,
        change: this.onChange,
      };
    },
  },
  methods: {
    breakData(e) {
      this.$emit("input", e.target.value);
    },
    onblur(e) {
      this.isFocus = false;
      this.$emit("blur", e);
      // !this.lock && this.onChange(e);
    },
    onChange(e) {
      this.debounce(() => {
        this.$emit("change", e.target.value);
      });
    },
    onFocus(e) {
      this.isFocus = true;
      this.$emit("focus", e);
    },
    focus() {
      let { $input } = this.$refs;
      $input.focus();
    },
    blur() {
      let { $input } = this.$refs;
      $input.blur();
    },
    select() {
      let { $input } = this.$refs;
      $input.select();
    },
  },
};
</script>
<style lang="less" scoped>
.aw-text-field {
  position: relative;
  display: flex;
  color: rgba(0, 0, 0, 0.87);
  max-height: 32px;
  width: 180px;
  padding-top: 20px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #137cbd;
    transform: scaleX(0);
    transition: all 0.3s;
  }
  &._disabled {
    user-select: none;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: calc(100% - 20px);
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
      z-index: 333;
      opacity: 0.6;
    }
  }
  &:focus-within {
    & > label {
      ._active-label;
    }
    &::before {
      transform: scaleX(1);
    }
  }
  ._active-label {
    color: #137cbd;
    transform: translate(-10%, 0) scale(0.8);
  }
  & > label {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s;
    transform: translate(0, 120%) scale(1);
    z-index: 1;
  }
  & > input {
    position: relative;
    width: 100%;
    outline: none;
    border: none;
    padding: 8px 0;
    border-bottom: 1px solid #777;
    text-indent: 4px;
    z-index: 2;
    background: none;
    color: rgba(0, 0, 0, 0);
    &._active {
      color: #717171;
    }
  }
}
</style>