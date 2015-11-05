# jquery.buchette

jQuery UI collection for advanced search

![](https://github.com/ApiO/jquery.buchette/blob/master/jquery.buchette.jpg?raw=true)

## Documentation & demo

> For code sample check out the index.html file or go to the [live demo](http://acuisinier.com/demo/jquery.buchette) or [JSFiddle](http://jsfiddle.net/5k7brh7q/).

> Available on NuGet Gallery : [here](https://www.nuget.org/packages/jquery.buchette)

**Minimal browser compatibility**

Web browser|Version 
---|---
Chrome|Ok
Firefox|v3.5
IE|v9
Opera|v10
Safari|v4
  
**Dependencies**

> **jQuery v1.11.3** at least. Works perfectly on higher versions.
  
> **FontAwesome v2.0** at least. Works perfectly on higher versions.

**Usages**

```html

	<!-- reference dependencies -->
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha256-k2/8zcNbxVIh5mnQ52A0r3a6jAgMGxFJFE2707UxGCk= sha512-ZV9KawG2Legkwp3nAlxLIVFudTauWuBpC10uEafMHYL0Sarrz5A7G79kXh5+5+woxQ5HM559XX2UZjMJ36Wplg==" crossorigin="anonymous">
  <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
  
	<!-- reference both css and js files -->
  <link href="jquery.buchette.css" rel="stylesheet">
  <script src="jquery.buchette.js"></script>
    
	<!-- Buchette elements -->
  <div id="list"></div>
  <ul id="area"></ul>
 ```
 
```javascript
  // initializes area
  $("#area").buchette({
      type: "area"
  });
  
  // initializes dropdown list
  $("#list").buchette({
      type: "dropdown",
      label: "Foo list",
      area: "#area",
      count: true,
      data: [
          { label: "label 1", checked: false, data: { foo: 1 } },
          { label: "label 2", checked: false, data: { foo: 2 } },
          { label: "label 3", checked: true, data: { foo: 3 } },
          { label: "label 4", checked: false, data: { foo: 4 } },
          { label: "label 5", checked: true, data: { foo: 5 } },
          { label: "label 6", checked: true, data: { foo: 6 } },
          { label: "label 7", checked: true, data: { foo: 7 } },
          { label: "label 8", checked: true, data: { foo: 8 } },
          { label: "label 9", checked: true, data: { foo: 9 } },
          { label: "label 10", checked: true, data: { foo: 10 } },
          { label: "label 11", checked: false, data: { foo: 11 } },
          { label: "label 12", checked: false, data: { foo: 12 } },
          { label: "label 13", checked: true, data: { foo: 13 } }
      ]
  });
```

## License

Released under the [MIT license](http://www.opensource.org/licenses/MIT).
