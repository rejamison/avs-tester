var cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

cfg.CLIENT_ID = "";
cfg.CLIENT_SECRET = "";
cfg.REFRESH_TOKEN = "";
cfg.DEBUG = 1;
cfg.PUBLIC_SERVER_URL = "https://localhost";

// Export configuration object
module.exports = cfg;