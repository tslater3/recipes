module FrontEnd
  class Engine < ::Rails::Engine
    isolate_namespace FrontEnd

    config.generators do |g|
      g.test_framework :rspec, :fixture => false
      g.fixture_replacement :factory_girl, :dir => 'spec/factories'
      g.assets false
      g.helper false
    end

    initializer "front_end.assets" do
      ::Rails.application.config.assets.paths << root.join("app", "assets", "fonts")
      ::Rails.application.config.assets.paths << root.join("app", "assets", "icons")
      ::Rails.application.config.assets.paths << root.join("vendor", "assets", "bower_components")
      ::Rails.application.config.assets.paths << root.join("vendor", "templates").to_s
      ::Rails.application.config.assets.paths << root.join("vendor", "fonts").to_s
      ::Rails.application.config.assets.precompile += [/\.(?:svg|eot|woff|ttf)$/]

      #issue with angular-bootstrap and one of its file extensions
      ::Rack::Mime::MIME_TYPES.merge!(".tpl" => "application/javascript")
    end
  end
end
