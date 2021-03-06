# -*- encoding: utf-8 -*-
# stub: jsonapi 0.1.1.beta2 ruby lib

Gem::Specification.new do |s|
  s.name = "jsonapi"
  s.version = "0.1.1.beta2"

  s.required_rubygems_version = Gem::Requirement.new("> 1.3.1") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Lucas Hosseini"]
  s.date = "2016-05-17"
  s.description = "Tools for handling JSON API documents"
  s.email = ["lucas.hosseini@gmail.com"]
  s.homepage = "https://github.com/beauby/jsonapi"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Parse and validate JSON API documents"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<json>, ["~> 1.8"])
      s.add_development_dependency(%q<rake>, [">= 0.9"])
      s.add_development_dependency(%q<rspec>, ["~> 3.4"])
    else
      s.add_dependency(%q<json>, ["~> 1.8"])
      s.add_dependency(%q<rake>, [">= 0.9"])
      s.add_dependency(%q<rspec>, ["~> 3.4"])
    end
  else
    s.add_dependency(%q<json>, ["~> 1.8"])
    s.add_dependency(%q<rake>, [">= 0.9"])
    s.add_dependency(%q<rspec>, ["~> 3.4"])
  end
end
