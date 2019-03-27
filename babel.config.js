module.exports = function (api) {
    api.cache(true);

    const presets = ['@babel/preset-env'];
    const plugins = ['add-module-exports', '@babel/transform-runtime'];

    return {
        presets,
        plugins
    };
};