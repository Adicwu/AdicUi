<template>
  <AwScrollbar id="app">
    <div class="colnum"></div>
  </AwScrollbar>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeNames1: ["0", "1"],
    };
  },
  mounted() {},
  methods: {
    handleChange(res) {
      console.log(res);
    },
  },
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

#app {
  width: 80%;
  height: 70vh;

  .colnum {
    width: 100%;
    height: 1600px;
    background: linear-gradient(to bottom, #ed143d, #0f9960);
  }
}
</style>
