### Synopsis

DateInputField is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

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

