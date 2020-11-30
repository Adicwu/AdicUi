<template lang="">
    <div class="aw-waterfall-column" ref="$col">
        <slot  name="contain" :curData="curData"/>
    </div>
</template>
<script>
export default {
  name: "AwWaterfallColumn",
  inject: ["Waterfall"],
  data() {
    return {
      name: 0,
    };
  },
  mounted() {
    let els = Array.from(this.$parent.$el.children);
    this.name = els.indexOf(this.$refs.$col);
  },
  computed: {
    curData() {
      return this.Waterfall.datas[this.name];
    },
  },
};
</script>
<style lang="less" scoped>
.aw-waterfall-column {
  flex: 1;
  height: auto;
  overflow: hidden;
}
</style>