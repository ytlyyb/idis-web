module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        // styleLibraryName: '~theme/index.css'
        styleLibraryName: 'theme-chalk'
      }],
      {
        // "cacheDirectory": true
      }
    
  ]
}