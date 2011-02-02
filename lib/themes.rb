yaml = YAML.load_file("./config/themes.yml")

THEMES = yaml["themes"]
THEMESETS = yaml["sets"]
SOLID_COLORS = yaml["solid_colors"]
DARK_COLORS = yaml["dark_colors"]

all_themes = {}

THEMES.each do |key, values|
  values.each do |value|
    all_themes[value] ||= []
    all_themes[value] << key
  end
end

ALL_THEMES = all_themes


