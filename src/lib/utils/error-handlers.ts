import { ErrorMonitoring } from '../services/error-monitoring';

export class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', 400, context);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'AUTH_ERROR', 401, context);
    this.name = 'AuthenticationError';
  }
}

export class APIError extends ApplicationError {
  constructor(message: string, statusCode: number, context?: Record<string, any>) {
    super(message, 'API_ERROR', statusCode, context);
    this.name = 'APIError';
  }
}

export async function handleError(
  service: string,
  error: Error,
  context?: Record<string, any>
): Promise<void> {
  const monitoring = ErrorMonitoring.getInstance();
  await monitoring.trackError(service, error, context);

  // Additional error handling logic can be added here
  // For example, sending notifications for critical errors
  if (error instanceof ApplicationError && error.statusCode >= 500) {
    // TODO: Implement critical error notification
    console.error('Critical error:', error);
  }
}

export function createErrorHandler(service: string) {
  return async (error: Error, context?: Record<string, any>) => {
    await handleError(service, error, context);
  };
}