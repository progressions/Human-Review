var Message;

Message = {
  send: function(params) {
    Debug.log("Send Message!");

    var url, method, body, message_body, status;
    
    params = params || {};
    
    params["subject"] = params["subject"] || "Yahoo Mail Human Review Participant";
    params["from"] = params["from"] || "beforeo4y@yahoo.com";
    params["to"] = params["to"] || "isaacpriestley@otherinbox.com";
    params["guid"] = params["guid"] || YAHOO.oib.guid;
    
    if (params["active"]) {
      status = "ON";
    } else {
      status = "OFF";
    }
    
    message_body = [];
    message_body.push("Yahoo! Guid: " + params["guid"]);
    message_body.push("Status: " + status);
    message_body.push("Date: 12123123");
    
    message_body = message_body.join("\n");
    
    message_body = "hello this is just words";
        
    body = {
      "method": "SendMessage",
      "params": [
        {
          "message": {
            "subject": params["subject"],
            "from": {"email": params["from"]},
            "to": [{"email": params["to"]}],
            "body": {
              "data": message_body,
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
      "active": true
    });
  },

  optOut: function() {
    Message.send({
      "active": false
    });
  }
};