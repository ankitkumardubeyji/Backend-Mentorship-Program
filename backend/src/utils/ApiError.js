 export class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message); // Calls the parent class (Error) constructor with the message
        this.statusCode = statusCode; // HTTP status code (e.g., 404, 500)
        this.errors = errors; // Additional error details (could be an array of errors)
        this.data = null; // Can be used to pass additional data
        this.status = false; // Default to false (indicating failure)

        // If a custom stack trace is provided, use it; otherwise, capture a new one
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor); // Captures the stack trace
        }
    }
}


