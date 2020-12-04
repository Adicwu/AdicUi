<template>
  <transition name="notification-fade">
    <div class="aw-notify" v-show="visible" @click="clickSelf">
      <div class="aw-notify-close" @click.stop="close" v-if="showClose"></div>
      <div class="aw-notify-left" :class="typeClass" v-if="type"></div>
      <div class="aw-notify-right">
        <div class="aw-notify_title">{{ title }}</div>
        <div class="aw-notify_content">{{ msg }}</div>
      </div>
    </div>
  </transition>
</template>
<script>
import { debounce } from "@src/utils/util";
export default {
  name: "Notification",
  data() {
    return {
      visible: false,
      title: "",
      message: "",
      duration: 4500,
      type: "",
      timer: null,
      onClose: null,
      onClick: null,
      closeHandler: null,
      showClose: true,
    };
  },
  computed: {
    typeClass() {
      let className = "";
      switch (this.type) {
        case "success":
          className = "bg-success";
          break;
        case "warning":
          className = "bg-warning";
          break;
        case "info":
          className = "bg-info";
          break;
        case "error":
          className = "bg-error";
          break;
        default:
          "";
      }
      return className;
    },
  },
  mounted() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  },
  methods: {
    destroyElement() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.visible = false;
      this.$el.ontransitionend = debounce(() => {
        this.destroyElement();
        this.closeHandler();
        if (typeof this.onClose === "function") {
          this.onClose();
        }
      }, 30);
    },
    clickSelf() {
      if (typeof this.onClick === "function") {
        this.onClick();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.aw-notify {
  position: fixed;
  right: 16px;
  top: 0;
  margin-top: 16px;
  z-index: 9999;
  width: 330px;
  padding: 16px;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  &-left {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 16px;
  }
  &-right {
    flex: 1;
    overflow: hidden;
  }
  &_title {
    font-size: 16px;
    font-weight: 600;
  }
  &_content {
    font-size: 14px;
    color: #999;
    margin-top: 5px;
  }
  &-close {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 8px;
    right: 8px;
    background: #000;
    cursor: pointer;
  }
}
.notification-fade-enter {
  transform: translateX(100%);
}
.notification-fade-leave-active {
  opacity: 0;
}
</style>