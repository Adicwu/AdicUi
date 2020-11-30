### Waterfall  Attributes

| 参数         | 说明                 | 类型          | 可选值 | 默认值 |
| ------------ | -------------------- | ------------- | ------ | ------ |
| list         | 必须，需要处理的数据 | array         | —      | —      |
| initColCount | 初始化每列数据长度   | number/string | —      | 5      |
| preAdd       | 每次末尾添加的数量   | number/string | —      | 2      |
| fromBottom   | 距离滚动到底部的距离 | number        | —      | 60     |
| column       | 列数                 | number/string | —      | 2      |

### Waterfall  Event

| 事件名称 | 说明           | 回调参数           |
| -------- | -------------- | ------------------ |
| loadMore | 滚动到底部触发 | 滚动事件的回调参数 |

