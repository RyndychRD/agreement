const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-models");

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "1m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "30s",
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			console.log("\n", process.env.JWT_ACCESS_SECRET);
			console.log("\nValidateAccessToken провалено !", e);
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			console.log("\n", process.env.JWT_REFRESH_SECRET);
			console.log("\nValidateRefreshToken провалено !", e);
			return null;
		}
	}

	async saveToken(userId, refreshToken) {
		try {
			const tokenData = await tokenModel.findOne({ user_id: userId });
			if (tokenData) {
				return await tokenModel.update(
					{ id: tokenData.id },
					{ refresh_token: refreshToken }
				);
			}
			const token = await tokenModel.create({
				user_id: userId,
				refresh_token: refreshToken,
			});
			return token;
		} catch (e) {
			console.log(e);
		}
	}

	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({
			refresh_token: refreshToken,
		});
		return tokenData;
	}

	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne(refreshToken);
		return tokenData;
	}
}

module.exports = new TokenService();
