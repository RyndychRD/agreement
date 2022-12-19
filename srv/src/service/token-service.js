const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-models')

/**
 * Сервис для работы с токенами авторизации пользователя
 */
class TokenService {
	/**
	 * Создание токена
	 * @param {*} payload
	 * @returns
	 */
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '12h',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '24h',
		})
		return {
			accessToken,
			refreshToken,
		}
	}

	/**
	 * Валидация токена доступа
	 * @param {*} token
	 * @returns
	 */
	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			console.log('\n', process.env.JWT_ACCESS_SECRET)
			console.log('\nValidateAccessToken провалено !', e)
			return null
		}
	}

	/**
	 * Валидация токена обновление
	 * @param {*} token
	 * @returns
	 */
	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			console.log('\n', process.env.JWT_REFRESH_SECRET)
			console.log('\nValidateRefreshToken провалено !', e)
			return null
		}
	}

	/**
	 * Сохранить токен
	 * @param {*} userId
	 * @param {*} refreshToken
	 * @returns
	 */
	async saveToken(userId, refreshToken) {
		try {
			const tokenData = await tokenModel.findOne({ user_id: userId })
			if (tokenData) {
				return await tokenModel.update(
					{ id: tokenData.id },
					{ refresh_token: refreshToken }
				)
			}
			const token = await tokenModel.create({
				user_id: userId,
				refresh_token: refreshToken,
			})
			return token
		} catch (e) {
			console.log(e)
		}
	}

	/**
	 * Удаление токена
	 * @param {*} refreshToken
	 * @returns
	 */
	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({
			refresh_token: refreshToken,
		})
		return tokenData
	}

	/**
	 * Найти токен
	 * @param {*} refreshToken
	 * @returns
	 */
	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne(refreshToken)
		return tokenData
	}
}

module.exports = new TokenService()
