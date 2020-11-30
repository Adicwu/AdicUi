### Slider Attributes

| 参数            | 说明           | 类型    | 可选值 | 默认值  |
| --------------- | -------------- | ------- | ------ | ------- |
| value / v-model | 绑定值Number   | number  | —      | 0       |
| disabled        | 是否禁用       | boolean | —      | false   |
| color           | 主题颜色       | string  | —      | #ed143d |
| label           | 是否显示指示器 | boolean | —      | false   |
| step            | 步长           | number  | —      | 0       |
| readonly        | 是否只读       | boolean |        | false   |

### Slider Events

| 事件名称 | 说明                                               | 回调参数   |
| -------- | -------------------------------------------------- | ---------- |
| change   | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | 改变后的值 |
| input    | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | 改变后的值 |

