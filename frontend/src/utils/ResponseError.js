class ResponseError extends Error {
    constructor(response, code, message, errors) {
        super();
        this.name = 'ResponseError';
        this.response = response;
        this.code = code;
        this.message = message;
        this.errors = errors;
    }
}

export default ResponseError;