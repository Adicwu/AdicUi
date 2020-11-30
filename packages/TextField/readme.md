### TextField Attributes

| 参数            | 说明                   | 类型            | 可选值        | 默认值 |
| --------------- | ---------------------- | --------------- | ------------- | ------ |
| type            | 类型                   | string          | text/password | text   |
| value / v-model | 绑定值                 | string / number | —             | —      |
| maxlength       | 原生属性，最大输入长度 | number          | —             | —      |
| minlength       | 原生属性，最小输入长度 | number          | —             | —      |
| label           | 提示文字               | string          | —             | label  |
| disabled        | 禁用                   | boolean         | —             | false  |
| autofocus       | 原生属性，自动获取焦点 | boolean         | —             | false  |
| locked          | 是否禁用 input         | boolean         | —             | false  |

### TextField Events

| 事件名称 | 说明                                   | 回调参数                  |
| -------- | -------------------------------------- | ------------------------- |
| blur     | 在 TextField 失去焦点时触发            | (event: Event)            |
| focus    | 在 TextField 获得焦点时触发            | (event: Event)            |
| change   | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| input    | 在 TextField 值改变时触发 | (value: string \| number)                          |

### TextField Methods

| 方法名 | 说明                    | 参数 |
| ------ | ----------------------- | ---- |
| focus  | 使 TextField 获取焦点   | —    |
| blur   | 使 TextField 失去焦点   | —    |
| select | 选中 TextField 中的文字 | —    |

