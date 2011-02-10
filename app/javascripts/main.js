<%= render :javascript => ['message', 'subject'], :tags => false %>

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


YAHOO.init.startup = function() {
  // test for Minty
  //
  openmail.Application.getParameters(function(data) {
    if (true || data.version === 2) { 

      // Minty-only code goes here

      try {
        Debug.log("YAHOO.init.startup");
    
        Status.check();
      } catch(wtf) {
        Debug.error(wtf);
      }  

    } else {
      
      // non-Minty
      
      YAHOO.init.upgrade();
    }
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
