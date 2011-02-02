var Composer, Themes, ThemeSets, SolidColors;

<%

@themes = {}

ALL_THEMES.keys.each do |theme|
  t = render(:partial => "themes/#{theme}")
  
  @themes[theme] = t.gsub('  ', '').gsub("\n", '').gsub("\"", "'")
end

%>

<%

t = render(:partial => "themes/solid_color")
  
@solid_colors_partial = t.gsub('  ', '').gsub("\n", '').gsub("\"", "'")

%>

SolidColors = {
  dark_colors: <%= DARK_COLORS.to_json %>,
  
  color: function(bgcolor) {
    var partial, fgcolor;
    
    partial = "<%= @solid_colors_partial %>";
    partial = partial.replace("BACKGROUND_COLOR", "#" + bgcolor);
    partial = partial.replace("BACKGROUND_COLOR", "#" + bgcolor);
    partial = partial.replace("BACKGROUND_COLOR", "#" + bgcolor);
    
    partial = partial.replace("BACKGROUND_COLOR", "#" + bgcolor);
    partial = partial.replace("BACKGROUND_COLOR", "#" + bgcolor);
    
    if (SolidColors.dark_colors.include(bgcolor)) {
      fgcolor = "#000000";
    } else {
      fgcolor = "#ffffff";
    }
    
    partial = partial.replace("FOREGROUND_COLOR", fgcolor);
    partial = partial.replace("FOREGROUND_COLOR", fgcolor);
    partial = partial.replace("FOREGROUND_COLOR", fgcolor);
    
    partial = partial.replace("FOREGROUND_COLOR", fgcolor);
    partial = partial.replace("FOREGROUND_COLOR", fgcolor);
    
    return partial;
  }
};

Themes = {
  <% @themes.keys.each do |key| %>
    "<%= key %>": "<%= @themes[key] %>",
  <% end %>
  <% SOLID_COLORS.each do |bgcolor| %>
    "color_<%= bgcolor %>": SolidColors.color("<%= bgcolor %>"),
  <% end %>
  "none" : ""
};

ThemeSets = {
  init: function() {
    $("set_selector").observe("change", ThemeSets.select);
    ThemeSets.select();
  },
  
  select: function() {
    var target, value;
    
    target = $("set_selector");
    value = $F(target);
    
    $$(".container").each(function(element) {
      element = $(element);
      
      // make sure it's not a Liam theme
      if (ThemeSets.liam().include(element.identify())) {
        $(element).hide();
      } else {
        
        // if it's one of the selected set, show it
        if ($(element).hasClassName("set_" + value)) {
          $(element).show();
        } else {
          $(element).hide();
        }
        
      }
    });
  },
  
  liam: function() {
    return $A(["heart_bubbles", "sitting", "birthday", "fetch", "crowd_surfing", "party"]);
  }
};

Composer = {
  select: function(event) {
    var target;
    
    target = event.element();
    
    if (!target.hasClassName("selected")) {
      $$(".selected").each(function(element) {
        $(element).removeClassName("selected");
      });
      target.addClassName("selected");
    } else {
      target.removeClassName("selected");
    }
    Composer.launch();
  },
  
  launch: function() {
    var body;
    Debug.log("Composer.launch");
    try {
      body = Composer.body();
      
      Debug.log("body", body);
      
      openmail.Mail.compose({
        html: true,
        body: body
      });
      
      // close this dialog box
      openmail.Application.closeView(null);
    } catch(omg) {
      Debug.error(omg);
    }
    Debug.log("Just finished Composer.launch");
  },
  
  body: function() {
    try {
      Debug.log("Composer.body");
    
      var m, form, theme, value;
    
      m = "";
      
      value = $$(".selected").first().identify();
    
      m = Themes[value];
      
      m = m.replace(/SAMPLE_TEXT/, I18n.t("SAMPLE_TEXT"));
    
      Debug.log("Composer.body result after", m);
    
      return m;
    } catch(omg) {
      Debug.error(omg);
    }
  }
};