desc "Set up config.yml and servers.yml default files"
task :setup do
  copy_from_example("config/config.yml")
  copy_from_example("config/servers.yml")
end

def copy_from_example(filename)
  if File.exists?("./#{filename}")
    puts "#{filename} already exists."
  else
    system "cp ./#{filename}.example ./#{filename}"
    puts "Copied #{filename}.example to #{filename}"
  end  
end
