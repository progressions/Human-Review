var YahooRequest;

YahooRequest = {
  getUserSendPref: function(callback) {
    Debug.log("YahooRequest.getUserSendPref");
    YahooRequest.getUserData(function(response) {
      Debug.log("Before getUserSendPref callback", response);
      if (callback) {
        callback(response["userSendPref"]);
      }
    });
  },
  
  getUserData: function(callback) {
    Debug.log("YahooRequest.getData");
    
    var body;

    body = {
      "method": "GetUserData",
      "params": [{}],
      "id": "getUserDataRequest"
    };
    
    YahooRequest.get(body, function(response) {
      Debug.log("Before getUserData callback", response);
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
    Debug.log("YahooRequest.get: body", body);

    var auth = openmail.Application.getAuthService({});
    auth.callWebService({
      "url": 'http://mail.yahooapis.com/ws/mail/v1.1/jsonrpc',
      "method": "POST",
      "headers": ['content-type: application/json'],
      "parameters": {},
      "body": YAHOO.lang.JSON.stringify(body)
    }, function(response) {
      try {
        Debug.log("got user data, got response", response);
        if (response.error) {
          Debug.error("YahooRequest.get error:", response.error);
          YAHOO.oib.showError();
        } else if (callback) {
          try {
            Debug.log("about to try get callback with response['data']");
            callback(YAHOO.lang.JSON.parse(response["data"]));
          } catch(omg) {
            Debug.error(omg);
            YAHOO.oib.showError();
          }
        } else {
          Debug.log("no callback?");
        }
      } catch(wtf) {
        Debug.error(wtf);
        YAHOO.oib.showError();
      }
    });
  }
};