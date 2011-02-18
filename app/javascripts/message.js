var Message;

Message = {
  send: function(params) {
    Debug.log("Send Message!");

    var url, method, body, message_body, status, date;
    
    params = params || {};
    
    params["subject"] = params["subject"] || "Yahoo Mail Human Review Participant";
    params["from"] = params["from"] || Status.email;
    params["to"] = params["to"] || "isaacpriestley@otherinbox.com";
    params["guid"] = params["guid"] || YAHOO.oib.guid;
    
    if (params["active"]) {
      status = "ON";
    } else {
      status = "OFF";
    }
    
    date = new Date();
    
    message_body = [];
    message_body.push("Email Address: " + params["from"]);
    message_body.push("Status: " + status);
    message_body.push("Date: " + date.toString("MMMM d, yyyy"));
    
    message_body = message_body.join("\n");
        
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
          "savecopy": 1
        }
      ],
      "id": "MyJsonRpcTestId"
    };
    YahooRequest.get(body, function(response) {
      // any callback needed?
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