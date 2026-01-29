import pino from 'pino'

/**
 * Pino logger configuration
 * - In production: JSON structured logs for Vercel
 * - In development: JSON logs (pino-pretty doesn't work with Next.js webpack)
 *
 * Log levels (from lowest to highest priority):
 * - trace (10): Very detailed debugging information
 * - debug (20): Debug information
 * - info (30): Informational messages
 * - warn (40): Warning messages
 * - error (50): Error messages
 * - fatal (60): Fatal errors
 *
 * Note: We don't use pino-pretty's transport because it uses worker threads
 * which are incompatible with Next.js server-side webpack compilation
 */

// Determine log level from env or default based on NODE_ENV
const getLogLevel = () => {
  if (process.env.LOG_LEVEL) {
    return process.env.LOG_LEVEL as pino.Level
  }
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug'
}

const logLevel = getLogLevel()

const pinoConfig = {
  level: logLevel,
  formatters: {
    level: (label: string) => {
      return { level: label }
    },
  },
  // Don't include pid and hostname in logs
  base: undefined,
  // Human-readable timestamps
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
}

// Create base logger
const baseLogger = pino(pinoConfig)

// Export singleton instance
export const logger = baseLogger

// Export named loggers for different modules
const apiLogger = logger.child({ module: 'api' })
const actionLogger = logger.child({ module: 'action' })
const serviceLogger = logger.child({ module: 'service' })
const repositoryLogger = logger.child({ module: 'repository' })

// ==================== V2 Platform Logger ====================

interface LayerLogger {
  error: (error: unknown, meta?: object) => void
  success: (meta?: object) => void
  info: (meta?: object) => void
  debug: (meta?: object) => void
  warn: (meta?: object) => void
}

function createLayerLogger(logger: pino.Logger): LayerLogger {
  return {
    error: (error: unknown, meta?: object) => {
      logger.error(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          ...meta,
        },
        `Failed`,
      )
    },
    success: (meta?: object) => {
      logger.info(
        {
          status: 'success',
          ...meta,
        },
        `Success`,
      )
    },
    info: (meta?: object) => {
      logger.info(
        {
          ...meta,
        },
        `Info`,
      )
    },
    debug: (meta?: object) => {
      logger.debug(
        {
          ...meta,
        },
        `Debug`,
      )
    },
    warn: (meta?: object) => {
      logger.warn(
        {
          ...meta,
        },
        `Warning`,
      )
    },
  }
}

/**
 * V2 Platform Logger
 *
 * Structured logging with explicit context. Always include the full context
 * (ClassName.methodName) in your log metadata for better traceability.
 *
 * Usage:
 * ```typescript
 * import { log } from '@/lib/logger'
 *
 * export class RouterRepository {
 *   static async getRouter(options: GetRouterOptions) {
 *     log.repository.debug({ context: 'RouterRepository.getRouter', routerId: options.routerId })
 *
 *     const router = await prisma.application.findFirst({ where: ... })
 *
 *     log.repository.debug({ context: 'RouterRepository.getRouter', found: !!router })
 *     return router
 *   }
 *
 *   static async createRouter(data: Partial<Application>) {
 *     log.repository.debug({ context: 'RouterRepository.createRouter', name: data.name })
 *     const created = await prisma.application.create({ data })
 *     log.repository.success({ context: 'RouterRepository.createRouter', routerId: created.id })
 *     return created
 *   }
 * }
 * ```
 *
 * Output format:
 * ```json
 * {
 *   "level": "debug",
 *   "time": "2025-12-19T10:30:00.000Z",
 *   "module": "repository",
 *   "context": "RouterRepository.getRouter",
 *   "routerId": "abc123",
 *   "msg": "Debug"
 * }
 *
 * {
 *   "level": "info",
 *   "time": "2025-12-19T10:30:01.000Z",
 *   "module": "repository",
 *   "context": "RouterRepository.createRouter",
 *   "status": "success",
 *   "routerId": "abc123",
 *   "msg": "Success"
 * }
 *
 * {
 *   "level": "error",
 *   "time": "2025-12-19T10:30:02.000Z",
 *   "module": "repository",
 *   "context": "RouterRepository.deleteRouter",
 *   "error": "Not found",
 *   "stack": "Error: Not found\n  at ...",
 *   "msg": "Failed"
 * }
 * ```
 */
export const log = {
  api: createLayerLogger(apiLogger),
  action: createLayerLogger(actionLogger),
  service: createLayerLogger(serviceLogger),
  repository: createLayerLogger(repositoryLogger),
}