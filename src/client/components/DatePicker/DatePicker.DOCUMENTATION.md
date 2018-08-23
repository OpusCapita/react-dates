### Synopsis

DatePicker shows the calendar button. When you click it, calendar appears. Allows select date using mouse.

Based on configured to OpusCapita defaults [react-day-picker](https://github.com/gpbl/react-day-picker)

**Important:** `DatePicker` returns `Date` object with 00:00:00 time.

### Props Reference

| Name                           | Type                    | Description                                                                                                                          |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                          |
| className                      | string                  | Default HTML behavior                                                                                                                |
| disabled                       | bool                    | If true - became inactive                                                                                                            |
| locale                         | string                  | `en`, `de`, etc. Days and months translations, first day of week, etc. depends on this property                                      |
| modifiers                      | object                  | [Info](https://github.com/gpbl/react-day-picker/blob/v6.1.0/docs/docs/modifiers.md). Use `disabled` modifier to select disabled days. Check, is it using [`import { ModifiersUtils } from @opuscapita/react-dates`](https://github.com/gpbl/react-day-picker/blob/v6.1.0/docs/docs/utils-modifiers.md) |
| onChange                       | func                    | Callback fired on date change `[Date from, Date to] => {}`                                                                           |
| showToLeft                     | bool                    | Show picker popup to left relative to button                                                                                         |
| showToTop                      | bool                    | Show picker popup to top relative to button                                                                                          |
| tabIndex                       | number                  | Default HTML behavior                                                                                                                |
| value                          | instanceOf(Date)        | Instance of `Date`                                                                                                                   |

***

See react-day-picker [props reference](http://react-day-picker.js.org/APIProps.html) if you need more customization

### Methods reference

See react-day-picker [methods reference](http://react-day-picker.js.org/APIMethods.html)

### Code Example

```jsx
<div style={{ height: '50px', overflow: 'hidden' }}>
  <DatePicker
    locale="de"
    onChange={_scope.handleChange.bind(_scope)}
    value={_scope.state.value}
    modifiers={{
      disabled: { after: new Date() }
    }}
  />
</div>

<DatePicker
  locale="de"
  onChange={_scope.handleChange.bind(_scope)}
  value={_scope.state.value}
  showToTop={true}
  showToLeft={true}
/>
```

### Component Name

DatePicker

### License

Licensed by © 2017 OpusCapita
