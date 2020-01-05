module.exports = {
    webpack(config) {
        config.resolve.modules.push(__dirname);
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
};
