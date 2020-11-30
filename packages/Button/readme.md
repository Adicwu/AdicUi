### Button  Attributes



| 参数        | 说明                                         | 类型          | 可选值                            | 默认值 |
| ----------- | -------------------------------------------- | ------------- | --------------------------------- | ------ |
| type        | 类型                                         | string        | brand/success/warning/danger/info | brand  |
| round       | 是否圆角按钮                                 | boolean       | —                                 | false  |
| circle      | 是否圆形按钮，一般配合icon使用               | boolean       | —                                 | false  |
| disabled    | 是否禁用状态                                 | boolean       | —                                 | false  |
| loading     | 是否加载中状态，建议和disabled一起使用       | boolean       | —                                 | false  |
| icon        | 图标类名，使用此项和circle会默认禁用内部文本 | string        | —                                 | —      |
| throttleDel | 节流行为，传入毫秒                           | string/number | —                                 | —      |
| debounceDel | 防抖行为，传入毫秒                           | string/number | —                                 | —      |

*注：throttleDel和debounceDel同时存在只有防抖生效

### Button  Slot

| 名称   | 说明                                   |
| ------ | -------------------------------------- |
| loader | 配合loading使用，定义loading时展示界面 |

