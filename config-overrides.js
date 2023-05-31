module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback, // die vorherigen Fallbacks beibehalten
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/') // neuer Eintrag
    };

    return config;
};
