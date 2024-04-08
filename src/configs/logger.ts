import winston = require("winston");

const transports: winston.transport[] = [
    new winston.transports.Console()
];

if (process.env.ENABLE_FILE_LOGGING === 'true') {
    transports.push(new winston.transports.File({ filename: 'app.log' }));
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: process.env.TIME_ZONE_LOGGER}),
        winston.format.printf(({timestamp, level, message}) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: transports
});

export default logger;