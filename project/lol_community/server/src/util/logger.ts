import winston from 'winston';
import 'winston-daily-rotate-file'
import dotenv from 'dotenv';
import stackTrace from 'stack-trace';
import path from 'path';
import 'source-map-support/register';  // source-map-support를 로드하여 소스 맵 지원
import moment from 'moment'

dotenv.config();

enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const PROJECT_NAME = process.env.PROJECT_NAME || 'defaultProject';
const LOG_LEVEL = (process.env.LOG_LEVEL as LogLevel) || 'info';

// 호출된 함수명, 파일명, 라인 번호를 포맷팅하는 함수
const formatCallerInfo = () => {
    const trace = stackTrace.get()[1]; // 현재 호출 스택의 두 번째 항목 가져오기
    const filePath = trace.getFileName() || 'unknown';
    const fileName = path.basename(filePath); // 전체 경로에서 파일명만 추출
    const lineNumber = trace.getLineNumber() || 'unknown';
    const functionName = trace.getFunctionName() || 'unknown';
    return `${fileName}:${lineNumber} (${functionName})`;
};

// 커스텀 타임스탬프 포맷팅
const customTimestampFormat = () => moment().format('YYYY-MM-DD HH:mm:ss');

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    filename: `logs/%DATE%_${PROJECT_NAME}.log`,
    datePattern: 'YYYY_MM_DD',
    maxSize: MAX_FILE_SIZE,
    maxFiles: '21d', // 14일치 로그 파일 보관
    zippedArchive: true, // 로그 파일을 압축
});

const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp({ format: customTimestampFormat }), // 커스텀 타임스탬프 포맷팅 적용
        winston.format.printf(({ level, message, timestamp }) => {
            const callerInfo = formatCallerInfo();
            return `${timestamp} [${level}] ${callerInfo} - ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(), // 콘솔에 색상 적용
                winston.format.timestamp({ format: customTimestampFormat }),
                winston.format.printf(({ level, message, timestamp }) => {
                    const callerInfo = formatCallerInfo();
                    return `${timestamp} [${level}] ${callerInfo} - ${message}`;
                })
            )
        }),
        dailyRotateFileTransport
    ],
});

export default logger;