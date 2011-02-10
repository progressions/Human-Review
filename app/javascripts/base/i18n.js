
  // DO NOT USE the @view instance variable in any files in /app/javascripts/base.
  // The way they are cached makes it not safe to do so.

/*
	  I18N
  
	  global to every view.  
	
	  Methods and constants dealing with internationalization.
*/

var I18N, I18n;

/* set asset version */

I18N = {
  VERSION: "<%= @hash %>",
  MESSAGE: "<%= @message %>",
  DEPLOYED: <%= Time.now.to_i %>,
  DEPLOYED_STRING: "<%= Time.now.to_s %>"
};


I18n = {};

I18n.init = function() {
  Debug.log("about to call I18n.init");

  I18n.assets_path = "<%= @assets_path %>/yrb";

  I18n.availableLanguages = <%= supported_languages.to_json %>;

  I18n.currentLanguage = OpenMailIntl.findBestLanguage(I18n.availableLanguages);
  
  I18n.setResources();

  Debug.log("finished calling I18n.init");
};

I18n.Element = {
  translate: function(element) {
    var e, id;
    
    element = $(element);
    
    id = element.attr("id");
    
    e = element.attr("tagName").toLowerCase();
    
    switch(e) {
      case "input":
        I18n.v(id);
        break;
      case "img":
        I18n.src(id);
        break;
      default:
        I18n.u(id);
    }
  }
};

I18n.setResources = function() {
  var scope, asset_path;
  
  scope = "keys";
  
  Debug.log("begin I18n.setResources for language", I18n.currentLanguage);
  try {
	  asset_path = "<%= @assets_directory %>/yrb/";
	  
		I18n[scope] = I18n[scope] || OpenMailIntl.getResources(asset_path, scope, I18n.currentLanguage);
		
	  if (I18n.currentLanguage !== "en-US") {
  		I18n.default_keys = OpenMailIntl.getResources(asset_path, scope, "en-US");
		} else {
		  I18n.default_keys = I18n[scope];
		}
		
	} catch(err) {
	  Debug.error("error in I18n.setResources: " + err);
	}
	I18n.scope = scope;
	
	Debug.log("end I18n.setResources");
};

I18n.english = function() {
  return I18n.currentLanguage.match(/^en/);
};


// I18n.translate(key, [args])
// I18n.t(key, [args])
//
// Using .translate with a single key argument will return the simple translated string for that key
//
// Using a key argument with values after it will insert the values into the placeholders in
// the returned translated string
//
I18n.translate = function(key, args) {
  Debug.log("I18n.translate", {"key": key, "args": args});
  
	key = key.toUpperCase();
	key = key.replace(" ", "_");
	
	Debug.log("changed key", key);
	
	if (args) {
		var m;
		m = I18n.translate_sentence(key, args);
	} else {
	  Debug.log("no args");
	  
		m = I18n.translate_phrase(key);
		
		Debug.log("m", m);
		
		if (!m) {
		  Debug.log("no m");
			m = I18n.default_keys[key];
		}
		
		Debug.log("now m", m);
	}
	return m;
};
I18n.t = I18n.translate;

I18n.translate_phrase = function(key) {
	return I18n["keys"][key];
};

I18n.translate_sentence = function(key, args) {
  return OpenMailIntl.formatMessage(I18n["keys"][key], args, I18n.currentLanguage);
};

// I18n.update(id, scope, key, args)
//
// updates an element with the given _id_ with the
// translation from scope, key and optional args
//
// only updates the element if the translation is not blank
//
I18n.update = function(id, key, args) {
  Debug.log("I18n.update", {"id": id, "key": key, "args": args});
  
  try {
    var message;
    message = I18n.t(key, args);
    
    Debug.log("message", message);
    
    if (message) {
      if (typeof id === "string") {
        Debug.log("id", "#" + id);
      
        $("#" + id).html(message);        
      } else {
        Debug.log("not a string");
        
        $(id).html(message);
      }
    }
  } catch(err) {
    Debug.error("Error in i18n.update: ", {
      id: id,
      key: key,
      args: args
    });
  }
};		

// I18n.u(id, args)
//
// updates an element with a local YRB key of the same name
//
// given an id of "messages" it will look for a YRB key named "MESSAGES"
// within the local scope of the current view, and update the element with
// that translation
//
I18n.u = function(id, args) {
  if (typeof id === "string") {
    var key;
    
    try {
      key = id.toUpperCase();
    
      I18n.update(id, key, args);    
    } catch(omg) {
      Debug.error(omg);
    }
  } else {
    $.each(id, function(i, element) {
      I18n.u(element);
    });
  }
};

		
// I18n.updateValue(id, key, args)
//
// updates an element with the given _id_ with the
// translation from scope, key and optional args
//
// only updates the element if the translation is not blank
//
I18n.updateValue = function(id, key, args) {
  try {
    var message;
    message = I18n.t(key, args);
    if (message) {
      $(id).value = message;
    }    
  } catch(a) {
    Debug.error("Error in i18n.updateValue: ", {
      id: id,
      key: key,
      args: args
    });    
  }
};		

		
// I18n.v(id, args)
//
// updates the value of an element with a local YRB key of the same name
//
// given an id of "messages" it will look for a YRB key named "MESSAGES"
// within the local scope of the current view, and update the element's value with
// that translation
//
I18n.v = function(id, args) {  
  try {
  	id.each(I18n.v);
  } catch(a) {
    try {
      var key;
      key = id.toUpperCase();
      I18n.updateValue(id, key, args);
    } catch(b) {
      Debug.error("Error in i18n.v: ", {
        id: id,
        args: args
      });      
    }
  }
};

I18n.translateError = function() {
  I18n.update('error_1', 'ERROR_1');
  I18n.update('error_2', 'ERROR_2');
  I18n.update('retry', 'RETRY');
};

I18n.translateLoading = function() {
  I18n.update('loading_subhead', 'LOADING_SUBHEAD');
  I18n.update('loading_paragraph_1', 'LOADING_PARAGRAPH_1');
};

I18n.addLanguageToBody = function() {
  Debug.log("I18n.addLanguageToBody");
  try {
    $('body').addClass(I18n.currentLanguage);
  } catch(a) {
    Debug.error(a);
  }
};

I18n.p = function(element) {
  var key;
  
  Debug.log("I18n.p");
  
  element = $(element);
  
  Debug.log("element", element.html());
  
  key = element.html();
  
  Debug.log("key", key);
  
  I18n.update(element, key);
};

I18n.findAndTranslateAll = function() {
  Debug.log("I18n.findAndTranslateAll");
  
	$(".p").each(function(i, element) {
    element = $(element);
    try {
      Debug.log("Translating a p element", element.html());
      I18n.p(element);
    } catch(e) {
      Debug.error("Translation error for element: ", e);
    }      
	});

  $(".t").each(function(i, element) {
    element = $(element);
    try {
      I18n.Element.translate(element);
    } catch(e) {
      Debug.error("Translation error for element: " + e);
    }
  });  
	
	Debug.log("end I18n.findAndTranslateAll");
};

I18n.translateSidebar = function() {
};


