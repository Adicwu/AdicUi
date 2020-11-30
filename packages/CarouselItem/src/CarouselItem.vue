<template>
  <div
    class="aw-carousel__item"
    ref="$item"
    :class="{
      _card: isCard,
      _active_left: isActiveLeft,
      _active_right: isActiveRight,
    }"
    :style="itemStyle"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AwCarouselItem",
  inject: ["type", "AwCarousel"],
  data() {
    return {
      keys: 0,
    };
  },
  computed: {
    isCard() {
      return this.type === "card";
    },
    isActiveLeft() {
      return this.$parent.index == this.keys - 1 && this.isCard;
    },
    isActiveRight() {
      return this.$parent.index == this.keys + 1 && this.isCard;
    },
    itemStyle() {
      let { width } = this.AwCarousel;
      return {
        width: `${width}px`,
      };
    },
  },
  mounted() {
    let { $item } = this.$refs;
    let key = Array.from($item.parentNode.children).indexOf($item);
    this.keys = key;
  },
};
</script>

<style lang="less" scoped>
.aw-carousel__item {
  position: relative;
  display: inline-block;
  height: 100%;
  overflow: hidden;
  z-index: 2;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
._card {
  transform: scale(0.85) translateX(0);
}
._active_left {
  z-index: 1;
  transition: 0.3s;
  transform: scale(0.5) translateX(-60%);
}
._active_right {
  z-index: 1;
  transition: 0.3s;
  transform: scale(0.5) translateX(60%);
}
</style>
