describe("Init", function() {
  describe("YAHOO.oib.init", function() {
    xit("should init browser", function() {
      spyOn(YAHOO.init, "browser");
      YAHOO.oib.init();
      expect(YAHOO.init.browser).toHaveBeenCalled();
    });
    
    it("should init resources", function() {
      spyOn(YAHOO.init, "resources");
      YAHOO.oib.init();
      expect(YAHOO.init.resources).toHaveBeenCalled();
    });
    
    it("should add language to body", function() {
      spyOn(I18n, "addLanguageToBody");
      YAHOO.oib.init();
      expect(I18n.addLanguageToBody).toHaveBeenCalled();
    });
    
    it("should call init.before", function() {
      spyOn(YAHOO.init, "before");
      YAHOO.oib.init();
      expect(YAHOO.init.before).toHaveBeenCalled();
    });
    
    it("should call init.startup", function() {
      spyOn(YAHOO.init, "startup");
      YAHOO.oib.init();
      expect(YAHOO.init.startup).toHaveBeenCalled();
    });
    
    xit("should showError", function() {
      spyOn(YAHOO.init, "startup").andThrow("what");
      spyOn(YAHOO.oib, "showError");
      YAHOO.oib.init();
      expect(YAHOO.oib.showError).toHaveBeenCalledWith({ method : 'YAHOO.oib.init', description : 'exception caught in YAHOO.oib.init', error : 'what' });
    });
  });
  
  describe("YAHOO.init.resources", function() {
    it("should set availableLanguages", function() {
      YAHOO.init.resources();
      expect(I18n.availableLanguages).toEqual([ 'en-US', 'da-DK', 'de-DE', 'en-AA', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-MY', 'en-NZ', 'en-PH', 'en-SG', 'es-AR', 'es-ES', 'es-MX', 'es-US', 'fr-CA', 'fr-FR', 'id-ID', 'it-IT', 'ja-JP', 'ko-KR', 'nb-NO', 'pt-BR', 'ru-RU', 'sv-SE', 'th-TH', 'vi-VN', 'zh-Hans-CN', 'zh-Hant-HK', 'zh-Hant-TW' ]);
    });
    
    it("should set currentLanguage", function() {
      YAHOO.init.resources();
      expect(I18n.currentLanguage).toEqual("en-US");
    });
    
    it("should run setResources", function() {
      spyOn(I18n, "setResources");
      YAHOO.init.resources();
      expect(I18n.setResources).toHaveBeenCalled();
    });
  });
  
  describe("YAHOO.init.showAndFinish", function() {
    it("should call YAHOO.init.show", function() {
      spyOn(YAHOO.init, "show");
      YAHOO.init.showAndFinish();
      expect(YAHOO.init.show).toHaveBeenCalled();
    });
    
    it("should call YAHOO.init.after", function() {
      spyOn(YAHOO.init, "after");
      YAHOO.init.showAndFinish();
      expect(YAHOO.init.after).toHaveBeenCalled();
    });
  });
  
  describe("YAHOO.init.show", function() {
    beforeEach(function() {
      $("#specContainer").append("<div id='error'>Error</div>");
      $("#specContainer").append("<div id='loading'>Loading</div>");
      $("#specContainer").append("<div id='main' style='display: none;'>Main</div>");
    });
    
    it("should hide error", function() {
      YAHOO.init.show();
      expect($("#error").is(":visible")).toBeFalsy();
    });
    
    it("should hide loading", function() {
      YAHOO.init.show();
      expect($("#loading").is(":visible")).toBeFalsy();
    });
    
    it("should show main", function() {
      YAHOO.init.show();
      expect($("#main").is(":visible")).toBeTruthy();
    });
  });
  
  describe("YAHOO.init.startup", function() {
    it("should call YAHOO.init.local", function() {
      spyOn(YAHOO.init, "local");
      YAHOO.init.startup();
      expect(YAHOO.init.local).toHaveBeenCalled();
    });
    
    xit("should showError in case of exception", function() {
      spyOn(YAHOO.init, "local").andThrow("omg");
      spyOn(YAHOO.oib, "showError");
      YAHOO.init.startup();
      expect(YAHOO.oib.showError).toHaveBeenCalledWith({ method : 'YAHOO.init.startup', description : 'exception caught in YAHOO.init.local', error : 'omg' });
    });
  });
  
  describe("YAHOO.init.finish", function() {
    beforeEach(function() {
      spyOn(YAHOO.oib, "showTranslations");
      spyOn(YAHOO.init, "addBehaviors");
    });
    
    it("should call YAHOO.oib.showTranslations", function() {
      YAHOO.init.finish();
      expect(YAHOO.oib.showTranslations).toHaveBeenCalled();
    });
    
    it("should call YAHOO.init.addBehaviors", function() {
      YAHOO.init.finish();
      expect(YAHOO.init.addBehaviors).toHaveBeenCalled();
    });
    
    it("should set YAHOO.oib.page_loaded", function() {
      YAHOO.oib.page_loaded = null;
      YAHOO.init.finish();
      expect(YAHOO.oib.page_loaded).toBeTruthy();
    });
  });
});
