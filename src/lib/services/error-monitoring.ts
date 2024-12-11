import { ErrorLogger } from './error-logger';

export interface ErrorMetrics {
  totalErrors: number;
  errorsByService: Record<string, number>;
  errorsByType: Record<string, number>;
  recentErrors: Array<{
    timestamp: Date;
    service: string;
    message: string;
  }>;
}

export class ErrorMonitoring {
  private static instance: ErrorMonitoring;
  private errorLogger: ErrorLogger;
  private metrics: ErrorMetrics;

  private constructor() {
    this.errorLogger = new ErrorLogger();
    this.metrics = {
      totalErrors: 0,
      errorsByService: {},
      errorsByType: {},
      recentErrors: [],
    };
  }

  static getInstance(): ErrorMonitoring {
    if (!ErrorMonitoring.instance) {
      ErrorMonitoring.instance = new ErrorMonitoring();
    }
    return ErrorMonitoring.instance;
  }

  async trackError(
    service: string,
    error: Error,
    context?: Record<string, any>
  ): Promise<void> {
    // Log the error
    await this.errorLogger.logError(service, error, context);

    // Update metrics
    this.metrics.totalErrors++;
    this.metrics.errorsByService[service] = (this.metrics.errorsByService[service] || 0) + 1;
    
    const errorType = error.constructor.name;
    this.metrics.errorsByType[errorType] = (this.metrics.errorsByType[errorType] || 0) + 1;

    // Add to recent errors
    this.metrics.recentErrors.unshift({
      timestamp: new Date(),
      service,
      message: error.message,
    });

    // Keep only last 100 recent errors
    if (this.metrics.recentErrors.length > 100) {
      this.metrics.recentErrors.pop();
    }
  }

  getMetrics(): ErrorMetrics {
    return { ...this.metrics };
  }

  getErrorRate(service: string, timeWindowMs: number = 3600000): number {
    const now = Date.now();
    const recentErrors = this.metrics.recentErrors.filter(
      error => error.service === service &&
      (now - error.timestamp.getTime()) <= timeWindowMs
    );
    return recentErrors.length;
  }

  clearMetrics(): void {
    this.metrics = {
      totalErrors: 0,
      errorsByService: {},
      errorsByType: {},
      recentErrors: [],
    };
  }
}