<template>
  <div
    class="aw-select"
    :class="{ 'aw-select-disabled': disabled }"
    v-clickoutside="closeHandler"
  >
    <div class="aw-select__content">
      <AwTextField
        class="aw-select__content-input"
        lock
        v-model="inputVal"
        v-bind="$attrs"
        ref="$input"
        @click.native="clickHandler"
      />
      <i>x</i>
    </div>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="aw-select__options" v-show="options.visible" ref="$options">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
import AwTextField from "@packages/TextField/src/TextField";
import Clickoutside from "@src/utils/clickoutside";
export default {
  name: "AwSelect",
  components: { AwTextField },
  directives: { Clickoutside },
  props: {
    value: [String, Boolean, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputVal: "",
      options: {
        visible: false,
      },
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(res) {
        this.inputVal = res;
        res && this.$emit("change", res);
      },
    },
  },
  methods: {
    clickHandler() {
      console.log('do');
      if (this.disabled) return;
      let { $input } = this.$refs;
      this.options.visible = true;
      this.optionScroller();
      $input.onFocus();
    },
    closeHandler() {
      if (this.disabled) return;
      let { $input } = this.$refs;
      this.options.visible = false;
      $input.onblur();
    },
    optionClick(val) {
      if (this.disabled) return;
      this.$emit("input", val);
      this.options.visible = false;
    },
    optionScroller() {
      let { value } = this;
      if (value === "") return;
      let dom = null;
      for (const { componentInstance } of this.$slots.default) {
        if (componentInstance.isActive) {
          dom = componentInstance.$el;
          break;
        }
      }
      if (dom) {
        let { $options } = this.$refs;
        setTimeout(() => {
          $options.scrollTop = dom.offsetTop - $options.clientHeight / 2;
        }, 50);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.aw-select {
  position: relative;
  cursor: pointer;
  width: 350px;
  &-disabled {
    cursor: not-allowed !important;
    opacity: 0.6;
    /deep/ input {
      cursor: not-allowed !important;
    }
  }
  &__content {
    position: relative;
    i {
      position: absolute;
      right: 10px;
      bottom: 6px;
      color: #137cbd;
    }
    &-input {
      width: 100%;
      z-index: 111;
      /deep/ input {
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  &__options {
    position: absolute;
    top: 24px;
    background: #fff;
    border-radius: 6px;
    width: 100%;
    padding: 8px 0;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    z-index: 112;
    animation-duration: 0.2s;
  }
}
</style>