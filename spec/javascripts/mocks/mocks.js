
var YAHOO = {
  namespace: function(name) {
    YAHOO[name] = {};
  },
  openmail: {
    ERR_NONE: 999
  },
  constants: {},
  lang: {
    JSON: {
      stringify: function() {}
    }
  }
};

var FB = {
  init: function() {}
};

var Debug = {};
Debug.consoleOn = function() {
  return true;
};

var OpenMailIntl = {
  findBestLanguage: function() {
    return("en-US");
  }
};

if (console === undefined) {
  var console = console || {
    log: function() {},
    error: function() {},
    info: function() {},
    warn: function() {}
  };
}

// openmail.Application.callWebService
var openmail = {
  Application: {
    callWebService: function() {},
    getParameters: function() {},
    getData: function() {},
    setData: function() {}
  }
};

var OpenMailIntl = {
  formatMessage: function(key, args, lang) {
    // alert("formatMessage: " + key);
  },  
  getResources: function() {},
  findBestLanguage: function() {
    return "en-US";
  }
};
