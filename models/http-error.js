class HttpError extends Error {
  constructo(message, errorCode) {
    Super(message);
    this.code = errorCode;
  }
}
module.exports = HttpError;
