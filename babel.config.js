module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@screens': './src/screens/',
          '@reduxToolkit': "./src/reduxToolkit/",
        },
      },
    ],
  ],
};
