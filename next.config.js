const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withSass({
    webpack(config) {
        // Modules
        config.resolve.modules.push(__dirname);
        // Extensions including typescript
        config.resolve.extensions.push('.ts', '.tsx', '.css', '.scss', '.svg');
        // SVG
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    sassLoaderOptions: {
        includePaths: ["src/styles"],
        data: "@import 'src/styles/oda-design-system-core';"
    }
});
