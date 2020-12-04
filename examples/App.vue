<template>
  <div id="app">
    <AwButton @click="handleChange">emmm</AwButton>
    <AwButton @click="close">close</AwButton>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      obj: null,
    };
  },
  mounted() {},
  methods: {
    handleChange(res) {
      this.obj = this.$notify.success({
        title: "这是一个不同",
        msg: "啦啦啦啦",
        type: "warning",
        showClose: false,
        onClick: () => {
          console.log("1");
        },
        onClose: () => {
          console.log("close");
        },
      });
    },
    close(res) {
      this.obj.close();
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
  button{
    margin: 10px;
  }
}
</style>
