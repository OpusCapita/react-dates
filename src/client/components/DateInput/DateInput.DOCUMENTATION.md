### Synopsis

Allows select date using mouse or keyboard.

Based on configured to OpusCapita defaults [react-day-picker](https://github.com/gpbl/react-day-picker)

**Important:** `DatePicker` returns `Date` object with 00:00:00 time.

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                                |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                                |
| className                      | string                  | Default behavior                                                                                                                                                           |
| dateFormat                     | string                  | `dd/MM/yyyy`, `MM.dd.yyyy`, etc.                                                                                                                                           |
| disabled                       | bool                    | If true - became inactive                                                                                                                                                  |
| isValid                        | bool                    | If false - highlight input as error                                                                                                                                        |
| locale                         | string                  | `en`, `de`, etc. Days and months translations, first day of week, etc. depends on this property                                                                            |
| modifiers                      | object                  | [Info](https://github.com/gpbl/react-day-picker/blob/v6.1.0/docs/docs/modifiers.md). Use `disabled` modifier to select disabled days. Check, is it using [`import { ModifiersUtils } from @opuscapita/react-dates`](https://github.com/gpbl/react-day-picker/blob/v6.1.0/docs/docs/utils-modifiers.md) |
| onBlur                         | func                    | Callback fired on input blur `(e) => {}`                                                                                                                                   |
| onChange                       | func                    | Callback fired on date change `Date date => {}`                                                                                                                            |
| onFocus                        | func                    | Callback fired on input focus `(e) => {}`                                                                                                                                  |
| showToLeft                     | bool                    | Show picker popup to left relative to input                                                                                                                                |
| showToTop                      | bool                    | Show picker popup to top relative to input                                                                                                                                 |
| tabIndex                       | number                  | Default behavior                                                                                                                                                           |
| value                          | object                  | Instance of `Date`                                                                                                                                                         |
| variants                       | array                   | `[ { getLabel: (locale) => string, getRange: (locale) => [ from<Date>, to<Date>] } ]` List of pre-defined date-ranges. Examples: current month, last week, next week, etc. |

### Code Example

```jsx
<button onClick={_scope.handleOpenModal}>Open in modal</button>
<Modal show={_scope.state.openModal} onHide={_scope.handleHideModal}>
  <Modal.Body>
    <DateInput
      value={_scope.state.value}
      dateFormat="dd/MM/yyyy"
      locale="de"
      onChange={_scope.handleChange}
    />
  </Modal.Body>
</Modal>

<hr />

<DateInput
  value={_scope.state.value}
  dateFormat="dd/MM/yyyy"
  disabled={false}
  locale="en"
  onChange={_scope.handleChange}
/>

<hr />

<DateInput
  value={_scope.state.value}
  dateFormat="dd/MM/yyyy"
  locale="fi"
  onBlur={(e) => console.log('Blur!', e)}
  onChange={_scope.handleChange}
  onFocus={(e) => console.log('Focus!', e)}
  showToLeft={true}
  showToTop={true}
  modifiers={{
    disabled: { after: new Date() }
  }}
/>
```

### Component Name

DateInput

### License

Licensed by © 2017 OpusCapita

