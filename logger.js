
import Winston from 'winston';

let logger = new (Winston.Logger)({
    transports: [
        new (Winston.transports.Console)(),
        // new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});

export default logger;