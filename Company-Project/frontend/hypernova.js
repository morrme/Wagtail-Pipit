const hypernova = require('hypernova/server');
require = require("esm")(module/*, options*/)

const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  'utils': __dirname + '/src/utils',
  'styles': __dirname + '/src/styles',
  'components': __dirname + '/src/components',
})

hypernova({
    devMode: true,

    getComponent(name) {
        if (name === 'Components.App') {
            return require("./src/containers/App").render;
        }
        return null;
    },

    port: 3030,
});
