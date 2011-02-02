// DO NOT USE the @view instance variable in any files in /app/javascripts/base.
// The way they are cached makes it not safe to do so.

var Reporter;

// Reports pageviews to OIB for tracking counts of each pageview.
//
// The main interface to this class is located in "header.js" where it can
// make use of the current view name.
//
// == Usage
//
//   Reporter.reportCurrentView(guid);
//
Reporter = {
  // Report the Ymail guid and page view name to OIB.
  //
  report: function(guid, view) {
    Debug.info("Reporting guid " + guid + ", view " + view);
    Reporter.post({
      "ymail_guid": guid,
      "view": view
    });
  },
  
  // Post data back to OIB, to the URL /ymdp/report.
  //
  post: function(params) {
    params = params || {};
    OIB.post("ymdp/report", params, function(response) {
      Debug.log("Reported page view", params);
    }, function(response) {
      Debug.error("Error reporting page view with params", response);
    });
  },
  
  reportCurrentView: function(guid) {
    Reporter.report(guid, View.name);
  }
};