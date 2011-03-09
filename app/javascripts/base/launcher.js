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
  Debug.log("launcher.launch", view);
  openmail.Application.getParameters(function(response) {
    Debug.log("Inside getParameters callback", response);
    title = I18n.t("title");
		// don't try to relaunch current tab
		if (response.data === null || response.data.view !== view) {
			openmail.Application.openView(
			{
				id: view, 
				view: view, 
				target: "tab",
				title: title,
				parameters: {
				  view: view
				}
			});
      openmail.Application.closeView(null);
		}
	});
};

YAHOO.launcher.launchTab = function(view, title) {
  Debug.log("launchTab", view);
	YAHOO.launcher.launch(view, title);
};

YAHOO.launcher.l = function(view) {
	view = "launch" + view.capitalize();
	YAHOO.launcher[view]();
};

Launcher = YAHOO.launcher;


Launcher.launchMain = function() {
  Launcher.launchTab("main", "Main");
};

Launcher.launchRemove = function() {
  Launcher.launchTab("remove", "Remove");
};

Launcher.launchPrivacy = function() {
  Debug.log("launching privacy");
  Launcher.launchTab("privacy", "Privacy");
};

Launcher.launchFaq = function() {
  Launcher.launchTab("faq", "Faq");
};
