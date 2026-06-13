const wrapAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const sendResponse = (
    res,
    {
        status = 200,
        success = true,
        message = "",
        data = null
    }
) => {
    return res.status(status).json({
        success,
        message,
        data
    });
};

class ValidationError extends Error {
    constructor(message, status) {
        super(message);

        this.status = status || 400;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }
};

const globalErrorHandler = (err, req, res, next) => {
    console.log("ERROR =>", err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export { wrapAsync, ValidationError, sendResponse, globalErrorHandler };