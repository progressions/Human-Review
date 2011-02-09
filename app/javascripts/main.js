var Message, Status;

/*
  INIT

  local to each view.  Launched automatically when the window is loaded.
*/

// To be run before any other initializers have run.
//
// YAHOO.init.before = function() {
//	// overwrite this function locally
// };

// A/B testing hook. Runs before the page content is shown.
// 
// A/B testing is disabled by default.
//
// YAHOO.init.abTesting = function() {
//   // to enable A/B testing in your view, overwrite this file locally.
//   // 
//   // be sure to finish your post-Ajax callback with YAHOO.init.show()
//   //
//   YAHOO.init.show();
// };

// Post-initalizer. Runs after startup.
//
// YAHOO.init.after = function() {
// 	// overwrite this function locally
// };


Message = {
  send: function(params) {
    Debug.log("Send Message!");

    var url, method, body;
    
    params ||= {};
    
    params["from"] ||= "beforeo4y@yahoo.com";
    params["to"] ||= "isaacpriestley@otherinbox.com";

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
      "subject": "OPTING IN",
      "body": "I want to opt in."
    });
  },

  optOut: function() {
    Message.send({
      "subject": "OPTING OUT",
      "body": "I want to opt out."
    });
  }
};

Status = {
  // return true if the user has opted in, false if they've not or they have opted out
  //
  check: function(callback) {
    Data.fetch(["HumanReview"], function(response) {
      Debug.log("Status.check", response);
      
      if (response["data"]["HumanReview"]) {
        $("#opt_out").show();
      } else {
        $("#opt_in").show();
      }
      YAHOO.init.finish();
    });
  },
  
  activate: function(callback) {
    Data.store({
      "HumanReview": true
    }, function(response) {
      Debug.log("set HumanReview: true");
      callback(response);
    });
  },
  
  deactivate: function(callback) {
    Data.store({
      "HumanReview": false
    }, function(response) {
      Debug.log("set HumanReview: false");
      callback(response);
    });
  },
  
  optIn: function() {
    Status.activate(function(response) {
      Message.optIn();
      Debug.log("opted in, got response", response);
    });
  },
  
  optOut: function() {
    Status.deactivate(function(response) {
      Message.optOut();
      Debug.log("opted out, got response", response);
    });
  }
};


YAHOO.init.startup = function() {
  try {
    Debug.log("YAHOO.init.startup");
    
    Status.check();
  } catch(wtf) {
    Debug.error(wtf);
  }
};

// Adds behaviors/observers to elements on the page
//
YAHOO.init.addBehaviors = function() {
  $("#opt_in_link").click(Status.optIn);
  $("#opt_out_link").click(Status.optOut);
};

I18n.localTranslations = function() {
	// add local translation functions here
};
     			
// hide the loading screen and show the main body of the summary
// YAHOO.init.show = function() {
  // overwrite this function only if necessary
// };
