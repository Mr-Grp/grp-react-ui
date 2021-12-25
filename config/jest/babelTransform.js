const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer({
  presets: [
    [
      require.resolve('@babel/preset-react'),
      {
        runtime: 'automatic',
      },
    ],
    require.resolve('@babel/preset-typescript'),
  ],
  babelrc: true,
  configFile: false,
});
