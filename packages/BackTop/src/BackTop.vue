<template>
  <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
    <div
      class="aw-back-top"
      :style="backTopStyle"
      v-show="visible"
      @click.stop="backTop"
    >
      <slot />
    </div>
  </transition>
</template>
<script>
import helper from "@src/mixins/helper";
export default {
  name: "AwBackTop",
  mixins: [helper],
  props: {
    right: {
      type: [String, Number],
      default: 40,
    },
    bottom: {
      type: [String, Number],
      default: 40,
    },
    target: {
      type: String,
      default: "",
    },
    visibilityHeight: {
      type: [String, Number],
      default: 200,
    },
  },
  computed: {
    backTopStyle() {
      let { right, bottom } = this;
      return {
        right: `${right}px`,
        bottom: `${bottom}px`,
      };
    },
  },
  data() {
    return {
      el: null,
      visible: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.target === "") throw new Error("backtop must have target");
      this.el = document.querySelector(this.target);
      this.$nextTick(this.addEvents);
    },
    addEvents() {
      this.el.addEventListener("scroll", this.scrollHandler);
    },
    removeEvents() {
      this.el.removeEventListener("scroll", this.scrollHandler);
    },
    scrollHandler(e) {
      this.throttle(() => {
        const { scrollTop } = e.target;
        this.visible = scrollTop >= this.visibilityHeight;
      }, 300);
    },
    backTop(e) {
      this.$emit("click", e);
      this.el.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.aw-back-top {
  position: fixed;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  background: #fff;
  z-index: 9999;
  cursor: pointer;
  animation-duration: 0.3s;
}
</style>