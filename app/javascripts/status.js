Status = {
  // return true if the user has opted in, false if they've not or they have opted out
  //
  check: function(response) {
    Debug.log("Status.check", response);
    
    Status.email = response["defaultFromAddress"];
    Debug.log("Saved user email", Status.email);
    
    Data.fetch(["HumanReview", "HumanReviewDate"], function(status) {
      Debug.log("Status.check", status);
      
      Status.show(status["data"]);
      YAHOO.init.finish();
    });
  },
  
  activate: function(callback) {
    var date = new Date();
    
    Data.store({
      "HumanReview": true,
      "HumanReviewDate": date
    }, function(response) {
      Debug.log("set HumanReview: true");
      callback(response);
    });
  },
  
  deactivate: function(callback) {
    Data.store({
      "HumanReview": false,
      "HumanReviewDate": null
    }, function(response) {
      Debug.log("set HumanReview: false");
      callback(response);
    });
  },
  
  optIn: function() {
    Status.activate(function(response) {
      Message.optIn(function() {
        Status.thank(true);
        Debug.log("opted in, got response", response);        
      });
    });
  },
  
  optOut: function(callback) {
    Status.deactivate(function(response) {
      Message.optOut(function() {
        Status.thank(false);
        Debug.log("opted out, got response", response);
        if (callback) {
          callback();
        }
      });
    });
  },
  
  optOutAndRemove: function() {
    Status.optOut(Status.remove);
  },
  
  remove: function() {
    Debug.log("Status.remove");
    openmail.Application.callWebService({
      url: "apps://",
      method: "GET",
      parameters: {
        cmd: "uninstallApp",
        args: {"appId": "<%= @server['application_id'] %>"}
      }
    }, function(args) {
      if (args.error) {
        Debug.error("Error in Status.remove", args);
        //failed
      } else {
        Debug.log("Success in Status.remove", args);
        //success
      }
    });    
  },
  
  show: function(status) {
    var active, date;
    
    active = status["HumanReview"];
    date = status["HumanReviewDate"];
    
    if (active) {
      $("#opt_in").hide();
      $("#opt_out").show();
      
      Debug.log("About to set format of date", typeof(date));
      try {
        // mm/dd/yyy, hh:mm:ss AM/PM
        var new_date = new Date(date);
        Debug.log("typeof new date", typeof(new_date));
        
        date = new_date.format("mm/dd/yy, hh:mm:ss TT");
        Debug.log("set format of date", date);
      } catch(omg) {
        Debug.log(omg);
        date = date.toString();
      }
      
      $("#human_review_date").html(date);
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
  },
  
  close: function() {
    openmail.Application.closeView(null);
  }
};
