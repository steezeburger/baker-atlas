const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  // host: process.env.HOST || 'localhost',
  host: 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || '//baker.localhost.com',
  apiPort: 80,
  app: {
    title: 'Baker Atlas',
    description: 'Baker Real Time Updates and Visualizations',
  },

}, environment);
