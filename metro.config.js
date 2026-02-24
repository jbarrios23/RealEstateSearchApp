const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for TypeScript and other extensions
config.resolver.sourceExts.push('ts', 'tsx', 'js', 'jsx', 'json');

module.exports = config;