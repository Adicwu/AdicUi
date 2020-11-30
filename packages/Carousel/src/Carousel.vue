<template>
  <div
    class="aw-carousel"
    ref="carousel"
    :class="carouselClass"
    :style="{ height: height }"
    @mouseenter="clearMove"
    @mouseleave="autoMove"
    @touchstart.stop="touchStart"
    @touchend.stop="touchEnd"
  >
    <div
      class="_contain"
      ref="contain"
      :class="{ 'is-animating': isTransition }"
      :style="{ transform: `translate3d(${moveX}px,0,0)` }"
    >
      <slot></slot>
    </div>
    <span class="_arrow _arrow-left" @click="debounce(prevItem)"
      ><i class="fa fa-angle-left"></i
    ></span>
    <span class="_arrow _arrow-right" @click="debounce(nextItem)"
      ><i class="fa fa-angle-right"></i
    ></span>
    <ul class="_indicators">
      <li
        v-for="item in items.length"
        :class="{ '_indicators-active': index == item - 1 }"
        :key="item"
        @mouseenter="indicatorsHandler('hover', item)"
        @click="indicatorsHandler('click', item)"
      ></li>
    </ul>
  </div>
</template>

<script>
import helper from "@src/mixins/helper";
export default {
  name: "AwCarousel",
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
    height: {
      type: String,
      default: "100px",
    },
    type: {
      type: String,
      default: "default",
    },
    trigger: {
      type: String,
      default: "hover",
    },
    indicatorPosition: {
      type: String,
      default: "inside",
    },
  },
  mixins: [helper],
  provide() {
    return {
      type: this.type,
      AwCarousel: this,
    };
  },
  data() {
    return {
      index: 0,
      timer: null,
      width: 0,
      items: {
        childList: null,
        length: 0,
      },
      touch: {
        startX: 0,
      },
      isTransition: true,
    };
  },
  activated() {
    this.autoMove();
  },
  deactivated() {
    this.clearMove();
  },
  computed: {
    moveX() {
      return this.items.childList
        ? -(this.index * this.items.childList[0].clientWidth)
        : 0;
    },
    carouselClass() {
      return {
        "aw-carousel-outside": this.indicatorPosition === "outside",
      };
    },
  },
  watch: {
    autoplay: {
      immediate: true,
      handler(val) {
        val ? this.autoMove() : this.clearMove();
      },
    },
    index(newVal, oldVal) {
      let rel = 0;
      if (this.index == this.items.length) {
        rel = this.index - 1;
      } else if (this.index < 0) {
        rel = this.items.length - 1;
      } else {
        rel = this.index;
      }
      this.$emit("change", rel, oldVal);
    },
  },
  mounted() {
    this.$nextTick(this.init);
    window.addEventListener("resize", this.nextItem);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.nextItem);
  },
  methods: {
    init() {
      let dom = this.$refs.contain;
      this.width = this.$refs.carousel.clientWidth;
      this.items.childList = dom.childNodes;
      this.items.length = dom.childNodes.length;
    },
    autoMove() {
      this.clearMove();
      this.autoplay &&
        (this.timer = setInterval(() => this.nextItem(), this.interval));
    },
    clearMove() {
      this.timer && clearInterval(this.timer);
    },
    nextItem() {
      if (this.index + 1 >= this.items.length) {
        let dom = this.items.childList[0];
        dom.style.left = `${Math.abs(this.moveX) + dom.clientWidth}px`;
        this.index++;
        this.blindFold(dom, 0);
      } else {
        this.index++;
      }
    },
    prevItem() {
      if (this.index <= 0) {
        let len = this.items.length;
        let dom = this.items.childList[len - 1];
        dom.style.left = `-${len * dom.clientWidth}px`;
        this.index--;
        this.blindFold(dom, len - 1);
      } else {
        this.index--;
      }
    },
    blindFold(dom, index) {
      setTimeout(() => {
        this.isTransition = false;
        dom.style.left = 0;
        this.index = index;
        setTimeout(() => (this.isTransition = true), 60);
      }, 400);
    },
    touchStart(event) {
      this.touch.startX = event.targetTouches[0].pageX;
      this.clearMove();
    },
    touchEnd(event) {
      let endX = event.changedTouches[0].pageX;
      endX - this.touch.startX > 100 && endX && this.prevItem();
      this.touch.startX - endX > 100 && endX && this.nextItem();
      this.autoMove();
    },
    setActiveItem(key) {
      if (key < 0 || (key > this.items.length - 1 && this.index != key)) return;
      this.index = key;
    },
    next() {
      return this.nextItem();
    },
    prev() {
      return this.prevItem();
    },
    indicatorsHandler(key, index) {
      if (key === this.trigger) {
        this.setActiveItem(index - 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.aw-carousel {
  position: relative;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  &-outside {
    padding-bottom: 40px;
  }
  ._contain {
    position: relative;
    display: inline-block;
    width: auto;
    height: 100%;
    &.is-animating {
      transition: transform 0.4s ease-in-out;
    }
  }
  ._arrow {
    position: absolute;
    top: 50%;
    bottom: 50%;
    margin: auto 0;
    height: 36px;
    width: 36px;
    transition: 0.3s;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, 0.3);
    color: #fff;
    z-index: 10;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i {
      font-size: 1rem;
    }
  }
  ._arrow-left {
    left: 8px;
    transform: translateX(0);
  }
  ._arrow-right {
    right: 8px;
    transform: translateX(0);
  }
  ._indicators {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
    margin: 0 auto;
    display: table;
    list-style: none;
    & > li {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #ebedf0;
      border-radius: 100%;
      opacity: 0.8;
      margin: 0 4px;
      transition: all 0.3s;
      cursor: pointer;
      &._indicators-active {
        width: 14px;
        background-color: crimson;
        border-radius: 4px;
      }
    }
  }
  &:hover ._arrow {
    opacity: 1;
  }
  &:hover ._arrow-left {
    transform: translateX(8px);
  }
  &:hover ._arrow-right {
    transform: translateX(-8px);
  }
}
</style>
