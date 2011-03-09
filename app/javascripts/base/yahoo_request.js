var YahooRequest;

YahooRequest = {
  getUserSendPref: function(callback) {
    Debug.log("YahooRequest.getUserSendPref");
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
      "id": "getUserDataRequest"
    };
    
    YahooRequest.get(body, function(response) {
      if (callback) {
        callback(response["result"]["data"]);
      }
    });
  },
  
  sendMessage: function(params, callback) {
    var request;
    
    request = {
      "method": "SendMessage",
      "params": [
        {
          "message": {
            "subject": params["subject"],
            "from": {"email": params["from"]},
            "to": [{"email": params["to"]}],
            "body": {
              "data": params["body"],
              "type": "text",
              "subtype": "plain",
              "charset": "us-ascii"
              }
            },
          "savecopy": 0
        }
      ],
      "id": "SendMessageRequest"
    };
    YahooRequest.get(request, function(response) {
      if (callback) {
        callback(response);
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
        callback(YAHOO.lang.JSON.parse(response["data"]));
      }
    });    
  }
};