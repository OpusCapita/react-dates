### Synopsis

Allows select date using mouse or keyboard.

Based on configured to OpusCapita defaults [react-day-picker](https://github.com/gpbl/react-day-picker)

### Props Reference

| Name                           | Type                    | Description                                                                                     |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                     |
| className                      | string                  | Default behavior                                                                                |
| date                           | object                  | Instance of `Date`                                                                              |
| dateFormat                     | string                  | `dd/MM/yyyy`, `MM.dd.yyyy`, etc.                                                                |
| disabled                       | bool                    | If true - became inactive                                                                       |
| isValid                        | bool                    | If false - highlight input as error                                                             |
| locale                         | string                  | `en`, `de`, etc. Days and months translations, first day of week, etc. depends on this property |
| onChange                       | func                    | Callback fired on date change `Date date => {}`                                                 |
| showToLeft                     | bool                    | Show picker popup to left relative to input                                                     |
| showToTop                      | bool                    | Show picker popup to top relative to input                                                      |
| tabIndex                       | number                  | Default behavior                                                                                |

### Code Example

```
<DateInput
  date={_scope.state.date}
  dateFormat="dd/MM/yyyy"
  locale="de-DE"
  onChange={_scope.handleChange.bind(_scope)}
/>

<hr />

<DateInput
  date={_scope.state.date}
  dateFormat="dd/MM/yyyy"
  disabled={true}
  locale="en-GB"
  onChange={_scope.handleChange.bind(_scope)}
/>

<hr />

<DateInput
  date={_scope.state.date}
  dateFormat="dd/MM/yyyy"
  locale="hu-HU"
  onChange={_scope.handleChange.bind(_scope)}
  showToLeft={true}
  showToTop={true}
/>
```

### Component Name

DateInput

### License

Licensed by © 2017 OpusCapita

