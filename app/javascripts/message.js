var Message;

Message = {
  send: function(params, callback) {
    Debug.log("Send Message!");

    var url, method, request, message_body, status, date;
    
    params = params || {};
    
    // set defaults
    
    params["subject"] = params["subject"] || "Yahoo Mail Human Review Participant";
    params["from"] = params["from"] || Status.email;
    params["to"] = params["to"] || "<%= @destination_email %>";
    
    // status
    
    if (params["active"]) {
      status = "ON";
    } else {
      status = "OFF";
    }
    
    // date
    
    date = new Date();
    
    // message body
    
    message_body = [];
    message_body.push("Email Address: " + params["from"]);
    message_body.push("Status: " + status);
    message_body.push("Date: " + date.toString());
    
    message_body = message_body.join("\n");
    
    params["body"] = message_body;
    
    YahooRequest.sendMessage(params, function(response) {
      if (callback) {
        callback(response);
      }
    });
  },
  
  optIn: function(callback) {
    Message.send({
      "active": true
    }, callback);
  },

  optOut: function(callback) {
    Message.send({
      "active": false
    }, callback);
  }
};