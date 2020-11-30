<template>
  <div class="aw-collapse">
    <slot />
  </div>
</template>
<script>
export default {
  name: "AwCollapse",
  props: {
    value: {
      type: [Array, String, Number],
      default() {
        return [];
      },
    },
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeNames: [].concat(this.value),
    };
  },
  provide() {
    return {
      collapse: this,
    };
  },
  watch: {
    value(value) {
      this.activeNames = [].concat(value);
    },
    activeNames(res) {
      if (this.accordion) res = res[0];
      this.$emit("change", res);
    },
  },
  methods: {
    activeNamesAdd(name) {
      let key = this.activeNames.indexOf(name);
      if (this.accordion) {
        this.activeNames.splice(0);
        if (key === -1) {
          this.activeNames.push(name);
        }
      } else {
        if (key === -1) {
          this.activeNames.push(name);
        } else {
          this.activeNames.splice(key, 1);
        }
      }
      this.breakData();
    },
    breakData() {
      let res = this.activeNames;
      if (this.accordion) res = res[0] || "";
      this.$emit("input", res);
    },
  },
};
</script>
<style lang="less" scoped>
.aw-collapse {
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  width: 100%;
  z-index: 1;
  flex: 0 1 auto;
  position: relative;
  max-width: 100%;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>