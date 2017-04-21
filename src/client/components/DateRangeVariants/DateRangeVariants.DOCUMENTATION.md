### Synopsis

DateRangeVariants is
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                 |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                 |
| variants                       | array                   | `[ { label: string, getRange: (locale) => [ from<Date>, to<Date>] } ]` List of pre-defined date-ranges. Examples: current month, last week, next week, etc. |
| onChange                       | func                    | `([Date from, Date to]) => {}`                                                                                                                              |
| locale                         | string                  |                                                                                                                                                             |

### Code Example

```jsx
<DateRangeVariants
  onChange={range => console.log(range)}
/>
```

### Component Name

DateRangeVariants

### License

Licensed by © 2017 OpusCapita

