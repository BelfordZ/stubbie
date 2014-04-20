var sinon = require('sinon');

var paramOffset = 0;

var Stubbie = function() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) { args.push(arguments[i]); }

  var stubObj = _parseFunctionArgs(args);
  var cbParams = _parseCbParamArgs(args);

  console.log(stubObj, cbParams);
  return sinon.stub(stubObj, 'fn', function() {
    var cb = arguments[arguments.length-1];

    cb(cbParams[0], cbParams[1]);
  });
};

var _parseFunctionArgs = function(args) {
  var stubObj = { fn: undefined };

  // Supports new Stubbie(function() {}, ...)
  if (typeof arguments[0] === 'function') {
    stubObj.fn = args[0];
    paramOffset = 1;
    return stubObj;
  }

  // Supports new Stubbie({ func: function(){} }, "func", ...)
  if (typeof args[0] === 'object') {
    if (typeof args[0][args[1]] !== 'function') { 
      throw new Error('Stubbie: ' + args[0].constructor.name + "." + args[1] + 'is not a function');
    }

    stubObj.fn = args[0][args[1]];
    paramOffset = 2;
    return stubObj;
  }
};

var _parseCbParamArgs = function(args) {
  if (typeof args.length === paramOffset + 2) {
    return [args[paramOffset], args[paramOffset + 1]];
  }
  
  if (typeof args.length === paramOffset + 1) {
    if (args instanceof 'Error') {
      return [args[paramOffset], null];
    }
    
    return [null, args[paramOffset]];
  }
};

module.exports = Stubbie;
