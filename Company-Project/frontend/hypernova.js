const hypernova = require('hypernova/server');

require = require("esm")(module/*, options*/)

const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  'utils': __dirname + '/src/utils',
  'styles': __dirname + '/src/styles',
  'components': __dirname + '/src/components',
})

const PORT = parseInt(process.env.HYPERNOVA_PORT);
const DEV_MODE = process.env.HYPERNOVA_DEV_MODE === '1';
const HYPERNOVA_HOST = process.env.HYPERNOVA_HOST;
const DISABLE_MODULE_CACHE = process.env.HYPERNOVA_DISABLE_MODULE_ACHE === '1';

function invalidateRequireThatBeginsWith(path) {
    for (let name in require.cache) {
        if (name.indexOf(path) !== 0) {
            continue;
        }

        delete require.cache[name];
    }
}

hypernova({
    devMode: DEV_MODE,
    port: PORT,
    host: HYPERNOVA_HOST,

    // getComponent: hypernova.createGetComponent({
    //      "Components.App": path.resolve(
    //          path.join('app', 'src', 'containers', 'App', 'render.js')
    //      ),
    // }),

    getComponent(name, _context) {
        if (name === 'Components.App') {
            if (DISABLE_MODULE_CACHE) {
                invalidateRequireThatBeginsWith(__dirname);
            }

            try {
                return require("./src/containers/App/render").default;
            } catch (e) {
                console.log(e);
            }
        }
        return null;
    },

    loggerInstance: {
        log: console.log,
    }
});
