$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "front_end/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "front_end"
  s.version     = FrontEnd::VERSION
  s.authors     = ["tslater3"]
  s.email       = ["trevor.s.slater@gmail.com"]
  s.homepage    = "http://www.recipesbaby.com"
  s.summary     = "Front end component - angular component structure"
  s.description = "see above"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0.0", ">= 5.0.0.1"

  s.add_development_dependency "sqlite3"
end
