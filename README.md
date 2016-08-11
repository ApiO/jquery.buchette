# jquery.buchette

[![NuGet](https://img.shields.io/nuget/v/jquery.buchette.svg)](https://www.nuget.org/packages/jquery.buchette) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://opensource.org/licenses/MIT)

jQuery UI collection for advanced search

![](https://github.com/ApiO/jquery.buchette/blob/master/images/jquery.buchette.jpg?raw=true)

## Documentation & demo

> For code sample check out the index.html file or go to the [live demo](http://acuisinier.com/demo/jquery.buchette) or [JSFiddle](http://jsfiddle.net/5k7brh7q/4/).

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
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" >
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

<!-- reference both css and js files -->
<link href="jquery.buchette.css" rel="stylesheet">
<script src="jquery.buchette.js"></script>

<!-- Buchette elements -->
<div id="list"></div>
<ul id="area"></ul>
```
 
***Area***

```javascript
// initializes area
$("#area").buchette({
    type: "area"
});

```

```javascript
// Binds callback to area 'change' event
$("#area").on("change", function() {
  console.log("foo");
});
```

```javascript
// Get the area filter list
var filters = $("#area").getFilters();
```

Filter object definition:

```javascript
{
  filter: string // refers to filter value of the 'buchette' source/parent 
  data: object   // user data from dropdown initialisation
}
```


Callback events

Type | Event | Description
---|---|---
area|change|Triggered when the area's filter list change.


***Dropdown list***
 
```javascript
// initializes dropdown list
$("#list").buchette({
    type: "dropdown",
    label: "Foo list", // optional, title displayed into the element
    area: "#area",     // area id, optional if you does not want to use area binding behaviors
    count: true,       // optional, display selected item number
    filter: "fooCol",  // refers to a server side object name, as DB column/table or anything else
    data: [
        { 
          label: "label 1", // used by the 'buchette' in the aea
          checked: false,   // initial state
          data: { foo: 1, ... }  // user data
        },
        { label: "label 2", checked: false, data: { foo: 2 } },
        { label: "label 3", checked: true, data: { foo: 3 } },
        { label: "label 4", checked: false, data: { foo: 4 } },
        ...
    ]
});
```

##License

MIT License

Copyright (c) 2014-2016 ApiO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
