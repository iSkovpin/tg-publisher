if (isDev()) {
    Logger.log('DEV MODE');
}

/**
 * Config initialization.
 * @type {Config}
 */
let config = new Config(isDev() ? configDev : configProd);

/**
 * Main app object.
 * @type {PublisherApp}
 */
let publisher = new PublisherApp(config);
