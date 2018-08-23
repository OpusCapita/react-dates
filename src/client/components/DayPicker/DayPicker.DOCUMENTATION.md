### Synopsis

DayPicker is a styled to OpusCapita defaults [react-day-picker](https://github.com/gpbl/react-day-picker)

* [Props Reference](http://react-day-picker.js.org/APIProps.html)
* [Methods Reference](http://react-day-picker.js.org/APIMethods.html)

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                                                                                                                      |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                                                                                                                      |
| className                      | string                  | Default behavior                                                                                                                                                                                                                                                 |
| dayPickerRef                   | func                    | Callback with [react ref](https://facebook.github.io/react/docs/refs-and-the-dom.html) behavior, but returns [react-day-picker](http://react-day-picker.js.org/) element. Useful if you want call some [methods](http://react-day-picker.js.org/APIMethods.html) |
| isRange                        | bool                    |                                                                                                                                                                                                                                                                  |
| hideTodayButton                | bool                    |                                                                                                                                                                                                                                                                  |
| onChange                       | func                    | Callback fired when new date selected `Date date => {}`                                                                                                                                                                                                          |
| locale                         | string                  | `de`, `en`, etc.                                                                                                                                                                                                                                                 |
| modifiers                      | object                  | [Info](https://github.com/gpbl/react-day-picker/blob/v6.1.0/docs/docs/modifiers.md). Use `disabled` modifier to select disabled days. Check, is it using [`import { ModifiersUtils } from @opuscapita/react-dates`](https://github.com/gpbl/react-day-picker/blob/v6.1.0/docs/docs/utils-modifiers.md) |
| pickerClassName                | string                  | Class name passed to react day picker                                                                                                                                                                                                                            |
| getTodayButtonLabel            | string                  |                                                                                                                                                                                                                                                                  |

***

See react-day-picker [props reference](http://react-day-picker.js.org/APIProps.html) if you need more customization

### Methods reference

See react-day-picker [methods reference](http://react-day-picker.js.org/APIMethods.html)

### Code Example

```jsx
<DayPicker
  dayPickerRef={ref => (window.picker = ref)}
  onChange={ day => console.log('day:', day) }
  locale="en"
/>

<DayPicker
  dayPickerRef={ref => (window.picker = ref)}
  onChange={ day => console.log('day:', day) }
  numberOfMonths={2}
  isRange={true}
  locale="en"
  modifiers={{
    disabled: { after: new Date() }
  }}
/>
```

### Component Name

DayPicker

### License

Licensed by © 2017 OpusCapita

