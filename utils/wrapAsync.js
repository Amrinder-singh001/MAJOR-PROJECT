// This is created because Express does not handle errors in async functions automatically. This wrapper function allows us to catch errors in async route handlers and pass them to the next middleware (error handler).
// wrapAsync is a higher-order function that takes an async function (fn) as an argument and returns a new function. This new function executes the original async function and catches any errors that occur, passing them to the next middleware (next) for error handling.
module.exports = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
    }