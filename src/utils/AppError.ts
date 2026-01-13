export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    // Corrige o prototype (importante no TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
