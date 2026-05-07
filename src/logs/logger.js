import winston from 'winston';

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'redGB',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'cyan',
        debug: 'blue',
    },
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
    levels: customLevels.levels,

    level: 'debug',

    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "errors/errors.log", level: "error" }),
        new winston.transports.File({ filename: "errors/fatals.log", level: "fatal" }),
        new winston.transports.File({ filename: "errors/warnings.log", level: "warn" }),
        new winston.transports.File({ filename: "errors/info.log", level: "info" }),
        new winston.transports.File({ filename: "errors/http.log", level: "http" }),
        new winston.transports.File({ filename: "errors/debug.log", level: "debug" }),
        new winston.transports.File({ filename: "errors/all.log" }),
    ]
});

export default logger;