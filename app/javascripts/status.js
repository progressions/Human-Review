Status = {
  // return true if the user has opted in, false if they've not or they have opted out
  //
  check: function(response) {
    Status.email = response["defaultFromAddress"];
    Debug.log("Saved user email", Status.email);
    
    Data.fetch(["HumanReview"], function(status) {
      Debug.log("Status.check", status);
      
      Status.show(status["data"]["HumanReview"]);
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
      Status.thank(true);
      Debug.log("opted in, got response", response);
    });
  },
  
  optOut: function() {
    Status.deactivate(function(response) {
      Message.optOut();
      Status.thank(false);
      Debug.log("opted out, got response", response);
    });
  },
  
  show: function(active) {
    if (active) {
      $("#opt_in").hide();
      $("#opt_out").show();
    } else {
      $("#opt_in").show();
      $("#opt_out").hide();
    }
  },
  
  thank: function(active) {
    $("#opt_in").hide();
    $("#opt_out").hide();
    if (active) {
      $("#thank_you_opt_in").show();
    } else {
      $("#thank_you_opt_out").show();
    }
  }
};
