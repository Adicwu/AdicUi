<template>
  <div class="aw-waterfall" @scroll="scrollHanlder">
    <slot />
  </div>
</template>
<script>
import helper from "@src/mixins/helper";
import { arrayAverag, arrayCount } from "@src/utils/data";
export default {
  name: "AwWaterfall",
  mixins: [helper],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    initColCount: {
      type: [Number, String],
      default: 5,
    },
    preAdd: {
      type: [Number, String],
      default: 2,
    },
    fromBottom: {
      type: Number,
      default: 60,
    },
    column: {
      type: [Number, String],
      default: 2,
    },
  },
  provide() {
    return {
      Waterfall: this,
    };
  },
  data() {
    return {
      datas: [],
      curTapges: [],
      hasMore: true,
      isRequesting: false,
    };
  },
  computed: {
    curLenCount() {
      let lens = this.datas.map((item) => item.length);
      return arrayCount(lens);
    },
  },
  created() {
    this.dataInit();
  },
  methods: {
    dataInit() {
      const column = Number(this.column);
      const initList = this.list.slice(0, this.initColCount * column);
      let arrs = Array(column);
      this.datas = arrayAverag(initList, column);
      this.curTapges = arrs.fill(1);
    },
    scrollHanlder(e) {
      if (!this.hasMore) return;
      let { scrollHeight, clientHeight, scrollTop } = e.target;
      if (scrollHeight - clientHeight - scrollTop <= this.fromBottom) {
        this.loadMore();
        this.$emit("loadMore", e);
      }
    },
    getMinColumn() {
      let columns = this.$children,
        columnsHei = columns.map((item) => item.$el.clientHeight);
      let minIndex = columnsHei.indexOf(Math.min(...columnsHei));
      this.curDataPush(minIndex);
    },
    loadMore() {
      let minCol = this.getMinColumn();
      this.dataMod(minCol);
    },
    curDataPush(key) {
      let startIndex = this.curLenCount;
      let data = this.list.slice(startIndex, startIndex + Number(this.preAdd));
      if (data.length === 0) return (this.hasMore = false);
      this.datas[key].push(...data);
      this.curTapges[key]++;
    },
    dataMod() {},
    requestMod() {},
  },
};
</script>
<style lang="less" scoped>
.aw-waterfall {
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow-y: auto;
}
</style>