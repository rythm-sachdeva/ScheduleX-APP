const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
// NOTE: the project's stylesheet file is `app/globals.css` (plural).
// NativeWind needs the correct path here so it can process Tailwind directives.
module.exports = withNativeWind(config, { input: './app/global.css' })