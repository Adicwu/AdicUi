<template>
  <button
    class="aw-button"
    :class="btnClass"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="listeners"
    ref="$btn"
  >
    <span class="aw-button__content" v-show="!loading"
      ><slot v-if="!circle" /><i :class="icon" v-if="icon"
    /></span>
    <span class="aw-button__load" v-show="loading">
      <slot name="loader" />
    </span>
  </button>
</template>
<script>
import helper from "@src/mixins/helper";
export default {
  name: "AwButton",
  mixins: [helper],
  props: {
    type: {
      type: String,
      default: "brand",
    },
    round: {
      type: Boolean,
      default: false,
    },
    debounceDel: {
      type: [String, Number],
      default: 0,
    },
    throttleDel: {
      type: [String, Number],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isActive: false,
      isAllowedClick: true,
    };
  },
  computed: {
    btnClass() {
      return {
        [`aw-button-${this.type}`]: true,
        "aw-button-active": this.isActive,
        "aw-button-round": this.round,
        "aw-button-disabled": this.disabled,
        "aw-button-loading": this.loading,
        "aw-button-circle": this.circle,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        click: this.clickHandler,
      };
    },
    debounceOrThrottle() {
      //0 none; 1 debounce; 2 throttle;
      let { debounceDel, throttleDel } = this;
      if (debounceDel === 0 && throttleDel === 0) {
        return 0;
      } else {
        if (debounceDel != 0) return 1;
        if (throttleDel != 0) return 2;
      }
    },
  },
  mounted() {
    let { $btn } = this.$refs;
    $btn.addEventListener("click", this.clickAnm);
  },
  beforeDestroy() {
    let { $btn } = this.$refs;
    $btn.removeEventListener("click", this.clickAnm);
  },
  methods: {
    clickAnm() {
      this.isActive = true;
      setTimeout(() => {
        this.isActive = false;
      }, 500);
    },
    clickHandler() {
      let key = this.debounceOrThrottle;
      const fn = this.$listeners.click;
      if(!fn) return;
      if (key === 0) {
        fn();
      } else if (key === 1) {
        this.debounce(fn, this.debounceDel);
      } else if (key === 2) {
        this.throttle(fn, this.throttleDel);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@theme/common/color.less";
.aw-button {
  position: relative;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  &:hover {
    opacity: 0.9;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) scale(1);
    display: block;
    height: 100%;
    padding: 0 25%;
    background: #fff;
    border-radius: 50%;
    opacity: 0;
  }
  &__content {
    line-height: 14px;
    font-size: 14px;
  }
  &-round {
    border-radius: 40px;
  }
  &-circle {
    border-radius: 50%;
    width: 46px;
    height: 46px;
    padding: 0;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }
  &-active {
    &::before {
      animation: scale 0.3s;
    }
  }
  &-disabled {
    opacity: 0.4 !important;
    cursor: not-allowed;
  }
  &-loading {
    cursor: not-allowed;
    background: #777 !important;
  }
  @keyframes scale {
    0% {
      transform: translateX(-50%) scale(1);
      opacity: 0;
    }
    50% {
      transform: translateX(-50%) scale(2);
      opacity: 0.3;
    }
    100% {
      transform: translateX(-50%) scale(2);
      opacity: 0;
    }
  }
  &-brand {
    .bg-brand;
  }
  &-success {
    .bg-success;
  }
  &-warning {
    .bg-warning;
  }
  &-danger {
    .bg-danger;
  }
  &-info {
    .bg-info;
  }
}
</style>