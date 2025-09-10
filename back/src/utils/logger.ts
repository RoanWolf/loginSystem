import pino from "pino";
import path from "path";

const logDir = path.resolve(process.cwd(), "logs"); // 在项目根目录下创建 logs 文件夹

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      level: "info",
      options: {
        destination: path.join(logDir, "app-info.log"),
        mkdir: true,
        append: true,
      },
    },
    {
      target: "pino/file",
      level: "error",
      options: {
        destination: path.join(logDir, "app-error.log"),
        mkdir: true,
        append: true,
      },
    },
    {
      target: "pino-pretty",
      level: "debug",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  ],
});

const logger = pino({ level: "info" }, transport);

export default logger;
