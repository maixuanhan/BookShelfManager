module.exports = {
  plugins: [
    [require('@babel/plugin-proposal-decorators'), { legacy: true }]
  ],
  presets: ['module:metro-react-native-babel-preset', "module:react-native-dotenv"],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
};
