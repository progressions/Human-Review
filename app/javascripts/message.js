var Message;

Message = {
  send: function(params, callback) {
    var params;
    try {
      Debug.log("Send Message!");

      params = Message.params(params);
    
      Message.sendMessage(params, callback);
    } catch(omg) {
      Debug.error(omg);
      YAHOO.oib.showError();
    }
  },
  
  params: function(params) {
    var url, method, request, message, message_body, status, date, username;
  
    params = params || {};
  
    // set defaults
  
    params["subject"] = params["subject"] || "Improve Yahoo! Mail Participant";
    params["from"] = params["from"] || Status.email;
  
    // status
  
    if (params["active"]) {
      params["to"] = params["to"] || "<%= @opt_in_destination_email %>";
      status = "in";
    } else {
      params["to"] = params["to"] || "<%= @opt_out_destination_email %>";
      status = "out";
    }
  
    // get yahoo id from email
  
    username = Status.email.split("@")[0];
  
    // date
    
    var unixtime = Message.timestamp();
    
    message = [username, status, unixtime, Status.defaultFromAddress, Status.defaultID];
  
    // message body
  
    message_body = [];
    message_body.push("Report_Name: Improve Yahoo! Mail");
    message_body.push(message.join("\t"));
    
    // put 2 emails after username
  
    message_body = message_body.join("\n");
  
    params["body"] = message_body;
    
    return params;
  },
  
  sendMessage: function(params, callback) {
    YahooRequest.sendMessage(params, function(response) {
      if (callback) {
        try {
          callback(response);
        } catch(wtf) {
          Debug.error(wtf);
          YAHOO.oib.showError();
        }
      }
    });
  },
  
  timestamp: function() {
    var d, unixtime, year, month, date, hour, minutes, seconds;
    
    d = new Date();
    year = d.getUTCFullYear();
    month = d.getUTCMonth();
    date = d.getUTCDate();
    hour = d.getUTCHours();
    minutes = d.getUTCMinutes();
    seconds = d.getUTCSeconds();
    
    unixtime = Date.UTC(year, month, date, hour, minutes, seconds) / 1000;
    
    return unixtime;
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