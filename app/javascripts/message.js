var Message;

Message = {
  send: function(params, callback) {
    try {
      Debug.log("Send Message!");

      var url, method, request, message_body, status, date, username;
    
      params = params || {};
    
      // set defaults
    
      params["subject"] = params["subject"] || "Improve Yahoo! Mail Participant";
      params["from"] = params["from"] || Status.email;
      params["to"] = params["to"] || "<%= @destination_email %>";
    
      // status
    
      if (params["active"]) {
        status = "in";
      } else {
        status = "out";
      }
    
      // get yahoo id from email
    
      username = Status.email.split("@")[0];
    
      // date
    
      date = new Date();
      var unixtime = parseInt(date.getTime() / 1000, 10);
    
      // message body
    
      message_body = [];
      message_body.push("Report_Name: Improve Yahoo! Mail");
      message_body.push(username + "\t" + status + "\t" + unixtime);
    
      message_body = message_body.join("\n");
    
      params["body"] = message_body;
    
      YahooRequest.sendMessage(params, function(response) {
        if (callback) {
          try {
            callback(response);
          } catch(wtf) {
            Debug.error(wtf);
            YAHOO.init.showError();
          }
        }
      });
    } catch(omg) {
      Debug.error(omg);
      YAHOO.init.showError();
    }
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