/*
  LAUNCHING
 
  global to every view.  launches new views and closes the current one.

  // DO NOT USE the @view instance variable in any files in /app/javascripts/base.
  // The way they are cached makes it not safe to do so.

*/

/* set asset version */

var LAUNCHER, Launcher;

LAUNCHER = {
  VERSION: "<%= @hash %>",
  MESSAGE: "<%= @message %>",
  DEPLOYED: <%= Time.now.to_i %>,
  DEPLOYED_STRING: "<%= Time.now.to_s %>"
};

YAHOO.namespace("launcher");


YAHOO.launcher.launch = function(view, title, type) {
  openmail.Application.getParameters(function(response) {
  	title = I18n.t("ORGANIZER");
		// don't try to relaunch current tab
		if (response.data === null || response.data.view !== view) {
			openmail.Application.openView(
			{
				id: view, 
				view: view, 
				target: type, 
				title: title,
				parameters: {
				  launchParams: Params.parameters,
				  view: view
				}
			});
			openmail.Application.closeView(null);
		}
	});
};


YAHOO.launcher.launchTab = function(view, title) {
	YAHOO.launcher.launch(view, title, "tab");
};

// User must be signed in for this page, we'll 
// sign them in if they don't have an OIB cookie
//
YAHOO.launcher.launchActiveTab = function(view, title) {
 YAHOO.launcher.launchView(function() {
   YAHOO.launcher.launchTab(view, title);
  });
};

	
YAHOO.launcher.launchView = function(launch_view) {
  // get Yahoo! user's guid and ymail_wssid
  YAHOO.oib.getGuidAndYmailWssid(function(guid, ymail_wssid) {
	 				
    // call /ymdp/verify and return data about the user
    YAHOO.oib.verifyUser(function(user) {

      YAHOO.oib.login = user.login;
	  
  	  switch(user.state) {
  	    case "scanning":
  	      // formerly known as 'inspect'
          YAHOO.launcher.launchScanning();
          break;
  	    case "summary":
          YAHOO.launcher.launchSummary();
          break;
   	    case "authorized":
  	      // authorized but not yet 'signed in'
           YAHOO.oib.signInUser();
           break;
         case "new_active":
           // no messages processed yet
         case "processing":
           // activated but we have synced fewer than 80% of their messages
  	    case "active":
  	      // active, launch the view this method was intended for
  	      launch_view();
  	      break;
  	    default:
  	      // other
  	      YAHOO.launcher.launchAuthorize();
  	  }
    });
  });
};


YAHOO.launcher.launchHidden = function(view, title) {
	YAHOO.launcher.launch(view, title, "hidden");
};

YAHOO.launcher.l = function(view) {
	view = "launch" + view.capitalize();
	YAHOO.launcher[view]();
};

Launcher = YAHOO.launcher;

