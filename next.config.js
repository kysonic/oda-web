const withSass = require('@zeit/next-sass');

module.exports = withSass({
    webpack(config) {
        config.resolve.modules.push(__dirname);
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
});
