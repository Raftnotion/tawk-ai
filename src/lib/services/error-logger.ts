interface ErrorLog {
  id: string;
  timestamp: Date;
  service: string;
  error: {
    message: string;
    stack?: string;
  };
  context?: Record<string, any>;
}

export class ErrorLogger {
  private logs: ErrorLog[] = [];
  private static instance: ErrorLogger;

  constructor() {
    if (ErrorLogger.instance) {
      return ErrorLogger.instance;
    }
    ErrorLogger.instance = this;
  }

  async logError(
    service: string,
    error: Error | null,
    context?: Record<string, any>
  ): Promise<void> {
    const errorLog: ErrorLog = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      service,
      error: {
        message: error?.message || 'Unknown error',
        stack: error?.stack,
      },
      context,
    };

    this.logs.push(errorLog);
    
    // TODO: Implement actual error storage/notification
    console.error('Error logged:', errorLog);
  }

  getRecentErrors(limit: number = 100): ErrorLog[] {
    return this.logs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  clearLogs(): void {
    this.logs = [];
  }
}