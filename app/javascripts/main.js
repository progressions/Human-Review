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

YAHOO.init.startup = function() {
  Debug.log("YAHOO.init.startup", "<%= @message %>");
  YAHOO.init.upgradeCheck(function() {
    Debug.log("Upgrade check passed");
    YahooRequest.getUserSendPref(Status.check);
  });
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
