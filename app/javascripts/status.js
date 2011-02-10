
Status = {
  // return true if the user has opted in, false if they've not or they have opted out
  //
  check: function(callback) {
    Data.fetch(["HumanReview"], function(response) {
      Debug.log("Status.check", response);
      
      Status.show(response["data"]["HumanReview"]);
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
      Status.show(true);
      Debug.log("opted in, got response", response);
    });
  },
  
  optOut: function() {
    Status.deactivate(function(response) {
      Message.optOut();
      Status.show(false);
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
  }
};
