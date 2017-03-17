### Synopsis

DateInput is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Code Example

```
<DateInput
  className="form-control"
  dateFormat="yyyy/dd/MM - EEE - HH:mm:ss"
  onChange={date => console.log(date)}
  onClear={() => console.log('clear')}
  value={new Date(1970, 1, 1, 1, 1)}
  locale="de-DE"
/>

<DateInput
  dateFormat="yy/d/M EEE H:m:s"
  onChange={date => console.log(date)}
  onClear={() => console.log('clear')}
  value={new Date()}
  locale="fi-FI"
/>

<DateInput
  dateFormat="yy/d/M - EEE - H:m:s"
  onChange={date => console.log(date)}
  onClear={() => console.log('clear')}
  value={new Date()}
  locale="hu-HU"
/>

<DateInput
  dateFormat="yy/d/M - EEE - H:m:s"
  onChange={date => console.log(date)}
  onClear={() => console.log('clear')}
  value={new Date()}
  locale="ru-RU"
/>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| demoProp | string | Write a description of the property |

### Contributors
*Write here contributor names/contacts*

[GIT REPOSITORY](http://buildserver.jcatalog.com/gitweb/?p=js-react-application-generator.git)

### Component Name

DateInput

### License

Licensed by © 2016 OpusCapita

