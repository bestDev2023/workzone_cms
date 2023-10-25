import pino from "pino"

export const logger = pino({browser: {asObject: false}})
// TODO remote log
