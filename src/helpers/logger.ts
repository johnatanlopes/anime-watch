import pino from 'pino';

let loggerInstance: pino.Logger;

const loggerClient = {
  _config: Object.freeze({
    base: null,
    formatters: {
      level: (label: string) => {
        return { level: label.toUpperCase() };
      },
    },
    level: process.env.LOG_LEVEL || 'info',
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  }),

  getInstance(library = pino): pino.Logger {
    if (!loggerInstance) loggerInstance = library(this._config);
    return loggerInstance;
  },
};

const logger = loggerClient.getInstance();

export { logger };
