import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({  filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' })
  ]
});

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

/**
 * A function that logs the response based on the status code
 * @param {object} response
 */
export function logReponse(response) {
  if (response.status > 200) {
    logger.error(`Error ${new Date().toISOString()}: ${JSON.stringify(response)}`);
    return;
  }

  logger.info(`INFO ${new Date().toISOString()}: ${JSON.stringify(response)}`);
}

export default logReponse;
