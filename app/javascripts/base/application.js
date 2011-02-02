/*
	APPLICATION

  // DO NOT USE the @view instance variable in any files in /app/javascripts/base.
  // The way they are cached makes it not safe to do so.

*/

var Browser, Data, OIB;

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

/*
	  CALL OIB

	  global to every view.  sends Ajax call to OtherInbox.
*/

	// send an Ajax call to OtherInbox.
	// takes as parameters:
	// - the path to call
	// - any additional query string params
	// - a callback function to run when the Ajax call is a success
	// - an optional error function
	// - a base URL to use, if you don't want this call going to YAHOO.constants.base_url
	// TODO refactor this function to take a second params hash where we could stick success_function, error_function, and base_url

	YAHOO.oib.callOIB = function(oib_path, params, success_function, error_function, base_url) {
    //    Debug.log("inside YAHOO.oib.call: ", {
    //      "oib_path": oib_path,
    //      "params": Object.toJSON(params)
    //    });
    //    var oib_url, method;
    //    
    //    oib_url = base_url ? base_url : YAHOO.constants.base_url;
    //    
    //    if (!(oib_path && typeof(oib_path) === "string")) {
    //      throw("YAHOO.oib.callOIB must define oib_path");
    //    }
    //    if (!(params && typeof(params) === "object")) {
    //      throw("YAHOO.oib.callOIB must define params");
    //    }
    //    
    //    oib_url = oib_url + oib_path;
    //    method = "GET";
    //    if (!params.format) {
    //      params.format = 'json';
    //    }
    //    if (params.method) {
    //      method = params.method;
    //      delete params.method;
    //    }
    //    params.version = params.version || <%= @version %>;
    // Try.these(function() {
    //   Debug.log("About to call openmail.Application.callWebService: ", {
    //     "method": method,
    //     "url": oib_url + "?" + Object.toQueryString(params)
    //   });
    //  openmail.Application.callWebService(
    //  {
    //    url: oib_url,
    //    method: method,
    //    parameters: params
    //  },
    //  function(response) {
    //    // response from Ajax call was a 200 response
    //    //
    //    Debug.log("inside response from openMail.Application.callWebService", response);
    //    if (response.error) {
    //      // response has a parameter called "error"
    //      //
    //      Debug.ajaxError("Error in YAHOO.oib.callOIB", oib_url, params, response);
    //      if (error_function) {
    //        error_function(response);
    //      } else {
    //             OIB.error(oib_url, params, response);
    //           }
    //    } else {
    //      // SUCCESSFUL RESPONSE
    //      //
    //      // response doesn't have a parameter called "error"
    //      // 
    //      Debug.log("success response inside openMail.Application.callWebService", response);
    //      try {
    //        success_function(response);
    //      } catch(e) {
    //        Debug.log("Error in YAHOO.oib.callOIB success function", e);
    //        YAHOO.oib.showError();
    //      }
    //    }
    //  });
    // });
	};


OIB = {
  // get: function(oib_path, params, success_function, error_function, base_url) {
  //  params.method = "GET";
  //  OIB.call(oib_path, params, success_function, error_function, base_url);
  // },
  // 
  // post: function(oib_path, params, success_function, error_function, base_url) {
  //  params.method = "POST";
  //  OIB.call(oib_path, params, success_function, error_function, base_url);
  // },
  // 
  // call: function(oib_path, params, success_function, error_function, base_url) {
  //   var success;
  //   
  //   success = function(response) {
  //       response = YAHOO.lang.JSON.parse(response.data);
  //       if (response.error) {
  //         if (error_function) {
  //           error_function(response);
  //         } else {
  //           Debug.error("No error_function", response);
  //           YAHOO.oib.showError();
  //         }
  //       } else {
  //         if (success_function) {
  //           success_function(response); 
  //         } else {
  //           Debug.error("no success function", response);
  //           YAHOO.oib.showError();
  //         }
  //       }
  //     };
  //   YAHOO.oib.callOIB(oib_path, params, success, error_function, base_url);
  // },
  // 
  //   // overwrite this function locally if you need to
  // error: function(url, params, response) {
  //   var message;
  //   
  //   message = "OIB.error: " + Object.toJSON(response) + " calling url: " + url + "?" + Object.toQueryString(params);
  //   Debug.error(message);
  // }
};


YAHOO.oib.showError = function() {
  $('main').hide();
	$('loading').hide();
	$('error').show();
};

YAHOO.oib.showLoading = function() {
  $('main').hide();
  $('error').hide();
  $('loading').show();
};

// gets the guid from the Yahoo! environment and executes the success callback
// if there is a guid, and the error callback if it's undefined
//
// YAHOO.oib.guid
//
YAHOO.oib.getGuid = function(success_function, error_function) {
  // openmail.Application.getParameters(function(response) {
  //   YAHOO.oib.guid = response.user.guid;
  //   try {
  //     Debug.log("YAHOO.oib.getGuid getParameters response", response);
  //     
  //     var params = {};
  //     if (response.data) {
  //       params = response.data.launchParams;
  //     }
  //     Params.init(params);
  //   } catch(omg) {
  //     Debug.error("error getting parameters: " + omg);
  //   }
  //    if (YAHOO.oib.guid !== undefined) {
  //    Try.these(
  //        function() { success_function(YAHOO.oib.guid); }
  //      );
  //    }
  //    else {
  //      Try.these(error_function);
  //    }
  // });
};


// gets the ymail_wssid from the permanent store and executes the callback function
// if there is a ymail_wssid, and the error callback if it's undefined
//
// YAHOO.oib.ymail_wssid
//
YAHOO.oib.getYmailWssid = function(success_function, error_function) {
  // openmail.Application.getData({keys: ["ymail_wssid"]}, function(response) {
  //  Debug.log("YAHOO.oib.getYmailWssid", response);
  //    YAHOO.oib.ymail_wssid = response.data.ymail_wssid;
  //  if (YAHOO.oib.ymail_wssid !== undefined) {
  //    Debug.log("YAHOO.oib.ymail_wssid", YAHOO.oib.ymail_wssid);
  //    Try.these(
  //      function() { success_function(YAHOO.oib.ymail_wssid); }
  //    );
  //  }
  //  else {
  //    Debug.log("Error in YAHOO.oib.getYmailWssid", response);
  //    Try.these(error_function);
  //  }
  // });
};


// gets both guid and ymail_wssid and stores them then runs the callback_function
//
// YAHOO.oib.ymail_wssid
// YAHOO.oib.guid
//
YAHOO.oib.getGuidAndYmailWssid = function(callback_function) {
  // YAHOO.oib.getGuid(function(guid) {
  //  YAHOO.oib.getYmailWssid(function(ymail_wssid) {
  //    callback_function(guid, ymail_wssid);
  //  });
  // });
};

// gets user's state info from /ymdp/state
// including the user's OIB login
//
YAHOO.oib.getUserState = function(success_function) {
  // OIB.get("ymdp/state", {}, function(response) {
  //   YAHOO.oib.response = response;
  //   YAHOO.oib.login = response.login;
  //   YAHOO.oib.state = response.state;
  // 
  //   if (success_function !== undefined) {
  //     success_function(response);
  //   }
  // },
  // function() {
  //   YAHOO.logger.error("Failed to get user's state");
  // });
};



/*
	  YAHOO.oib.verifyUser

	  global to all views.  calls the 'verify' action on ymdp controller and executes
	  a function with the result.
*/
YAHOO.oib.verifyUser = function(success_function, error_function) {
  // OIB.get("ymdp/verify", {
  //   ymail_guid: YAHOO.oib.guid,
  //   ymail_wssid: YAHOO.oib.ymail_wssid
  // }, function(response) {
  //    YAHOO.oib.user = response;
  //    Debug.log("YAHOO.oib.verifyUser YAHOO.oib.user", YAHOO.oib.user);
  //    if (success_function) {
  //      success_function(YAHOO.oib.user);
  //    }
  // }, error_function);
};


/*
		AUTHENTICATION
*/

YAHOO.oib.signInUser = function() {
  //   Debug.log("YAHOO.oib.signInUser");
  // OIB.get("ymdp/signin", {}, function(response) {  
  //   Debug.log("inside ymdp/signin callback", response);
  //   Debug.log("YAHOO.oib.response", YAHOO.oib.response);
  //     if (response.ymail_wssid === "false") {
  //       // signin didn't work properly, display an error
  //       Debug.warn("YAHOO.oib.response was false");
  //       YAHOO.oib.showError();
  //     } else {
  //       Debug.log("YAHOO.oib.response wasn't false");
  //       // store ymail_wssid in permanent store
  //       
  //       var raw_wssid = response.ymail_wssid || "";
  //       var sliced_wssid = raw_wssid.slice(0, 255);
  //       
  //       var data = {
  //         "keys": {
  //           "ymail_wssid": sliced_wssid
  //         }
  //       };
  //       
  //       Debug.log("About to call openmail.Application.setData", data);
  //       
  //       openmail.Application.setData(data, function(response) {
  //         Debug.log("openmail.Application.setData response", response);
  //       });
  //       YAHOO.oib.ymail_wssid = response.ymail_wssid;
  //   
  //       YAHOO.oib.verifyUser(YAHOO.launcher.launchFolders);
  //     }
  // });
};

YAHOO.oib.clearPermanentStore = function() {
  openmail.Application.setData({keys : {ymail_wssid: null}});
  YAHOO.oib.guid = null;
  YAHOO.oib.ymail_wssid = null;
};


Data = {
  // // values cannot be longer than 255 chars
  // //
  // store: function(data, success_function, error_function) {
  //   Debug.log("Data.store", data);
  //   
  //   var keys = {
  //     "keys": data
  //   };
  //   openmail.Application.setData(keys, function(response) {
  //     if (response.error && (response.error !== YAHOO.openmail.ERR_NONE)) {
  //       // storage error detected
  //       Debug.error("Error saving data", response);
  //       if (error_function) {
  //         error_function(response);
  //       }
  //     } else {
  //       if (success_function) {
  //         success_function(response);
  //       }
  //     }
  //   });
  // },
  // 
  // // keys must be an array
  // //
  // fetch: function(keys, success_function, error_function) {
  //   Debug.log("Data.fetch", keys);
  //   
  //   keys = {
  //     "keys": keys
  //   };
  //   
  //   openmail.Application.getData(keys, function(response) {
  //     try {
  //       Debug.log("Inside openmail.Application.getData callback", response);
  //     
  //       if (response.error && (response.error !== YAHOO.openmail.ERR_NONE)) {
  //         Debug.error("Error retrieving data", response);
  //         if (error_function) {
  //           error_function(response);
  //         }
  //       } else {
  //         Debug.log("success in openmail.Application.getData", response);
  //         if (success_function) {
  //           success_function(response);
  //         }
  //       }
  //     } catch(omg) {
  //       Debug.error(omg);
  //     }
  //   });
  // },
  // 
  // clear: function() {
  //   Data.store({
  //     "ymail_wssid": null
  //   }, function(response) {
  //     YAHOO.oib.guid = null;
  //     YAHOO.oib.ymail_wssid = null;      
  //   });
  // }
};


YAHOO.oib.setTimeoutInSeconds = function(callback_function, interval) {
	setTimeout(callback_function, interval * 1000);
};
	
YAHOO.oib.showTranslations = function() {
  Debug.log("begin YAHOO.oib.showTranslations");
  
  Try.these(I18n.findAndTranslateAll);
  
	// define I18n.localTranslations in the view template
	Try.these(I18n.localTranslations);
	
  Debug.log("end YAHOO.oib.showTranslations");
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
    $('error').hide();
  	$('loading').hide();
    $('main').show();
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
  //   Debug.log("init.startup");
  // // gets the user
  // YAHOO.oib.getGuid(function(guid) {
  //   try {
  //      Reporter.reportCurrentView(guid);
  //   } catch(omg) {
  //     Debug.error(omg);
  //   }
  //   Debug.log("inside getGuid callback");
  //   YAHOO.oib.getUserState(function(response) {
  //     Debug.log("inside getUserState callback");
  //       Try.these(YAHOO.init.local);
  //   });
  // });
};

YAHOO.init.abTesting = function() {
  // to enable abTesting in your view, overwrite this file locally.
  // 
  // be sure to finish your post-Ajax callback with YAHOO.init.show()
  //
  Try.these(YAHOO.init.show);
	Try.these(YAHOO.init.after);
};

// Finishing code. Runs after startup, executes translations and behaviors.  Shows the page and then 
// runs the A/B testing callback, which in turn will execute the last callbacks.
//
YAHOO.init.finish = function() {
  Debug.info("init.finish for view " + View.name);
	Try.these(YAHOO.oib.showTranslations);
	Try.these(YAHOO.init.addBehaviors);
  Try.these(YAHOO.init.abTesting);
  YAHOO.oib.page_loaded = true;
  Debug.info("finished init.finish for view " + View.name);
};

YAHOO.init.upgrade = function() {
	Try.these(YAHOO.oib.showTranslations);
	
  YAHOO.oib.page_loaded = true;
  
  $('loading').hide();
  $('error').hide();
  $('upgrade').show();  
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
    YAHOO.init.browser();
    YAHOO.init.resources();
    I18n.addLanguageToBody();
    I18n.translateLoading();
    I18n.translateError();
    YAHOO.init.before();
    YAHOO.init.startup();
  } catch(err_f) {
    YAHOO.oib.showError();
    Debug.error("Error in YAHOO.oib.init", err_f);
  }
};

YAHOO.init.browser = function() {
  if (Prototype.Browser.WebKit) {
    $$('body').first().addClassName('webkit');
  }
};

YAHOO.init.resources = function() {
  I18n.init();
  // I18n.setResources();
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
