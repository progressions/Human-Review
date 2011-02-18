var YahooRequest;

YahooRequest = {
  getUserSendPref: function(callback) {
    YahooRequest.getUserData(function(response) {
      if (callback) {
        callback(response["userSendPref"]);
      }
    });
  },
  
  getUserData: function(callback) {
    Debug.log("User.getData");
    
    var body;

    body = {
      "method": "GetUserData",
      "params": [{}],
      "id": "getUserDataThing"
    };
    
    YahooRequest.get(body, function(response) {
      if (callback) {
        callback(response["result"]["data"]);
      }
    });
  },
  
  get: function(body, callback) {
    Debug.log("body", body);

    var auth = openmail.Application.getAuthService({});
    auth.callWebService({
      "url": 'http://mail.yahooapis.com/ws/mail/v1.1/jsonrpc',
      "method": "POST",
      "headers": ['content-type: application/json'],
      "parameters": {},
      "body": YAHOO.lang.JSON.stringify(body)
    }, function(response) {
      Debug.log("got user data, got response", response);
      if (callback) {
        callback($.parseJSON(response["data"]));
      }
    });    
  }
};