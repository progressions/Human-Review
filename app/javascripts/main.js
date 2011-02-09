var Message, Status, Data;

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
  send: function() {
    Debug.log("Send Message!");

    var url, params, method, body;

    body = {
      "method": "SendMessage",
      "params": [
        {
          "message": {
            "subject": "JSONRPC: Message Testing oldy!",
            "from": {"name": "xjan.doe101", "email":"beforeo4y@yahoo.com"},
            "to": [{"email": "isaacpriestley@otherinbox.com","name": "Joe"}],
            "body": {
              "data": " Hello there!",
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
  }
};

Status = {
  // return true if the user has opted in, false if they've not or they have opted out
  //
  check: function(callback) {
    Data.fetch(["HumanReview"], function(response) {
      Debug.log("Status.check", response);
      
      callback();
    });
  },
  
  activate: function() {
    Data.store({
      "HumanReview": true
    }, function() {
      Debug.log("set HumanReview: true");
    });
  },
  
  deactivate: function() {
    Data.store({
      "HumanReview": false
    }, function() {
      Debug.log("set HumanReview: false");
    });
  }
};


YAHOO.init.startup = function() {
  try {
    Debug.log("YAHOO.init.startup");
    
    Status.check(YAHOO.init.finish);
    
    // YAHOO.init.finish();
  } catch(wtf) {
    Debug.error(wtf);
  }
};

// Adds behaviors/observers to elements on the page
//
YAHOO.init.addBehaviors = function() {
  $("#send_message").click(Message.send);
};

I18n.localTranslations = function() {
	// add local translation functions here
};
     			
// hide the loading screen and show the main body of the summary
// YAHOO.init.show = function() {
  // overwrite this function only if necessary
// };
