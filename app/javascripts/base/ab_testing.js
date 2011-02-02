
  // DO NOT USE the @view instance variable in any files in /app/javascripts/base.
  // The way they are cached makes it not safe to do so.

var ABTesting;

ABTesting = {
  on: true,
  languages: <%= english_languages.to_json %>,
  
  enable: function() {
    ABTesting.on = true;
  },
  
  disable: function() {
    ABTesting.on = false;
  },
  
  randomAB: function() {
    return Math.floor(Math.random()*2) ? "a" : "b";
  },
  
  get: function(index, content_id, success_function, error_function) {
    Debug.log("ABTesting.get", $A(arguments));
    var url, host;
    
    url = ABTesting.url + index + ".json";
    host = ABTesting.host;
    
    OIB.get(url, {}, function(response) {
      success_function(content_id, response);
    }, function(response) {
      error_function(response);
    }, host);
  },
  
  post: function(params) {
    params = params || {};
    OIB.post("ymdp/view", params, function(response) {
      Debug.log("ABTesting.post success", response);
    }, function(response) {
      Debug.error("ABTesting.post error", response);
    });
  },
  
  postView: function(experimentId) {
    var params;
    
    params = {
      "var": ABTesting.variable
    };
    if (experimentId) {
      params["experiment_id"] = experimentId;
    }
    Debug.log("ABTesting.postView: ", params);
    ABTesting.post(params);
  },
  
  setVariable: function(value) {
    ABTesting.variable = value;
  },
 
  fetchBodyContents: function(content_id, language) {
    try {
      Debug.log("ABTesting.fetchBodyContents", $A(arguments));
      if (ABTesting.on && ABTesting.languages.include(language)) {
        var index;
      
        index = ABTesting.randomAB();
        ABTesting.setVariable(index);
      
        ABTesting.get(index, content_id, ABTesting.fetchBodyContentsSuccess, ABTesting.fetchBodyContentsError);
      } else {
        YAHOO.init.showAndFinish();
      }
    }
    catch(e) {
      Debug.log(e);
      YAHOO.init.showAndFinish();
    }
  },
 
  fetchBodyContentsError: function(data) {
    Debug.log("fetchBodyContentsError");
    if (data.error !== 3002) {
      YAHOO.logger.error("Received body contents fetch error on page " + View.name + ": " + data.error + ' - ' + data.errorMsg);
    }
    YAHOO.init.showAndFinish();
  },
 
  fetchBodyContentsSuccess: function(content_id, response) {
    try {
      var content, experimentId;
      Debug.log("fetchBodyContentsSuccess");
      
      content = response.content;
      experimentId = response.experimentId;
      
      ABTesting.postView(experimentId);
      ABTesting.replaceContents(content_id, content);
      YAHOO.init.showAndFinish();
    } catch(e) {
      Debug.log("fetchBodyContentsSuccess error" + e);
    }
  },
  
  replaceContents: function(content_id, content) {
    if (content && content !== '') {
      try {
        $(content_id).update(content);
      } catch(err) {
        YAHOO.logger.error(err);
      }
    }    
  }
};

