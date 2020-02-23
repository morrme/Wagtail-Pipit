var hypernova = require('hypernova/server');
require = require("esm")(module/*, options*/)

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
