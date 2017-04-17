### Synopsis

### Props Reference

| Name                           | Type                                                                 | Description                                                                                                                                                 |
| ------------------------------ | :----------------------                                              | -----------------------------------------------------------                                                                                                 |
| className                      | string                                                               | Default behavior                                                                                                                                            |
| dateFormat                     | string                                                               | `dd/MM/yyyy`, `MM.dd.yyyy`, etc.                                                                                                                            |
| dateRange                      | array                                                                | `[Date from, Date to]`                                                                                                                                      |
| disabled                       | bool                                                                 | If true - became inactive                                                                                                                                   |
| isValid                        | bool                                                                 | If false - highlight input as error                                                                                                                         |
| locale                         | string                                                               | `en`, `de`, etc. Days and months translations, first day of week, etc. depends on this property                                                             |
| onChange                       | func                                                                 | Callback fired on date change `[Date from, Date to] => {}`                                                                                                  |
| showToLeft                     | bool                                                                 | Show picker popup to left relative to input                                                                                                                 |
| showToTop                      | bool                                                                 | Show picker popup to top relative to input                                                                                                                  |
| tabIndex                       | number                                                               | Default behavior                                                                                                                                            |
| variants                       | array                                                                | `[ { label: string, getRange: (locale) => [ from<Date>, to<Date>] } ]` List of pre-defined date-ranges. Examples: current month, last week, next week, etc. |

### Code Example

```
<DateRangeInput 
  dateFormat="MM.dd.yyyy"
  dateRange={_scope.state.dateRange1}
  onChange={_scope.handleChange1.bind(_scope)}
  locale={'de'}
/>

<hr />

<DateRangeInput 
  dateFormat="dd.MM.yyyy"
  dateRange={_scope.state.dateRange2}
  disabled={true}
  onChange={_scope.handleChange3.bind(_scope)}
  locale={'de'}
/>

<hr />

<DateRangeInput 
  dateFormat="dd.MM.yyyy"
  dateRange={_scope.state.dateRange3}
  onChange={_scope.handleChange3.bind(_scope)}
  locale={'ru'}
  placeholder="Выберите диапазон дат"
  showToTop={true}
  showToLeft={false}
/>
``` 

### Component Name

DateRangeInput

### License

Licensed by © 2017 OpusCapita

