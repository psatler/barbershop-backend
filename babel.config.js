module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // converting to the current nodejs version
    '@babel/preset-typescript', // doesn't need configuration, so no need to be in array format
  ],
  plugins: [
    [
      'module-resolver', {
        // we pass here the paths configured for the app, found in the tsconfig.json file
        alias: {
          // don't forget to insert the baseUrl ./src/ in front of the paths
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@shared": "./src/shared"
        }
      }
    ],
    // below plugins are for decorators
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
  ],
}
