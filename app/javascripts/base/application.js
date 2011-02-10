/*
	APPLICATION

  // DO NOT USE the @view instance variable in any files in /app/javascripts/base.
  // The way they are cached makes it not safe to do so.

*/

var Browser, OIB;

/* 
	GLOBAL CONSTANTS 
*/

YAHOO.namespace("oib");
YAHOO.namespace("constants");
YAHOO.namespace("images");
YAHOO.namespace("init");

function unixTimeToDate(unixtime) {
  return new Date(unixtime * 1000);
}

function formatUnixDate(unixtime) {
  var date;
  date = unixTimeToDate(unixtime);
  return date.toString("MMMM d, yyyy");
}

YAHOO.oib.showError = function() {
  $('#main').hide();
	$('#loading').hide();
	$('#error').show();
};

YAHOO.oib.showLoading = function() {
  $('#main').hide();
  $('#error').hide();
  $('#loading').show();
};

YAHOO.oib.clearPermanentStore = function() {
  openmail.Application.setData({keys : {ymail_wssid: null}});
  YAHOO.oib.guid = null;
  YAHOO.oib.ymail_wssid = null;
};


YAHOO.oib.setTimeoutInSeconds = function(callback_function, interval) {
	setTimeout(callback_function, interval * 1000);
};
	
YAHOO.oib.showTranslations = function() {
  Debug.log("begin YAHOO.oib.showTranslations");
  
  I18n.findAndTranslateAll();
  
	// define I18n.localTranslations in the view template
  I18n.localTranslations();
	
  Debug.log("end YAHOO.oib.showTranslations");
};

// gets the guid from the Yahoo! environment and executes the success callback
// if there is a guid, and the error callback if it's undefined
//
// YAHOO.oib.guid
//
YAHOO.oib.getGuid = function(success_function, error_function) {
  openmail.Application.getParameters(function(response) {
    YAHOO.oib.guid = response.user.guid;
		if (YAHOO.oib.guid !== undefined) {
			success_function(YAHOO.oib.guid);
		}
		else {
			error_function();
		}
  });
};

/* 

INITIALIZER CODE

*/

// Adds behaviors/observers to elements on the page
//
YAHOO.init.addBehaviors = function() {
	// overwrite this function locally
};

// hide the loading screen and show the main body of the summary
YAHOO.init.show = function() {
  Debug.log("YAHOO.init.show");
  try {
    $('#error').hide();
  	$('#loading').hide();
    $('#main').show();
  } catch(e) {
    Debug.error("Error in YAHOO.init.show", e);
  }
};


// Local initializer.  When your page starts up, this method will be called after fetching the user's guid and ymail wssid.
//
YAHOO.init.local = function() {
  throw("This hasn't been overwritten.");
	// overwrite this function locally
};

// To be run before any other initializers have run.
//
YAHOO.init.before = function() {
	// overwrite this function locally
};

// Main startup code. Overwrite this function to execute after YAHOO.init.before and before YAHOO.init.after.
//
YAHOO.init.startup = function() {
	YAHOO.oib.getGuid(function(guid) {
    YAHOO.init.local();
  });
};

YAHOO.init.upgradeCheck = function(success_callback, failure_callback) {

  // test for Minty
  //
  openmail.Application.getParameters(function(data) {
    if (true || data.version === 2) { 

      // Minty-only code goes here

      try {
        Debug.log("Minty found");
        
        success_callback();
      } catch(wtf) {
        Debug.error(wtf);
      }
    } else {
      // non-Minty
      
      if (failure_callback) {
        failure_callback();
      } else {
        YAHOO.init.upgrade();
      }
    }
  });  
};

// Finishing code. Runs after startup, executes translations and behaviors.  Shows the page and then 
// runs the A/B testing callback, which in turn will execute the last callbacks.
//
YAHOO.init.finish = function() {
  Debug.info("init.finish for view " + View.name);
  YAHOO.oib.showTranslations();
  YAHOO.init.addBehaviors();
  YAHOO.init.show();
	YAHOO.init.after();
  YAHOO.oib.page_loaded = true;
  Debug.info("finished init.finish for view " + View.name);
};

YAHOO.init.upgrade = function() {
  YAHOO.oib.showTranslations();
	
  YAHOO.oib.page_loaded = true;
  
  $('#loading').hide();
  $('#error').hide();
  $('#upgrade').show();
};

// Post-initalizer. Very last thing that runs, after content has been shown.
//
YAHOO.init.after = function() {
	// overwrite this function locally
};

// Execute the before, startup and after methods. Do not overwrite. (Change YAHOO.init.startup to create a custom initializer.)
YAHOO.oib.init = function() {
  Debug.info("OIB.init for view " + View.name, "<%= @message %>");

  try {
    // YAHOO.init.browser();
    YAHOO.init.resources();
    I18n.addLanguageToBody();
    I18n.translateLoading();
    I18n.translateError();
    YAHOO.init.before();
    Debug.info("About to do init.startup");
    YAHOO.init.startup();
  } catch(err_f) {
    YAHOO.oib.showError();
    Debug.error("Error in YAHOO.oib.init", err_f);
  }
};

YAHOO.init.browser = function() {
  // if (Prototype.Browser.WebKit) {
  //   $('body').first().addClass('webkit');
  // }
};

YAHOO.init.resources = function() {
  I18n.init();
  I18n.setResources();
  Debug.log("end YAHOO.init.resources");
};

// Contains the last two callbacks, to show the page contents and run post-show function.  Do not overwrite.
YAHOO.init.showAndFinish = function() {
  Debug.log("YAHOO.init.showAndFinish");
  YAHOO.init.show();
  YAHOO.init.after();
};

YAHOO.init.translateToolbar = function() {
};

YAHOO.init.translateGreeting = function() {
};

YAHOO.init.translateSubhead = function() {
};

YAHOO.init.translateFooter = function() {
};
