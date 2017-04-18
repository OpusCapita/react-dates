### Synopsis

DatePicker shows the calendar button. When you click it, calendar appears. Allows select date using mouse.

Based on configured to OpusCapita defaults [react-day-picker](https://github.com/gpbl/react-day-picker)

### Props Reference

| Name                           | Type                    | Description                                                                                     |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                     |
| className                      | string                  | Default HTML behavior                                                                           |
| date                           | instanceOf(Date)        | Instance of `Date`                                                                              |
| disabled                       | bool                    | If true - became inactive                                                                       |
| locale                         | string                  | `en`, `de`, etc. Days and months translations, first day of week, etc. depends on this property |
| onChange                       | func                    | Callback triggered on selecting new date                                                        |
| showToLeft                     | bool                    | Show picker popup to left relative to button                                                    |
| showToTop                      | bool                    | Show picker popup to top relative to button                                                     |
| tabIndex                       | number                  | Default HTML behavior                                                                           |

***

See react-day-picker [props reference](http://react-day-picker.js.org/APIProps.html) if you need more customization

### Methods reference

See react-day-picker [methods reference](http://react-day-picker.js.org/APIMethods.html)

### Code Example

```
<DatePicker
  date={_scope.state.date}
  locale="de-DE"
  onChange={_scope.handleChange.bind(_scope)}
/>


```

### Component Name

DatePicker

### License

Licensed by © 2017 OpusCapita
