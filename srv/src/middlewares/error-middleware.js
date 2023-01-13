const ApiError = require("../exceptions/api-error");

/**
 * Обработка ошибок
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
      .end();
  }
  res.status("501").json({ message: "Непредвиденная ошибка" }).end();
};
