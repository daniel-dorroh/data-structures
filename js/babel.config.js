
module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['defaults']
        },
      },
    ],
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  };
}
