<template>
  <div class="aw-slider" :class="sliderClass" ref="$slider">
    <div class="aw-slider__inner" ref="$inner"></div>
    <div class="aw-slider__cur" :style="curStyle" ref="$cur"></div>
    <div
      class="aw-slider__thumb"
      ref="$thumb"
      @mousedown.stop="startMove"
      @mousemove.stop="ingMove"
      @mouseup.stop="endMove"
      @mouseleave="endMove"
      :style="thumbStyle"
    >
      <div class="aw-slider__thumb-label" ref="$thumblabel" v-if="label">
        <div>{{ value }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import helper from "@src/mixins/helper";

export default {
  name: "AwSlider",
  mixins: [helper],
  props: {
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "#ed143d",
    },
    label: {
      type: Boolean,
      default: false,
    },
    step: {
      type: [Number, String],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      offset: {
        x: 0,
        y: 0,
      },
      start: {
        x: 0,
        y: 0,
      },
      move: {
        x: 0,
        y: 0,
      },
      slider: {
        wdith: 0,
      },
      x: {
        min: 0,
        max: 0,
      },
      val: 0,
      isMove: false,
    };
  },
  computed: {
    useful() {
      return !this.disabled && !this.readonly;
    },
    sliderClass() {
      let { disabled } = this;
      return {
        "aw-slider-disabled": disabled,
      };
    },
    curStyle() {
      let { x, y } = this.move;
      return {
        width: `${x}px`,
      };
    },
    thumbStyle() {
      let { x, y } = this.move;
      return {
        transform: `translate(${x}px,0px)`,
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let { $slider, $inner, $cur, $thumb, $thumblabel } = this.$refs;
      this.slider.wdith = $slider.clientWidth;
      this.x.max = this.slider.wdith - 12;
      this.move.x = this.offset.x = (this.value / 100) * this.x.max;
      [$inner, $cur, $thumb, $thumblabel].forEach((item) => {
        item && (item.style.background = this.color);
      });
    },
    startMove(e) {
      if (!this.useful) return;
      this.isMove = true;
      let { clientX, clientY } = e;
      this.start.x = clientX;
      this.start.y = clientY;
    },
    ingMove(e) {
      if (!this.isMove || !this.useful) return;
      let { clientX, clientY } = e;
      if (this.step !== 0) {
        if (clientX > this.start.x) {
          this.stepDataBreak("+");
        } else {
          this.stepDataBreak("-");
        }
      } else {
        let { min: xMin, max: xMax } = this.x;
        let x = clientX - this.start.x + this.offset.x;
        this.move.x = this.dataLimiter(x, xMin, xMax);
        this.dataBreak();
      }
    },
    endMove(e) {
      if (!this.useful) return;
      this.isMove = false;
      this.offset.x = this.move.x;
      this.offset.y = this.move.y;
      this.$emit("change", this.val);
    },
    dataLimiter(num, min, max) {
      return Math.max(min, Math.min(num, max));
    },
    dataBreak() {
      let { x, y } = this.move;
      let { max: wdith } = this.x;
      let res = parseInt((x / wdith) * 100);
      this.val = res;
      this.$emit("input", res);
    },
    stepDataBreak(key) {
      this.throttle(() => {
        let step = Number(this.step);
        let res = this.value;
        if (key === "+") {
          res += step;
        } else if (key === "-") {
          res -= step;
        }
        if (res > 100) res = 100;
        if (res < 0) res = 0;
        this.move.x = (res / 100) * this.x.max;
        this.val = res;
        this.$emit("input", res);
      }, 100);
    },
  },
};
</script>
<style lang="less" scoped>
.aw-slider {
  position: relative;
  width: 480px;
  padding: 16px 0;
  &-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  &__inner {
    width: 100%;
    height: 4px;
    opacity: 0.3;
  }
  &__cur {
    position: absolute;
    top: 16px;
    width: 0;
    height: 4px;
  }
  &__thumb {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
    user-select: none;
    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      display: block;
      width: 100%;
      height: 100%;
      transition: 0.3s;
      border-radius: 50%;
    }
    &:hover::before {
      transform: scale(2.6);
      background: rgba(0, 0, 0, 0.1);
    }
    &:active::before {
      cursor: grabbing;
      transform: scale(3.6);
      background: rgba(0, 0, 0, 0.3);
    }
    &:hover {
      .aw-slider__thumb-label {
        opacity: 1;
      }
    }
    &-label {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      color: #fff;
      height: 32px;
      width: 32px;
      transform: translateY(-20%) translateY(-36px) translateX(-32%)
        rotate(45deg);
      border-radius: 50% 50% 0;
      opacity: 0;
      transition: all 0.3s;
      z-index: 333;
      div {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>