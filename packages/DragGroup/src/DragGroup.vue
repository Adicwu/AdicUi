<template>
  <div class="aw-drag-group" ref="$draggroup" @dragenter.prevent @dragover.prevent>
    <slot />
  </div>
</template>
<script>
import helper from "@src/mixins/helper";

export default {
  name: "AwDragGroup",
  mixins: [helper],
  props: {
    animate: {
      type: Boolean,
      default: false,
    },
    indicator: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      draging: {
        el: null,
      },
      name: Symbol(Math.random()),
      oldPostions: [],
      children: [],
    };
  },
  provide() {
    return {
      AwDragGroup: this,
    };
  },
  methods: {
    dragStart(key) {
      this.draging.el = key;
      this.children = this.getChilds();
      this.oldPostions = this.children.map((item) => {
        let { x, y } = item.getBoundingClientRect();
        return { x, y };
      });
    },
    dargHandler(key) {
      this.throttle(() => {
        if (key != this.draging.el) {
          this.domMover(this.$refs.$draggroup, this.draging.el, key);
        }
      }, 50);
    },
    getChilds() {
      return Array.from(this.$refs.$draggroup.children);
    },
    domMover(faDom, domA, domB) {
      let children = Array.from(faDom.children);
      let domAIndex = children.indexOf(domA);
      let domBIndex = children.indexOf(domB);
      if (domAIndex > domBIndex) {
        faDom.insertBefore(domA, domB);
      } else {
        faDom.insertBefore(domA, domB.nextSibling);
      }
      this.animate && this.anmHandler(this.oldPostions);
    },
    anmHandler(oldPostions) {
      oldPostions.forEach((item, index) => {
        const { x, y } = this.children[index].getBoundingClientRect();
        const [xDistanc, yDistance] = [item.x - x, item.y - y];
        let keyframes = [
          {
            transform: `translate3d(${xDistanc}px, ${yDistance}px,0)`,
          },
          {
            transform: "translate3d(0,0,0)",
          },
        ];
        this.anmCreator(this.children[index], keyframes);
      });
    },
    anmCreator(el, keyframes) {
      const options = {
        duration: 100,
      };
      el.animate(keyframes, options);
    },
  },
};
</script>