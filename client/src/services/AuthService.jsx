/** @format */

import { api } from '../http/index'

// import { AxiosResponse } from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
	static async login(login, password) {
		console.log('вызов в AuthService -> login c параметрами', login, password)
		const response = await api.post('/login', { login, password })
		console.log('вызов в AuthService -> login результат', response)
		return response
	}

	static async registration(login, password) {
		return api.post('/registration', { login, password })
	}

	static async logout() {
		return api.post('/logout')
	}
}
