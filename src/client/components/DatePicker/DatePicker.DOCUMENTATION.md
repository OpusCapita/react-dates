### Synopsis

DatePicker show calendar button. When you click it, calendar appears

### Props Reference

| Name                           | Type                    | Description                                                                    |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                    |
| className                      | string                  | Default HTML behavior                                                          |
| date                           | instanceOf(Date)        |                                                                                |
| disabled                       | bool                    | Is DatePicker button disabled                                                  |
| locale                         | string                  | Days and months translations, first day of week, etc. depends on this property |
| onChange                       | func                    | Callback triggered on selecting new date                                       |
| showToTop                      | bool                    | Show picker popup to top relative to button                                    |
| showToLeft                     | bool                    | Show picker popup to left relative to button                                   |
| tabIndex                       | number                  | Default HTML behavior                                                          |

### Code Example

```
<DatePicker 
  locale="de-DE"
  onChange={_scope.handleChange.bind(_scope)}
  onClick={() => console.log('click')}
/>

<DatePicker 
  locale="de-DE"
  onChange={_scope.handleChange.bind(_scope)}
  onClick={() => console.log('click')}
  showToLeft={true}
/>

<DatePicker 
  locale="de-DE"
  onChange={_scope.handleChange.bind(_scope)}
  onClick={() => console.log('click')}
  disabled={true}
  showToLeft={true}
/>

<DatePicker
  locale="de-DE"
  onChange={_scope.handleChange.bind(_scope)}
  onClick={() => console.log('click')}
  showToTop={true}
  showToLeft={true}
/>
```

### Component Name

DatePicker

### License

Licensed by © 2017 OpusCapita
