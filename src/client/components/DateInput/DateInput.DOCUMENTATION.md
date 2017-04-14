### Synopsis

DateInput is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| className                      | string                  |                                                             |
| date                           | object                  | Instance of Date                                            |
| dateFormat                     | string                  | Something like "yyyy/MM/dd" or "dd.MM.yyyy"                 |
| disabled                       | bool                    |                                                             |
| isValid                        | bool                    | If false -                                |
| locale                         | string                  |                                                             |
| onChange                       | func                    |                                                             |
| onHide                         | func                    |                                                             |
| showToLeft                     | bool                    |                                                             |
| showToTop                      | bool                    |                                                             |
| tabIndex                       | number                  |                                                             |

### Code Example

```
<DateInput 
  date={_scope.state.date}
  dateFormat="dd/MM/yyyy"
  onChange={_scope.handleChange.bind(_scope)}
  showResetButton={true}
  locale="de-DE"
/>
```

### Component Name

DateInput

### License

Licensed by © 2017 OpusCapita

