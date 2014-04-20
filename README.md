# Stubbie - easy async testing


test.js
```
var Stubbie = require('stubbie');
var fs = require('fs');

var app = require('./app.js');

var readFileStub = new Stubbie(fs, 'readFile', null, "Instead of calling readFile, just callback with this result instead");

app.functionToUnitTest(); // will call our stubbed readFile method

```

appCode.js
```
var functionToUnitTest = function() {
  ...

  fs.readFile(someFile, function(err, contents) {
    // continues on with what we want to test
    ...
  });
  
};
```