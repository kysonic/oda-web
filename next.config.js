const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withSass({
    webpack(config) {
        config.resolve.modules.push(__dirname);
        config.resolve.extensions.push('.ts', '.tsx', '.css', '.scss');
        return config;
    },
    sassLoaderOptions: {
        includePaths: ["src/styles"],
        data: "@import 'src/styles/argon-design-system-core';"
    }
});
