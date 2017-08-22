### Props Reference

| Name                           | Type                    | Description                                                                                                                   |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                   |
| className                      | string                  | Default behavior                                                                                                              |
| dateFormat                     | string                  | `dd/MM/yyyy`, `MM.dd.yyyy`, etc.                                                                                              |
| disabled                       | bool                    | If true - became inactive                                                                                                     |
| locale                         | string                  | `en`, `de`, etc.                                                                                                              |
| onChange                       | func                    | Callback fired on date change `Date date => {}`                                                                               |
| onError                        | func                    | Callback fired on validation error and return MomentJS [validation error code](https://momentjs.com/docs/#/parsing/is-valid/) |
| onRef                          | func                    | Fires after component mount. Retrurns `this` of `DateInputField`                                                              |
| value                          | object                  | Instance of `Date`                                                                                                            |

### Methods Reference

| Name                           | Description                 |
| ------------------------------ | :----------------------     |
| clear                          | Forcibly clears input value |

### Code Example

```jsx
<DateInputField
  dateFormat="DD.MM.YYYY"
  onBlur={() => console.log('blur')}
  onChange={_scope.handleChange.bind(_scope)}
  onError={(error) => console.log('error:', error)}
  onFocus={() => console.log('focus')}
  value={_scope.state.value}
/>

<br />

<DateInputField
  dateFormat="D.M.YYYY"
  onBlur={() => console.log('blur')}
  onChange={_scope.handleChange.bind(_scope)}
  onError={(error) => console.log('error:', error)}
  onFocus={() => console.log('focus')}
  value={_scope.state.value}
/>
```

### Component Name

DateInputField

### License

Licensed by © 2017 OpusCapita

