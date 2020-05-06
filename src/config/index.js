const merge = require('lodash.merge');


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const env = process.env.NODE_ENV;

const config = {};
let envConfig = {};

switch (env) {
  case 'dev':
    envConfig = require('./dev.config');
    break;
  case 'prod':
  case 'production':
    envConfig = require('./prod.config');
    break;
  default:
    envConfig = require('./dev.config');
}

module.exports = merge(config, envConfig);
