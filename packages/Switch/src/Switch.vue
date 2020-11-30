<template>
  <div
    class="aw-switch"
    :class="switchClass"
    @click="clickHandler"
    ref="$switch"
  >
    <div
      class="aw-switch__circle"
      :class="{ 'aw-switch__circle-active': value }"
    >
      <div
        class="aw-switch__circle-inner"
        :class="{ 'aw-switch__circle-inner-active': value }"
        ref="$switchCircle"
      >
        <div class="aw-switch__circle-inner-loading" v-if="loading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715"
            style="transform: rotate(0deg)"
          >
            <circle
              fill="transparent"
              cx="45.714285714285715"
              cy="45.714285714285715"
              r="20"
              stroke-width="5.714285714285714"
              stroke-dasharray="125.664"
              stroke-dashoffset="125.66370614359172px"
              class="v-progress-circular__overlay"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AwSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: "#03c4a1",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(res) {
        this.$nextTick((e) => {
          this.styleHanlder(res);
        });
        this.$emit("change", res);
      },
    },
  },
  computed: {
    switchClass() {
      return {
        "aw-switch-active": this.value,
        "aw-switch-disabled": this.disabled,
      };
    },
  },
  methods: {
    clickHandler() {
      if (this.disabled || this.loading) return;
      this.$emit("input", !this.value);
    },
    styleHanlder(key) {
      let { $switch, $switchCircle } = this.$refs;
      let bgColor = key ? this.activeColor : "#eee";
      let circleColor = key ? this.activeColor : "#fff";
      $switch.style.background = bgColor;
      $switchCircle.style.background = circleColor;
    },
  },
};
</script>
<style lang="less" scoped>
.aw-switch {
  position: relative;
  width: 38px;
  height: 16px;
  background: #eee;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  &-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    .aw-switch__circle {
      background: none !important;
    }
  }
  &__circle {
    position: absolute;
    top: -15px;
    left: -16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    transition: all 0.3s;
    &-active {
      transform: translateX(26px);
    }
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    &-inner {
      position: relative;
      width: 24px;
      height: 24px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      transition: all 0.3s;
      overflow: hidden;
      &-loading {
        width: 100%;
        height: 100%;
        color: crimson !important;
        caret-color: crimson !important;
        background: #fff;
        & > svg {
          animation: progress-circular-rotate 1.4s linear infinite;
          transform-origin: center center;
          transition: all 0.2s ease-in-out;
          width: 80%;
          height: 80%;
          margin: auto;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 0;
          circle {
            stroke: currentColor;
            z-index: 2;
            transition: all 0.6s ease-in-out;
            animation: progress-circular-dash 1.4s ease-in-out infinite;
            stroke-linecap: round;
            stroke-dasharray: 80, 200;
            stroke-dashoffset: 0px;
          }
        }
        @keyframes progress-circular-rotate {
          100% {
            transform: rotate(1turn);
          }
        }
        @keyframes progress-circular-dash {
          0% {
            stroke-dasharray: 1px, 200px;
            stroke-dashoffset: 0px;
          }
          50% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -15px;
          }
          100% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -125px;
          }
        }
      }
    }
  }
}
</style>