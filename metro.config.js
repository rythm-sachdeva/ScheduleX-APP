const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);


config.server = {
  ...config.server,
  verifyBeforeUsage: false,
};

// NOTE: the project's stylesheet file is `app/global.css`.
module.exports = withNativeWind(config, { input: './app/global.css' });