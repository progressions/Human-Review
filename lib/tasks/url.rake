require "ymdp/view/application_view"
require "pp"
require 'net/http'
    
require 'yaml'
require 'yaml/encoding'


namespace :remote_urls do 
  task :list do
    @total_urls = []
    Dir["./app/views/themes/*.html.erb"].each do |path|
      @total_urls << remote_urls(path)
    end
    @total_urls.flatten!
  
    @total_urls.sort!
  end
  
  task :check => :list do
    @output_urls = []
    @total_urls.each do |filename|
      url = "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/#{filename}"
      @output_urls << url
    end
    
    File.open("./urls.html", "w") do |f|
      @output_urls.each do |url|
        f.write("<img src='#{url}' />")
      end
    end
  end
  
  task :missing do
    @missing = ["http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/bike_br.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/chinesenewyear_br.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/chinesenewyear_tl.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/heartplant_tc.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/joynprosperity_bc.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/joynprosperity_tc.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/nightatbay_br.jpg", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/nightatbay_rt.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/omgitsaboy_br.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/omgitsaboy_tl.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/omgitsagirl_br.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/omgitsagirl_tl.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/onceuponatime_lt.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/onceuponatime_tl.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/travel_lt.jpg", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/valentinesday-blue_br.jpg", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/valentinesday-blue_tl.jpg", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/vote_br.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/vote_tl.gif", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/oldletter_bc.jpg", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/themes/treasuremap_bc.jpg"]
    
    File.open("./images.html", "w") do |f|
      @missing.each do |original_path|
        filename = original_path.split("/").last
        static_filename = "http://mail.yimg.com/a/a/stationery/static/#{filename}"
        sponsored_filename = "http://mail.yimg.com/a/a/stationery/sponsored/#{filename}"
        
        f.write("<img src='#{static_filename}' onerror='what(this)' />")
        f.write("<img src='#{sponsored_filename}' onerror='what(this)' />")
      end
    end
  end
  
  task :download do
    @working_images = ["http://mail.yimg.com/a/a/stationery/static/bike_br.gif", "http://mail.yimg.com/a/a/stationery/sponsored/chinesenewyear_br.gif", "http://mail.yimg.com/a/a/stationery/sponsored/chinesenewyear_tl.gif", "http://mail.yimg.com/a/a/stationery/sponsored/heartplant_tc.gif", "http://mail.yimg.com/a/a/stationery/sponsored/joynprosperity_bc.gif", "http://mail.yimg.com/a/a/stationery/sponsored/joynprosperity_tc.gif", "http://mail.yimg.com/a/a/stationery/sponsored/nightatbay_br.jpg", "http://mail.yimg.com/a/a/stationery/sponsored/nightatbay_rt.gif", "http://mail.yimg.com/a/a/stationery/sponsored/omgitsaboy_br.gif", "http://mail.yimg.com/a/a/stationery/sponsored/omgitsaboy_tl.gif", "http://mail.yimg.com/a/a/stationery/sponsored/omgitsagirl_br.gif", "http://mail.yimg.com/a/a/stationery/sponsored/omgitsagirl_tl.gif", "http://mail.yimg.com/a/a/stationery/sponsored/onceuponatime_lt.gif", "http://mail.yimg.com/a/a/stationery/sponsored/onceuponatime_tl.gif", "http://mail.yimg.com/a/a/stationery/sponsored/travel_lt.jpg", "http://mail.yimg.com/a/a/stationery/sponsored/valentinesday-blue_br.jpg", "http://mail.yimg.com/a/a/stationery/sponsored/valentinesday-blue_tl.jpg", "http://mail.yimg.com/a/a/stationery/sponsored/vote_br.gif", "http://mail.yimg.com/a/a/stationery/sponsored/vote_tl.gif", "http://mail.yimg.com/a/a/stationery/static/oldletter_bc.jpg", "http://mail.yimg.com/a/a/stationery/static/treasuremap_bc.jpg"]
        
    @working_images.each do |image_path|
      image_filename = image_path.split("/").last
      destination = "./app/assets/images/themes/#{image_filename}"
      
      puts "Fetching #{image_path} to #{destination}"

      Net::HTTP.start("mail.yimg.com") do |http|
        resp = http.get("/a/a/stationery/static/#{image_filename}")
        open(destination, "wb") do |file|
          file.write(resp.body)
        end
      end
    end
  end
end


@locales = {"aa" => "en-AA",
"ar" => "es-AR",
"au" => "en-AU",
"br" => "pt-BR",
"ca" => "en-CA",
"cf" => "fr-CA",
"cl" => "es-CL",
"cn" => "zh-Hans-CN",
"co" => "es-CO",
"de" => "de-DE",
"dk" => "da-DK",
"e1" => "es-US",
"es" => "es-ES",
"fr" => "fr-FR",
"hk" => "zh-Hant-HK",
"cn" => "zh-Hant-CN",
"in" => "en-IN",
"it" => "it-IT",
"jp" => "ja-JP",
"kr" => "ko-KR",
"mx" => "es-MX",
"my" => "en-MY",
"nl" => "nl-NL",
"no" => "nb-NO",
"nz" => "en-NZ",
"pe" => "es-PE",
"ph" => "en-PH",
"pl" => "pl-PL",
"ru" => "ru-RU",
"se" => "sv-SE",
"sg" => "en-SG",
"th" => "th-TH",
"tr" => "tr-TR",
"tw" => "zh-Hant-TW",
"uk" => "en-GB",
"us" => "en-US",
"ve" => "es-VE",
"vn" => "vi-VN",
"id" => "id-ID"}

task :write_categories do
  require 'set_names.rb'
  
  @key_names = {"SPS" => "Sports", "ST" => "Featured", "NAT" => "Nature", "FLS" => "Flowers", "EVS" => "HOLIDAYSEVENTS", "SCS" => "Solid_Colors", "PTS" => "Patterns", "ANS" => "Animals", "AS" => "Abstract", "FUN" => "Fun"}
  
  @locales.each do |key, lang_code|
    values = @set_names[key]
    
    if values
      filename = "./app/assets/yrb/#{lang_code}/categories_#{lang_code}.pres"
      puts "Writing to #{filename} ..."
      
      File.open(filename, "w") do |f|
        values.each do |id, name|
          real_id = @key_names[id].upcase
          output = "SET_#{real_id}=#{name}\n"
          puts output
          f.write(output)
        end
      end
    end
  end
end

task :make do
  require 'new_sets_2.rb'
  
  @sets.each do |lang, categories|
    l = lang.split("_").first
    
    lang_code = @locales[l]
    
    if lang_code
      @used_keys = []
      
      dir = "./app/assets/yrb/#{lang_code}"
      FileUtils.mkdir(dir) unless File.exists?(dir)
      filename = "#{dir}/stationery_#{lang_code}.pres"
      File.open(filename, "w") do |f|
        puts "Writing #{filename} ..."
        categories.each do |category_name, keys|
          keys.each do |key, value|
            if key.present? && !@used_keys.include?(key)
              s = "THEME_#{key.upcase}=#{value}\n"
              puts s
              f.write(s)
              @used_keys << key
            end
          end
        end
      end
    end
  end
end

task :w do
  require 'output'
  
  @keys = {}
  
  @sets.each do |lang, categories|;
    @keys[lang] = {}
    categories.each do |category_name, keys|
      keys.each do |key, value|
        if value.present?
          @keys[lang][key] = value
        end
      end
    end
  end
  
  pp @keys
end


namespace :images do
  desc "Fetch images that don't exist yet"
  task :fetch => :list do 
    @images.each do |image_path|
      unless File.exists?("./app/assets/#{image_path}")
        image_filename = image_path.split("/").last
        destination = "./app/assets/images/themes/#{image_filename}"
      
        puts "Fetching #{image_path} to #{destination}"
      
        Net::HTTP.start("mail.yimg.com") do |http|
          resp = http.get("/a/a/stationery/static/#{image_filename}")
          open(destination, "wb") do |file|
            file.write(resp.body)
          end
        end
      end
    end
  end
  
  namespace :deploy do
    desc "Deploy all images to staging in groups by alphabet"
    task :staging do
      Timer.new.time do
        ("a".."z").to_a.each do |letter|
          system "bundle exec rake deploy:images path=themes/#{letter}*"
        end
      end
    end
    
    desc "Deploy all images to production in groups by alphabet"
    task :production do
      Timer.new.time do
        ("a".."z").to_a.each do |letter|
          puts letter
          puts `bundle exec rake deploy:production:images path=themes/#{letter}*`
        end
      end
    end
  end
  
  desc "Upload some images"
  task :upload do
    @files.each do |file|
      f = file.gsub("http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/images/", "")
      system "be rake deploy:images path=#{f}"
    end
  end
  
  task :list do
    @images = []
    Dir["./app/views/themes/*.html.erb"].each do |file|
      body = File.read(file)
      
      ["gif", "jpg", "png"].each do |ext|
        if body.sub!(/\/([^\"]*)\.#{ext}/, "") 
          @images << "#{$1}.#{ext}"
          if body.sub!(/\/([^\"]*)\.#{ext}/, "")
            @images << "#{$1}.#{ext}"
          end
        end
      end
    end
    
    @images.reject do |image|
      Dir["./app/assets/#{image}"].any?
    end
  end
  
  desc "Make sure all the images exist remotely"
  task :check do        
    # Net::HTTP.start("64cb664q32c1i.yom.mail.yahoo.net") do |http|
    #   Dir["./app/assets/images**/**/*"].each do |file|
    #     if file =~ /(gif|jpg|png)/
    #       f = file.gsub("./app/assets/", "/om/assets/3iob470q36d32_1/")
    #       puts "http://64cb664q32c1i.yom.mail.yahoo.net#{f} ... "
    #       resp = http.get(f)
    #     end
    #   end
    # end

    output = ""
    
    
    # Dir["./app/assets/images**/**/*"].each do |file|
    @files.each do |file|
      if file =~ /(gif|jpg|png)/
        filename = file.split("/").last
        static_filename = "http://mail.yimg.com/a/a/stationery/static/#{filename}"
        sponsored_filename = "http://mail.yimg.com/a/a/stationery/sponsored/#{filename}"
        
        f = file.gsub("./app/assets/", "http://64cb664q32c1i.yom.mail.yahoo.net/om/assets/3iob470q36d32_1/")
        
        output += "<div style='margin-top:10px'><p>#{filename}:</p>"
        output += "<div><img src='#{f}' /></div>"
        
        output += "<div style='margin-top:10px'><p>#{static_filename}:</p>"
        output += "<div><img src='#{static_filename}' /></div>"
        
        output += "<div style='margin-top:10px'><p>#{sponsored_filename}:</p>"
        output += "<div><img src='#{sponsored_filename}' /></div>"
        output += "</div>"
      end
    end
    File.open("./images.html", "w") do |f|
      f.write(output)
    end
  end
end

namespace :sets do
  desc "Convert sets from YML into YRB"
  task :convert do
    @codes = YAML.load_file("stationery.yml")
    
    @new_codes = {}
    
    @codes.each do |lang, categories|
      puts "Processing lang #{lang}"
      @new_codes[lang] ||= {}
      
      categories.each do |category_name, values|
        @new_codes[lang][category_name] ||= {}
        
        values.each do |key, value|
          unless value.blank?
            key = key.downcase.gsub(/\d*/, "").gsub(/-$/, "")
          end
          
          @new_codes[lang][category_name][key] = value
        end
      end
    end
    
    @sets = {}
    @keys = {}
    
    @new_codes.each do |lang, categories|
      # puts "\"#{lang}\": "
      
      @sets[lang] ||= {}
      @keys[lang] ||= {}
      
      categories.each do |name, values|
        # puts "  \"#{name}\": "
        
        values.each do |key, value|
          # puts "    \"#{key}\": \"#{value}\""
          
          @keys[lang][key] ||= value unless value.blank? || value =~ /liam/i
        end
      end
    end
    
    pp @keys
    @keys.each do |lang, keys|
      filename = "./app/assets/yrb/stationery_#{lang}.pres"
      File.open(filename, "w") do |f|
        $stdout.puts "Writing to #{filename}"
      
        keys.each do |key, value|
          f.write "THEME_#{key.upcase}=#{value}\n"
        end
      end
    end
  end
  
  desc "Get stationery theme XML files"
  task :fetch => :environment do
    # "http://web32395.mail.mud.yahoo.com/stationery/xml/it/holidays.xml"
    # @langs = ["us", "de", "aa", "au", "my", "nz", "ph", "sg", "ar", "es", "mx", "fr", "id", "it", "kr", "br", "vn", "cn", "hk", "tw"]
    
    @langs = ["hi", "uk", "ph", "cn", "es", "my", "no", "ru", "kr", "uk_bt", "mx", "fr", "ro", "dk", "in", "cf_rogers", "sg", "id", "aa", "th", "hk", "e1", "jp_test", "br", "cf", "us_sbc", "my-temp", "de", "jp_dev", "jp", "tw", "au", "us_verizon", "us", "vn", "ca_rogers", "it", "ca", "ar", "nz", "se", "jp_prod"]
    
    # @langs = ["ph", "hi"]
    
    @codes = {}
    
    @langs.each do |lang|
      puts
      puts lang
      puts
      
      @codes[lang] ||= {}
      
      Net::HTTP.start("web32395.mail.mud.yahoo.com") do |http|
        puts "Fetching http://web32395.mail.mud.yahoo.com/stationery/xml/#{lang}/stationery.xml"
        resp = http.get("/stationery/xml/#{lang}/stationery.xml")
        
        @xml = Hpricot.parse(resp.body)
        # while !@xml
        #   begin
            @xml = Hpricot.parse(resp.body)
            puts "Parsed response"
        #   rescue StandardError => e
        #     puts "Error"
        #   end
        # end
        
        (@xml/"category").each do |category|
          set_id = (category)['id']
          @codes[lang][set_id] ||= {}
        
          (category/"background").each do |thing|
            id = (thing)['id']
            description = (thing)['desc']
          
            @codes[lang][set_id][id] = description
          end
        end
        
        puts "Fetching http://web32395.mail.mud.yahoo.com/stationery/xml/#{lang}/holidays.xml"
        resp = http.get("/stationery/xml/#{lang}/holidays.xml")
        
        @xml = nil
        
        # while !@xml
        #   begin
            @xml = Hpricot.parse(resp.body)
            puts "Parsed response"
        #   rescue StandardError => e
        #     puts "Error"
        #   end
        # end
        
        set_id = "HOLIDAYS"
        @codes[lang][set_id] ||= {}
        
        (@xml/"background").each do |thing|
          id = (thing)['id']
          description = (thing)['desc']
        
          @codes[lang][set_id][id] = description
        end
      end      
    end
    
    pp @codes
  end

  task :categories => :environment do
    # "http://web32395.mail.mud.yahoo.com/stationery/xml/it/holidays.xml"
    
    @langs = ["hi", "uk", "ph", "cn", "es", "my", "no", "ru", "kr", "uk_bt", "mx", "fr", "ro", "dk", "in", "cf_rogers", "sg", "id", "aa", "th", "hk", "e1", "jp_test", "br", "cf", "us_sbc", "my-temp", "de", "jp_dev", "jp", "tw", "au", "us_verizon", "us", "vn", "ca_rogers", "it", "ca", "ar", "nz", "se", "jp_prod"]
    
    @categories = {}
    
    @langs.each do |lang|
      @categories[lang] ||= {}
      
      puts
      puts lang
      puts
      
      Net::HTTP.start("web32395.mail.mud.yahoo.com") do |http|
        puts "Fetching http://web32395.mail.mud.yahoo.com/stationery/xml/#{lang}/stationery.xml"
        resp = http.get("/stationery/xml/#{lang}/stationery.xml")
        
        @xml = Hpricot.parse(resp.body)
        
        (@xml/"category").each do |category|
          name = (category)['name']
          id = (category)['id']
          @categories[lang][id] = name
        end
        
        puts "Fetching http://web32395.mail.mud.yahoo.com/stationery/xml/#{lang}/holidays.xml"
        resp = http.get("/stationery/xml/#{lang}/holidays.xml")
        
        @xml = nil
        
        @xml = Hpricot.parse(resp.body)
        
        (@xml/"category").each do |category|
          name = (category)['name']
          id = (category)['id']
          @categories[lang][id] = name
        end
      end      
    end
    
    puts
    pp @categories
  end  
end

namespace :urls do
  desc "Make a list of all URLs used in themes"
  task :list do
    puts urls("./app/views/themes/*")
  end
  
  desc "Download all URLs used in themes"
  task :fetch do
    
    urls("./app/views/themes/*").each do |image_path|
      image_filename = image_path.split("/").last
      destination = "./app/assets/images/themes/#{image_filename}"
      
      puts "Fetching #{image_path} to #{destination}"

      Net::HTTP.start("mail.yimg.com") do |http|
        resp = http.get("/a/a/stationery/static/#{image_filename}")
        open(destination, "wb") do |file|
          file.write(resp.body)
        end
      end
    end
  end
  
  desc "Translate remote Yahoo! Mail urls into local asset urls"
  task :translate do
    Dir["./app/views/themes/*"].each do |image_path|
      puts "Translating #{image_path}..."
      original = File.read(image_path)
      
      original.gsub!("http://mail.yimg.com/a/a/stationery/static/", "<%= @assets_url %>/images/themes/")
      original.gsub!("http://mail.yimg.com/a/a/stationery/sponsored/", "<%= @assets_url %>/images/themes/")
        
      File.open(image_path, "w") do |f|
        f.write(original)
      end
    end
  end
  
  desc "Convert remote image urls to local asset urls and download the images to the right location"
  task :convert => [:list, :fetch, :translate]
end

namespace :themes do
  desc "List theme partials that don't have SAMPLE_TEXT"
  task :test do
    puts "Files which don't include 'SAMPLE_TEXT'"
    Dir["./app/views/themes/*"].each do |file|
      f = File.read(file)
      unless f =~ /SAMPLE_TEXT/
        puts file
      end
    end
  end
end



namespace :colors do
  task :show do
    File.open("solid_colors.html", "w") do |f|
      SOLID_COLORS.each do |color|
        m = ""
        
        m += "<span style='width: 60px; height: 60px; margin: 2px; background-color: ##{color}; color: white; display: inline-block;'>"
        m += "<p>##{color}</p>"
        m += "</span>"
        
        f.write(m)
      end
      SOLID_COLORS.each do |color|
        m = ""
        
        m += "<span style='width: 60px; height: 60px; margin: 2px; background-color: ##{color}; color: black; display: inline-block'>"
        m += "<p>##{color}</p>"
        m += "</span>"
        
        f.write(m)
      end
    end
  end
  
  task :convert do
    SOLID_COLORS.each do |color|
      
    end
  end
end



def urls(path)
  @urls = []
  Dir[path].each do |file|
    x = File.read(file)
  
    x =~ /(http:\/\/mail\.yimg\.com\/[^"]*)/
  
    @urls << $1 if $1
  end
  @urls
end

def remote_urls(path)
  @urls = []
  Dir[path].each do |file|
    x = File.read(file)
  
    5.times do
      x.sub!(/src=\"([^"]*)/, "")
      match = $1
      if match
        match.gsub!("<%= @assets_url %>/images/themes/", "")
        @urls << match
      end
    end
    
  end
  @urls.uniq
end
