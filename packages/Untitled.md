```xml
<template>
  <AwSwitch v-model="val3" :loading="isRequesting" />
</template>
<script>
export default {
  data() {
    return {
      val: false,
      isRequesting: false,
    };
  },
  watch: {
    val(bool) {
      bool && this.request();
    },
  },
  methods: {
    request(res) {
      this.isRequesting = true;
      setTimeout(() => {
        this.isRequesting = false;
      }, 2000);
    },
  },
};
</script>
```

