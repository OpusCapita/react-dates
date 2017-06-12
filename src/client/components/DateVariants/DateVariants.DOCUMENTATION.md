### Synopsis

DateVariants is
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                 |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                 |
| variants                       | array                   | `[ { label: string, getValue: (locale) => [ from<Date>, to<Date>] } ]` List of pre-defined values. Examples: current month, last week, next week, etc. |
| onChange                       | func                    | `([Date from, Date to]) => {}`                                                                                                                              |
| locale                         | string                  |                                                                                                                                                             |

### Code Example

```jsx
<DateVariants
  onChange={value => console.log(value)}
/>
```

### Component Name

DateVariants

### License

Licensed by © 2017 OpusCapita

