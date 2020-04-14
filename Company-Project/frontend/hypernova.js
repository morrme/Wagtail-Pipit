const hypernova = require('hypernova/server');
const path = require("path");

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
const DISABLE_MODULE_CACHE = process.env.HYPERNOVA_DISABLE_MODULE_CACHE === '1';
const USE_VM = process.env.HYPERNOVA_USE_VM === '1';

function invalidateModuleCacheStartingWith(path) {
    for (let name in require.cache) {
        if (name.indexOf(path) !== 0) {
            continue;
        }

        delete require.cache[name];
    }
}

let config = {
    devMode: DEV_MODE,
    port: PORT,
    host: HYPERNOVA_HOST,
    // loggerInstance: {
    //     log: console.log,
    // },
    getComponent(name, _context) {
        if (name === 'Components.App') {
            if (DISABLE_MODULE_CACHE) {
                invalidateModuleCacheStartingWith(__dirname);
            }

             try {
                 return require("./src/containers/App");
            } catch (e) {
                console.log(e);
            }
        }
        return null;
    },
}

// if (USE_VM) {
//     console.log('Running using VM');
//     config.getComponent = hypernova.createGetComponent({
//          "Components.App": path.resolve(
//              path.join(__dirname, 'hypernovaInit.js')
//          ),
//     })
// }


hypernova(config);
