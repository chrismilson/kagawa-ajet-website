const { rewireWorkboxInject, defaultInjectConfig } = require('react-app-rewire-workbox')
const path = require('path')

module.exports = function override (config, env) {
  if (env === 'production') {
    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, 'src', 'service-worker.js'),
      importWorkboxFrom: 'local'
    }
    config = rewireWorkboxInject(workboxConfig)(config, env)
  }

  return config
}
