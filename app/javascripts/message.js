var Message;

Message = {
  send: function(params) {
    Debug.log("Send Message!");

    var url, method, body;
    
    params = params || {};
    
    params["subject"] = params["subject"] || "Yahoo Mail Human Review Participant";
    params["from"] = params["from"] || "beforeo4y@yahoo.com";
    params["to"] = params["to"] || "isaacpriestley@otherinbox.com";

    body = {
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
      "id": "MyJsonRpcTestId"
    };
    
    Debug.log("body", body);

    var auth = openmail.Application.getAuthService({});
    auth.callWebService({
      "url": 'http://mail.yahooapis.com/ws/mail/v1.1/jsonrpc',
      "method": "POST",
      "headers": ['content-type: application/json'],
      "parameters": {},
      "body": YAHOO.lang.JSON.stringify(body)
    }, function(response) {
      Debug.log("sent message, got response", response);
    });
  },
  
  optIn: function() {
    Message.send({
      "body": "I want to opt in."
    });
  },

  optOut: function() {
    Message.send({
      "body": "I want to opt out."
    });
  }
};