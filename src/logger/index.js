const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const { combine, timestamp, label, printf, colorize, simple } = winston.format;

const logDir = `${process.cwd()}/logs`;
// error 화면표시 체크
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const Logger = winston.createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    label({ lable: "Test Log" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), simple()),
    }),
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

module.exports = Logger;
