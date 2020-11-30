<template>
  <div
    class="aw-drag-item"
    :draggable="!disable"
    @dragstart.stop="dragstart"
    @dragenter.stop="debounce(dragenter, 30)"
    @dragend.stop="dragend"
  >
    <i class="aw-drag-item__drager" v-if="hasIndicator"> </i>
    <slot />
  </div>
</template>
<script>
import helper from "@src/mixins/helper";
export default {
  name: "AwDragItem",
  mixins: [helper],
  inject: ["AwDragGroup"],
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    name() {
      return this.AwDragGroup.name;
    },
    hasIndicator() {
      return this.AwDragGroup.indicator;
    },
  },
  methods: {
    dragstart() {
      if (this.disable) return;
      this.$el.style.opacity = "0.1";
      this.$el.style.outline = "2px solid #000";
      this.AwDragGroup.dragStart(this.$el);
    },
    dragenter(e) {
      if (this.disable) return;
      this.AwDragGroup.dargHandler(this.$el);
    },
    dragend() {
      if (this.disable) return;
      this.$el.style.outline = "none";
      this.$el.style.opacity = "1";
    },
  },
};
</script>
<style lang="less" scoped>
.drag-item {
  position: relative;
  &:hover {
    .aw-drag-item__drager {
      opacity: 1;
    }
  }
  &__drager {
    position: absolute;
    left: 5px;
    top: 5px;
    width: 10px;
    height: 10px;
    background: #def;
    cursor: all-scroll;
    opacity: 0;
    z-index: 99999;
  }
}
</style>