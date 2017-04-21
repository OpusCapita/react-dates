### Synopsis

OpusCapita date components doesn't require any react context.

If you want to use these components in pair with [opuscapita-i18n](https://github.com/OpusCapitaBES/js-i18n) ,
you can wrap any opuscapita-react-dates component with I18nLinker.

This component takes `dateFormat` and `locale` values from instance of `i18nManager` in it's context and pass to child component.

### Context Reference

| Name                           | Type                    | Description                                                                            |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                            |
| i18n                           | object                  | Instance of `i18nManager`. More info [here](https://github.com/OpusCapitaBES/js-i18n). |

### Code Example

```jsx
{/* We use I18nContext in demo, but it isn't required */}
<I18nContext 
  locale='en'
  formatInfos={{
    'en': {
      datePattern: 'dd/MM/yyyy',
      dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
      integerPattern: '#,##0',
      numberPattern: '#,##0.00#######',
      numberDecimalSeparator: '.',
      numberGroupingSeparator: ',',
      numberGroupingSeparatorUse: true,
    },
    'de': {
      datePattern: 'dd.MM.yyyy',
      dateTimePattern: 'dd.MM.yyyy HH:mm:ss',
      integerPattern: '#,##0',
      numberPattern: '#,##0.00#######',
      numberDecimalSeparator: '.',
      numberGroupingSeparator: ',',
      numberGroupingSeparatorUse: true,
    }
  }}
>
  <I18nLinker>
    <DateInput
      onChange={_scope.handleChange.bind(_scope)} 
      date={_scope.state.date} 
    />
  </I18nLinker>
</I18nContext>
```

### Component Name

I18nLinker

### License

Licensed by © 2017 OpusCapita

