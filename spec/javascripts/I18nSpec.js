describe("I18n", function() {
  beforeEach(function() {
    I18n.keys = keys;
  });
  
  it("should return a translation", function() {
    expect(I18n.t("THEME_GREEN_FANTASIA")).toEqual("Green Fantasia");
  });
  
  it("should translate an element from its id", function() {
    $("#specContainer").append("<p id='theme_green_fantasia'>what</p>");
    I18n.u("theme_green_fantasia");
    expect($("#theme_green_fantasia").html()).toEqual("Green Fantasia");
  });
  
  it("should translate all elements with class 't'", function() {
    $("#specContainer").append("<p id='theme_green_fantasia' class='t'>what</p>");
    $("#specContainer").append("<p id='theme_its_a_boy' class='t'>what</p>");
    I18n.findAndTranslateAll();
    expect($("#theme_green_fantasia").html()).toEqual("Green Fantasia");
    expect($("#theme_its_a_boy").html()).toEqual("It's a Boy!");
  });
  
  it("should translate all elements with class 'p'", function() {
    $("#specContainer").append("<p class='p green'>theme_green_fantasia</p>");
    $("#specContainer").append("<p class='p boy'>theme_its_a_boy</p>");
    I18n.findAndTranslateAll();
    expect($(".green").html()).toEqual("Green Fantasia");
    expect($(".boy").html()).toEqual("It's a Boy!");
  });  
});