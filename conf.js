var yaml = require('js-yaml'),
	fs = require('fs'),
	path = require('path');

// load configuration file
var confPath = '/media/data/conf.yml'
var conf = yaml.safeLoad(fs.readFileSync(confPath, 'utf8'));

module.exports = conf;
