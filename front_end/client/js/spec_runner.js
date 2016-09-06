require('./app');
require('angular-mocks');
var specContext = require.context('./spec', true, /\.js$/);
specContext.keys().forEach(specContext);
