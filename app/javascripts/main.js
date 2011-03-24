var Privacy, FAQ, Labs;

/*
  INIT

  local to each view.  Launched automatically when the window is loaded.
*/

// To be run before any other initializers have run.
//
// YAHOO.init.before = function() {
//	// overwrite this function locally
// };

// Post-initalizer. Runs after startup.
//
// YAHOO.init.after = function() {
// 	// overwrite this function locally
// };

Labs = {
  show: function() {
    $("#privacy").hide();
    $("#faq").hide();
    $("#opt_in").show();
    $("#opt_out").hide();
  }
};

Privacy = {
  show: function() {
    $("#privacy").show();
    $("#faq").hide();
    $("#opt_in").hide();
    $("#opt_out").hide();
  }
};

FAQ = {
  show: function() {
    $("#faq").show();
    $("#privacy").hide();
    $("#opt_in").hide();
    $("#opt_out").hide();
  }
};


YAHOO.init.local = function() {
  Debug.log("YAHOO.init.local", "<%= @message %>");
  YAHOO.init.upgradeCheck(function() {
    YahooRequest.getUserSendPref(Status.check);
  });
};

// Adds behaviors/observers to elements on the page
//
YAHOO.init.addBehaviors = function() {
  $("#opt_in_link").click(Status.optIn);
  $("#opt_out_link").click(Status.optOutAndRemove);
  $("#no_thanks").click(Status.close);
  $("#launch_privacy").click(Privacy.show);
  $("#launch_faq").click(FAQ.show);
  $("#launch_labs").click(Labs.show);
};

I18n.localTranslations = function() {
	// add local translation functions here
};
     			
// hide the loading screen and show the main body of the summary
// YAHOO.init.show = function() {
  // overwrite this function only if necessary
// };
