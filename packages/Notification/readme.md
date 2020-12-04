### Notification  Options

| 参数      | 说明                                  | 类型     | 可选值                     | 默认值 |
| --------- | ------------------------------------- | -------- | -------------------------- | ------ |
| title     | 标题                                  | string   | —                          | —      |
| msg       | 说明文字                              | string   | —                          | label  |
| type      | 主题样式，如果不在可选值内将被忽略    | string   | success/warning/info/error | false  |
| duration  | 显示时间, 毫秒。设为 0 则不会自动关闭 | number   | —                          | 4500   |
| showClose | 是否显示关闭按钮                      | boolean  | —                          | true   |
| onClose   | 关闭时的回调函数                      | function | —                          | —      |
| onClick   | 点击 Notification 时的回调函数        | function | —                          | —      |

###  方法

调用 `Notification` 或 `this.$notify` 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。

| 方法名 | 说明                    |
| ------ | ----------------------- |
| close  | 关闭当前的 Notification |

