const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')

/**
 * Обработка авторизации
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns ApiError
 */
module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) {
			//Пользователь не авторизован
			return next(ApiError.UnauthorizedError())
		}

		//Парсим Bearer токен
		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}

		//Проверяем на корректность данных
		const userData = tokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}

		req.user = userData
		next()
	} catch (e) {
		//Пользователь не авторизован
		return next(ApiError.UnauthorizedError())
	}
}
