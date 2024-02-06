import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";

const logDirectory = './logger';

// Create the log directory if it does not exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({}),
        new DailyRotateFile({
            filename: `${logDirectory}/%DATE%-app.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});
