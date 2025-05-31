module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        electron: '36'  
        
      },
      modules: false, 
      debug: false,
    }],
    '@babel/preset-react'
  ],
  sourceType: 'unambiguous', 
};
