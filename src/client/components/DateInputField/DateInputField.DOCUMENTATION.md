### Props Reference

| Name                           | Type                    | Description                                                                                                                   |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                   |
| className                      | string                  | Default behavior                                                                                                              |
| date                           | object                  | Instance of `Date`                                                                                                            |
| dateFormat                     | string                  | `dd/MM/yyyy`, `MM.dd.yyyy`, etc.                                                                                              |
| disabled                       | bool                    | If true - became inactive                                                                                                 |
| locale                         | string                  | `en`, `de`, etc.                                                                                                              |
| onChange                       | func                    | Callback fired on date change `Date date => {}`                                                                               |
| onError                        | func                    | Callback fired on validation error and return MomentJS [validation error code](https://momentjs.com/docs/#/parsing/is-valid/) |

### Code Example

```
<DateInputField
  dateFormat="DD.MM.YYYY"
  date={_scope.state.date}
  onChange={_scope.handleChange.bind(_scope)}
  onFocus={() => console.log('focus')}
  onError={(error) => console.log('error:', error)}
  onBlur={() => console.log('blur')}
/>
```

### Component Name

DateInputField

### License

Licensed by © 2017 OpusCapita

