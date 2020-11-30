### Carousel Attributes

| 参数               | 说明                   | 类型    | 可选值       | 默认值  |
| ------------------ | ---------------------- | ------- | ------------ | ------- |
| height             | 轮播的高度             | string  | ——           | 100px   |
| autoplay           | 是否自动切换           | boolean | ——           | true    |
| interval           | 自动切换间隔，单位毫秒 | number  | ——           | 3000    |
| type               | 轮播类型               | string  | default/card | default |
| trigger            | 指示器的触发方式       | string  | click        | —       |
| indicator-position | 指示器的位置           | string  | outside      | —       |

### Carousel Events

| 事件名称 | 说明           | 回调参数                           |
| -------- | -------------- | ---------------------------------- |
| change   | 轮播切换时触发 | 目前激活的轮播的索引，原轮播的索引 |

### Carousel Methods

| 方法名        | 说明               | 参数                              |
| ------------- | ------------------ | --------------------------------- |
| setActiveItem | 手动切换幻灯片     | 需要切换的幻灯片的索引，从 0 开始 |
| prev          | 切换至上一张幻灯片 | ——                                |
| next          | 切换至下一张幻灯片 | ——                                |

