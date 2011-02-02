require 'rubygems'
require 'fileutils'
require 'erb'
require 'net/http'
require 'optparse'
require 'bundler'

Dir["./app/helpers/*.rb"].each do |path|
  require path
end

Dir["./lib/*.rb"].each do |path|
  require path
end

Bundler.require

YMDP::Base.configure do |config|
end

require 'ymdp'
require 'configuration/constants'

@new_assets_directory = "/yahoo/mail/assets/"