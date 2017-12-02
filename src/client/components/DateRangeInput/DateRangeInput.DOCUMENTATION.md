### Synopsis

Allows select date range using mouse.

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                                |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                                |
| className                      | string                  | Default behavior                                                                                                                                                           |
| dateFormat                     | string                  | `dd/MM/yyyy`, `MM.dd.yyyy`, etc.                                                                                                                                           |
| disabled                       | bool                    | If true - became inactive                                                                                                                                                  |
| isValid                        | bool                    | If false - highlight input as error                                                                                                                                        |
| locale                         | string                  | `en`, `de`, etc. Days and months translations, first day of week, etc. depends on this property                                                                            |
| onFocus                        | func                    | Callback fired on input focus `(e, inputName) => {}` where `inputName === 'from                                                                                            |
| onBlur                         | func                    | Callback fired on input blur `(e, inputName) => {}`  where `inputName === 'from                                                                                            |
| onChange                       | func                    | Callback fired on date change `[Date from, Date to] => {}`                                                                                                                 |
| showToLeft                     | bool                    | Show picker popup to left relative to input                                                                                                                                |
| showToTop                      | bool                    | Show picker popup to top relative to input                                                                                                                                 |
| tabIndex                       | number                  | Default behavior                                                                                                                                                           |
| value                          | array                   | `[Date from, Date to]`                                                                                                                                                     |
| variants                       | array                   | `[ { getLabel: (locale) => string, getRange: (locale) => [ from<Date>, to<Date>] } ]` List of pre-defined date-ranges. Examples: current month, last week, next week, etc. |

### Code Example

```jsx
<DateRangeInput
  dateFormat="MM.dd.yyyy"
  locale={'de'}
  onChange={_scope.handleChange1.bind(_scope)}
  value={_scope.state.value1}
/>

<hr />

<DateRangeInput
  dateFormat="dd.MM.yyyy"
  disabled={true}
  locale={'de'}
  onChange={_scope.handleChange3.bind(_scope)}
  value={_scope.state.value2}
/>
```

### Component Name

DateRangeInput

### License

Licensed by © 2017 OpusCapita
